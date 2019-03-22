/* @flow*/

import React, {
    Component
} from 'react';
import {
    Row,
    List,
    ListItem,
    Input,
    Thumbnail
} from 'native-base';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    Platform,
    ScrollView,
    ListView, Alert,AsyncStorage
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';
let {
    width
} = Dimensions.get('window');
import SpinnerComponent from './../SpinnerComponent';
import {
    gql,
    graphql
} from 'react-apollo';
import {
    compose
} from 'react-apollo';
import Modal from 'react-native-simple-modal';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import SuperAgent from 'superagent';
import {BASE_API} from '../../constants';
//import {Tracker} from "../../constants/index";

/**
 * @description As a Aday user, I want to keep my profile information intact so that I can use it to apply to jobs effortlessly
 * @todo stepper for the desired number of hours: https://mobile.ant.design/components/stepper/
 */
class MyProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            availabilityId: "",
            showDetails: false,
            isFullTime: true,
            availabilityShow: true,
            avatarSource: require('./../assets/profile-icons/anonymous-profile.png'),
            openModal: false,
            references: [],
            homeAddress: {},
            isIdentified: false,
            contactInfoPhoneNumberEnterFields: false,
            contactInfoPhoneNumber: "",
            contactInfoErrorMessage: false,
            phoneNumberVerifyCode: '',
            isContactInfoVerified: false,
            contactInfoEmail: '',
            modalData: {
                imgUrl: require('./../assets/profile-icons/book-icon.png'),
                paragraph: '',
                button1: {
                    name: '',
                    arguments: '',
                    url: '',
                },
                button2: {
                    name: '',
                    arguments: '',
                    url: '',
                },
                button3: {
                    name: '',
                    arguments: '',
                    url: '',
                },
            },
            isLoading: false,
            ds: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        };
        this.onAvailabilitySavePress = this.onAvailabilitySavePress.bind(this);
        this.openModal = this.openModal.bind(this);
        this.textVerificationCode = this.textVerificationCode.bind(this);
        this.imagePicker = this.imagePicker.bind(this);
        this.setAvatar = this.setAvatar.bind(this);
        this.pickIdentityDocument = this.pickIdentityDocument.bind(this);
        this.saveIdentityDocument = this.saveIdentityDocument.bind(this);
        this.contactInfoPhoneNumberValidation = this.contactInfoPhoneNumberValidation.bind(this);
        this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
       //Tracker.trackScreenView("User Profife");
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.props.data.refetch()
        if (!nextProps.data.loading && nextProps.data.loading != this.props.loading) {
            var _this = this
            
            const references = nextProps.data.userById.userReferencesByUserId.edges;
            const workHistory = nextProps.data.userById.userEmployersByUserId.nodes;
            const educationHistory = nextProps.data.userById.userEducationsByUserId.nodes;
            const languages = nextProps.data.userById.userLanguagesByUserId.nodes;
            const availability = nextProps.data.userById.userAvailabilitiesByUserId.nodes[0];

            this.setState({ workHistory: workHistory })
            this.setState({ educationHistory: educationHistory })

            let isFullTime = true;
            if (availability && availability.hourRange === "PART-TIME") {
                isFullTime = false;
            }

            if (nextProps.data.userById) {
                var {
                    id,
                    userEmail,
                    avatarUrl,
                    firstName,
                    lastName,
                    aboutMeText
                } = nextProps.data.userById;
                if (typeof aboutMeText === 'string') {
                    aboutMeText = aboutMeText.trim();
                }
            }

            // Initialize data in the store, using the data from the GraphQL query.
            // Calls functions from the this.props.actions, which are redux actions defined
            // in modules and passed through containers into this component

            if (!this.state.saveAboutMeData) {
                this.setState({saveAboutMeData: true}, () => {
                    nextProps.actions.saveAboutMeData({
                        id,
                        userEmail,
                        avatarUrl,
                        firstName,
                        lastName,
                        aboutMeText
                    });
                })
            }

            
            const phoneNumber = nextProps.data.userById.userPhoneNumber;
            const email = nextProps.data.userById.userEmail;
            
            if (!this.state.saveContactInfo) {
                 this.setState({saveContactInfo: true}, () => {
                    this.props.actions.saveContactInfo({
                            phoneNumber,
                            email
                        });
                })
            }

           
            const address = JSON.parse(nextProps.data.userById.homeAddress) && JSON.parse(nextProps.data.userById.homeAddress).home_address[0];
            const zipCode = nextProps.data.userById.zipCode;
            let homeAddress = null;
            if (address) {
                const homeAddress1 = address.address_line1;
                const homeAddress2 = address.address_line2;
                const city = address.city;
                const state = address.state;
                homeAddress = {
                    homeAddress1,
                    homeAddress2,
                    city,
                    state,
                    zipCode
                };
            }  

            // this is very disorganized but we must check for updated verification status from query
            const phoneConfirmed = nextProps.data.userById ? nextProps.data.userById.userPhoneConfirmed
                                   : this.state.isContactInfoVerified;
            // load data into the state (in addition to the store - yikes!)
            var avatarSource = ""
            if (avatarUrl) {  
               var avatarSource = {uri: avatarUrl + "?" + new Date().getTime()}
            }
        
            this.setState({
                id: nextProps.state.myProfile.id,
                references: references.map((all) => all.node),
                homeAddress: homeAddress,
                contactInfoPhoneNumber: nextProps.state.myProfile.phoneNumber,
                contactInfoEmail: nextProps.state.myProfile.email,
                isContactInfoVerified: phoneConfirmed,
                isLoading: false,
                availabilityId: availability && availability.id,
                isFullTime,
                avatarSource,
                languages
            });
         
        }
    }

    renderRow(dataRow, sectionID, rowID) {
        return (
            <View style={{backgroundColor:'#F7F7F7', marginTop: 10}}>
                <Text style={{paddingLeft: 20, fontWeight: 'bold', fontSize: 15}}>Reference {++rowID}</Text>
                <View style={{marginTop:10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor:'#F7F7F7'}}>
                    <View>
                        <Text style={{paddingLeft: 20}}>{dataRow.firstName + " "}{dataRow.lastName || ""}</Text>
                        <Text style={{paddingLeft: 20}}>{dataRow.referencePhoneNumber}</Text>
                    </View>
                    <TouchableOpacity onPress={() => Actions.AddReferenceManually({data: dataRow})}>
                        <Image
                            resizeMode="contain"
                            style={{width: 40, height: 40}}
                            source={require('./../assets/profile-icons/edit-button.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    onAvailabilitySavePress() {

        const action = this.state.availabilityId ? "updateUserAvailabilityById" : "createUserAvailability";
        const id = this.state.availabilityId ? this.state.availabilityId : uuidv1();
        const hourRange = this.state.isFullTime ? "FULL-TIME" : "PART-TIME";

        const availability = {
            id,
            hourRange,
            userId: this.props.state.myProfile.id
        };
        this.setState({
            isLoading: true
        });
        this.props[action]({
                variables: availability
            })
            .then((response) => {
                AsyncStorage.getItem('email').then((value)=>{
                   //Tracker.trackEvent(value, "Update or Create User Availability");
                }).catch((err)=>{
                   //Tracker.trackEvent("Not Define", "Update or Create User Availability");
                })

                console.log('done');
                this.setState({
                    availabilityShow: true,//false,
                    isLoading: false
                });
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                console.log(err);
                console.log(id)
            });

    }

    pickAvatar() {
        let options = {
            title: 'Select Avatar',
            mediaType: 'photo',
            maxWidth: 1024,
            maxHeight: 1024,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        this.imagePicker(options, this.setAvatar);
    }

    setAvatar(response) {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            SuperAgent.post(`${BASE_API}/api/uploadImage`)
                            .field('keyword', 'user')
                            .field('id', this.state.id)
                            .attach("base64Data", response.data)
                            .end((err, res) => {
                              if (err) {
                                //Alert.alert('ADay','Your Profile is not Uploaded Successfully');
                                console.log(err);
                                alert('Error Uploading Profile Picture');
                              } else {
                                alert('File uploaded!');
                                // update thumbnail only on success
                                let source = {
                                    uri: response.uri + "?" + new Date().getTime()
                                };
                                this.setState({
                                    avatarSource: source
                                });
                              }
                            })
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        }
    }

    pickIdentityDocument(type) {
        let options = {
            title: 'Select ' + type,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        this.setState({
            identifyDocType: type.toUpperCase(),
            openModal: false
        });
        this.imagePicker(options, this.saveIdentityDocument);
    }

    saveIdentityDocument(response) {
        let isIdentified: false;
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            isIdentified = true;
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        }
        this.setState({
            isIdentified: isIdentified
        });
    }

    imagePicker(options, callback) {
        ImagePicker.showImagePicker(options, (response) => {
            callback(response);
        });
    }

    renderWorkHistory(dataRow, sectionID, rowID) {
        const isJobDescription = dataRow.jobDescription !== "";
        const isEndDate = dataRow.endDate;
        return (
            <View>
                <Text style={{fontSize:16, marginLeft: 20}}>EMPLOYER {1 + parseInt(rowID)}</Text>
                <View style={{flex: 1, flexDirection: "row", marginVertical: 5, backgroundColor: '#F7F7F7'}}>
                    <View style={{flex: 0.9, marginVertical: 10, marginLeft: 20}}>
                        <View>
                            <Text style={styles.text}>{dataRow.employerName}</Text>
                            <Text style={styles.text}>{dataRow.city}</Text>
                            <Text style={styles.text}>{dataRow.state}</Text>
                        </View>

                        <Text style={styles.text}>
                            {moment(dataRow.startDate).format("MMM Do YYYY")}
                            {isEndDate && " - " + moment(dataRow.endDate).format("MMM Do YYYY")}
                        </Text>
                        {isJobDescription &&
                        (<View>
                            <Text style={styles.text}>{dataRow.jobDescription}</Text>
                        </View>)
                        }
                    </View>
                    <TouchableOpacity onPress={()=> Actions.work({work: dataRow, workId: rowID})}>
                        <View style={{flex: 0.1, marginTop: 5}}>
                            <Image
                                resizeMode="contain"
                                style={{width: 50, height: 50}}
                                source={require('./../assets/profile-icons/edit-button.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderEducationHistory(dataRow, sectionID, rowID) {
        const isAwardType = dataRow.awardType !== "";
        const isFieldOfStudy = dataRow.fieldOfStudy !== "";
        const isEndDate = dataRow.endDate !== "";
        return (
            <View>
                <Text style={{fontSize: 16, marginLeft: 20}}>DEGREE {1 + parseInt(rowID)}</Text>
                <View style={{flex: 1, flexDirection: "row", marginTop: 5, backgroundColor: '#F7F7F7'}}>
                    <View style={{flex: 0.9, marginVertical: 10, marginLeft: 20}}>
                        <View>
                            <Text style={styles.text}>{dataRow.educationalInstitutionName}</Text>
                            <Text style={styles.text}>{dataRow.city}</Text>
                            <Text style={styles.text}>{dataRow.state}</Text>
                        </View>
                        <Text style={styles.text}>
                            {moment(dataRow.startDate).format("MMM Do YYYY")}
                            {isEndDate && " - " + moment(dataRow.endDate).format("MMM Do YYYY")}
                        </Text>
                        {isAwardType &&
                        (<View>
                            <Text style={styles.text}>{dataRow.awardType}</Text>
                        </View>)
                        }
                        {isFieldOfStudy &&
                        (<View>
                            <Text style={styles.text}>{dataRow.fieldOfStudy}</Text>
                        </View>)
                        }
                    </View>
                    <TouchableOpacity onPress={()=> Actions.Education({education: dataRow, educationId: rowID})}>
                        <View style={{flex: 0.1, marginTop: 5}}>
                            <Image
                                resizeMode="contain"
                                style={{width: 50, height: 50}}
                                source={require('./../assets/profile-icons/edit-button.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderLanguages(dataRow, sectionID, rowID) {
        return (
            <View style={{flex: 1, flexDirection: "row", marginTop: 5, backgroundColor: '#F7F7F7'}}>
                <View style={{flex: 0.9, marginTop: 10, marginLeft: 20}}>
                    <Text style={{fontSize: 16}}>{dataRow.languageName}</Text>
                </View>
                <TouchableOpacity onPress={()=> Actions.Languages({language: dataRow})}>
                    <View style={{flex: 0.1, marginTop: 5}}>
                        <Image
                            resizeMode="contain"
                            style={{width: 50, height: 50}}
                            source={require('./../assets/profile-icons/edit-button.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    // defines all the different modals that are used in My Profile
    openModal(type) {
        const modalData = this.state.modalData;
        if (type === 'references') {
            modalData.type = type;
            modalData.imgUrl = require('./../assets/profile-icons/book-icon.png');
            modalData.paragraph = 'How do you want to add a new reference?';
            modalData.button1.name = 'BY CONTACTS - Coming Soon';
            modalData.button1.url = Actions.AddReferenceManually; //Actions.AddReferenceFromContacts;
            modalData.button1.arguments = '';
            modalData.button2.name = 'MANUALLY';
            modalData.button2.url = Actions.AddReferenceManually;
            modalData.button2.arguments = '';
        } else if (type === 'identification') {
            modalData.type = type;
            modalData.imgUrl = require('./../assets/profile-icons/identification-modal.png');
            modalData.paragraph = 'Aday must confirm your identity before applying to more than 3 jobs, how would you like to verify?';
            modalData.button1.name = 'STATE ID';
            modalData.button1.url = this.pickIdentityDocument;
            modalData.button1.arguments = 'State Id';
            modalData.button2.name = 'PASSPORT';
            modalData.button2.url = this.pickIdentityDocument;
            modalData.button2.arguments = 'Passport';
        } else if (type === 'contactInfo') {
            modalData.type = type;
            modalData.imgUrl = require('./../assets/profile-icons/contact-info.png');
            modalData.paragraph = 'Aday must confirm your phone number to begin accepting shifts, how would you like to verify?';
            modalData.button1.name = 'TEXT ME';
            modalData.button1.url = this.textVerificationCode;
            modalData.button1.arguments = '';
            modalData.button2.name = 'CALL ME - coming soon';
            modalData.button2.url = this.openModal;
            modalData.button2.arguments = 'contactInfo';
            modalData.button3.name = 'I HAVE A CODE';
            modalData.button3.url = this.openModal;
            modalData.button3.arguments = 'verifyPhoneNumber';
        } else if (type === 'verifyPhoneNumber') {
            modalData.type = type;
            modalData.imgUrl = require('./../assets/profile-icons/contact-info.png');
            modalData.button1.name = 'VERIFY NUMBER';
            modalData.button1.url = this.verifyPhoneNumber;
            modalData.button1.arguments = '';
            modalData.button2.name = "DIDN'T RECEIVE A CODE?";
            modalData.button2.url = this.openModal;
            modalData.button2.arguments = 'contactInfo';
        }
        this.setState({
            openModal: true,
            modalData: modalData
        })

    }

    // texts code to the current phone, then open modal for code entry
    textVerificationCode() {
        // text code using server call
        fetch(`${BASE_API}/api/sendCode`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: this.props.state.myProfile.id,
            firstName: this.props.state.aboutMe.firstName,
            phoneNumber: this.props.state.myProfile.phoneNumber
          }),
        }).catch((error) => {
            Alert.alert('ADay','Your Request Couldn\'t Be Completed while sending TextVerificationCode');
            console.error(error);
        });
        this.openModal('verifyPhoneNumber');
    }

    // attempts to verify phone number using code entered by user
    verifyPhoneNumber() {
        // user server call to verify code
        var verifyCode = false;
        fetch(`${BASE_API}/api/verifyCode`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: this.state.id,
            confirmationCode: this.state.phoneNumberVerifyCode,
          }),
        }).then((response) => {
            if (response._bodyText == "Code expired" || response._bodyText == "Code invalid") {
                // set error message
                this.setState({
                    contactInfoErrorMessage: response._bodyText,
                    openModal: false
                });
            } else if (response._bodyText == "Success"){
                verifyCode = true;
            }
          }).then(() => {
            // take action depending on if the code was verified
            if (verifyCode) {
                this.setState({
                    openModal: false,
                    isContactInfoVerified: true,
                    contactInfoErrorMessage: null
                });
                /* server call should do this for us
                this.props.confirmUserPhoneNumber({
                    variables: {
                        id: this.state.id
                    }
                }).then((response) => {
                    this.setState({
                        openModal: false,
                        isContactInfoVerified: true,
                        contactInfoErrorMessage: null
                    });
                    this.props.actions.saveContactInfo({
                        phoneNumber: this.state.contactInfoPhoneNumber,
                        email: this.state.contactInfoEmail
                    });
                }).catch((err) => {
                    console.log(err)
                })*/
            }
            else if (!this.state.contactInfoErrorMessage){
                // catch-all error message
                errorMessage = 'Unable to Verify';
                this.setState({
                    contactInfoErrorMessage: errorMessage,
                    openModal: false
                });
            }
          }).catch((error) => {
            Alert.alert('ADay','Your Code is Expired!!');
            console.error(error);
          }).catch((err)=>{
            Alert.alert('ADay','Your Request Couldn\'t Be Completed while Verifying Code');
        })

    }

    // function that opens the phone verification modal
    // has old form validation checks that are not used by current code
    contactInfoPhoneNumberValidation() {
        const phoneNumber = this.state.contactInfoPhoneNumber;
        const id = this.state.id;
        let errorMessage = false;
        if (phoneNumber) {
            this.openModal('contactInfo')
        } else {
            // old code
            errorMessage = 'Please Enter Phone Number!';
            this.setState({
                contactInfoErrorMessage: errorMessage
            });
        }
    }

    render() {
        /**
         * Commented out for purposes of viewing the sheet
         */
        if (this.props.data.loading || this.state.isLoading) {
            return (
                <View style={{flex: 1, top: 0, position: 'absolute', zIndex: 100}}>
                    <SpinnerComponent />
                </View>
            )
        }

        const { aboutMe } = this.props.state;
        const { workHistory, educationHistory, languages } = this.state;
        const references = this.state.references;
        const homeAddress = this.state.homeAddress;
        const isReferences = references.length > 0;
        const isHomeAddress = homeAddress && Object.keys(homeAddress).length > 0;
        const isWorkExperience = workHistory && workHistory.length > 0;
        const isEducation = educationHistory && educationHistory.length > 0;
        const modalData = this.state.modalData;
        const isLanguages = languages && languages.length > 0;
        const isIdentified = this.state.isIdentified;
        const identifyDocType = this.state.identifyDocType;
        const contactInfoPhoneNumberEnterFields = this.state.contactInfoPhoneNumberEnterFields;
        const contactInfoErrorMessage = this.state.contactInfoErrorMessage;
        const isContactInfoVerified = this.state.isContactInfoVerified;
        const phoneNumber = this.state.contactInfoPhoneNumber;
        const email = this.state.contactInfoEmail;
        const id = this.state.id;

        let phoneNumberFormatted = "";
        if (phoneNumber) {
            phoneNumberFormatted = [
                phoneNumber.length >= 10 ? phoneNumber.slice(0, phoneNumber.length-10) + ' ' : '',
                '(', phoneNumber.slice(phoneNumber.length-10, phoneNumber.length-7), ')-',
                phoneNumber.slice(phoneNumber.length-7,phoneNumber.length-4), '-', phoneNumber.slice(phoneNumber.length-4)
            ].join('');
        }

        return (
            <View style={styles.container}>
                <View>
                    <ScrollView>
                        <View style={{flex: 1}}>
                            <View style={[styles.center, {marginTop: 10}]}>
                                <TouchableOpacity onPress={() => this.pickAvatar()}>
                                    <Thumbnail
                                        style={{ width:100, height:100, borderRadius: 50 }}
                                        source={this.state.avatarSource}
                                    />
                                </TouchableOpacity>
                                <Text style={{fontSize:22, fontWeight:'bold'}}>{aboutMe.firstName}</Text>
                                <Text style={{fontSize:22, fontFamily: 'Roboto'}}>{aboutMe.lastName}</Text>
                            </View>
                            <View style={[styles.center, {marginTop: 20, flexDirection: 'row', marginHorizontal: 30}]}>
                                <View style={[styles.center, {justifyContent:'flex-start'}]}>
                                    <Image resizeMode="contain"
                                        style={{width: 20,height: 20}}
                                        source={require('./../assets/comma.png')}
                                    />
                                </View>
                                <View style={{marginHorizontal: 10}}>
                                    <Text style={{fontSize:20, fontFamily: 'Roboto', textAlign:'center'}}>
                                        {aboutMe.aboutMeText}
                                    </Text>
                                </View>
                                <View style={[styles.center, {justifyContent:'flex-end'}]}>
                                    <Image resizeMode="contain"
                                        style={{width:20, height:20}}
                                        source={require('./../assets/commavv.png')}
                                    />
                                </View>
                            </View>
                            <View style={[styles.center, {height: 100, backgroundColor: '#F7F7F7', marginVertical: 5}]}>
                                <TouchableOpacity onPress={() => Actions.AboutMe()}>
                                    <Image
                                        resizeMode="contain"
                                        style={{width: 75, height: 75}}
                                        source={require('./../assets/profile-icons/edit.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/*     WORK EXPERIENCE      */}
                            <View style={[styles.center, {flexDirection: 'row', paddingVertical: 7, backgroundColor: 'white'}]}></View>
                            <View style={[styles.center, {flexDirection: 'row', backgroundColor: '#F7F7F7', marginTop: 5}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 30, height: 30}}
                                    source={require('./../assets/profile-icons/suitcase-white-bg.png')}
                                />
                                <Text style={{marginLeft: 10}}>WORK EXPERIENCE</Text>
                                {isWorkExperience &&

                                    (<View style={{position: 'absolute', right: 10}}>
                                        <TouchableOpacity onPress={() => Actions.work({})}>
                                            <Image
                                                resizeMode="contain"
                                                style={{width: 30, height: 30}}
                                                source={require('./../assets/profile-icons/plus-button.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>)
                                }
                            </View>
                            {!isWorkExperience &&
                                (<View
                                    style={[styles.center, {height: 100, backgroundColor: '#F7F7F7', marginVertical: 10}]}>
                                    <TouchableOpacity onPress={() => Actions.work({userId: id})}>
                                        <Image
                                            resizeMode="contain"
                                            style={{width: 75, height: 75}}
                                            source={require('./../assets/profile-icons/add.png')}
                                        />
                                    </TouchableOpacity>
                                </View>)
                            }
                            {isWorkExperience &&
                                (<View style={{marginVertical: 10}}>
                                    <ListView
                                        enableEmptySections={true}
                                        dataSource={this.state.ds.cloneWithRows(workHistory)}
                                        renderRow={this.renderWorkHistory.bind(this)}
                                    />
                                </View>)
                            }

                            {/*     EDUCATION      */}
                            <View style={[styles.center, {flexDirection: 'row', paddingVertical: 7, backgroundColor: 'white'}]}></View>
                            <View style={[styles.center, {flexDirection: 'row', backgroundColor: '#F7F7F7', marginTop: 5}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 30, height: 30}}
                                    source={require('./../assets/profile-icons/icons-graduation.png')}
                                />
                                <Text style={{marginLeft: 10}}>EDUCATION</Text>
                                {isEducation &&
                                    (<View style={{position: 'absolute', right: 10}}>
                                        <TouchableOpacity onPress={() => Actions.Education({})}>
                                            <Image
                                                resizeMode="contain"
                                                style={{width: 30, height: 30}}
                                                source={require('./../assets/profile-icons/plus-button.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>)
                                }
                            </View>
                            {!isEducation &&
                                (<View
                                    style={[styles.center, {height: 100, backgroundColor: '#F7F7F7', marginVertical: 10}]}>
                                    <TouchableOpacity onPress={() => Actions.Education({})}>
                                        <Image
                                            resizeMode="contain"
                                            style={{width: 75, height: 75}}
                                            source={require('./../assets/profile-icons/add.png')}
                                        />
                                    </TouchableOpacity>
                                </View>)
                            }
                            {isEducation &&
                                (<View style={{marginVertical: 10}}>
                                    <ListView
                                        enableEmptySections={true}
                                        dataSource={this.state.ds.cloneWithRows(educationHistory)}
                                        renderRow={this.renderEducationHistory.bind(this)}
                                    />
                                </View>)
                            }

                            {/*     REFERENCES      */}
                            <View style={[styles.center, {flexDirection: 'row', paddingVertical: 7, backgroundColor: 'white'}]}></View>
                            <View style={[styles.center, {flexDirection: 'row', backgroundColor: '#F7F7F7', marginTop: 5}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 30, height: 30}}
                                    source={require('./../assets/profile-icons/reference-icon.png')}
                                />
                                <Text style={{marginLeft: 10}}>REFERENCES</Text>
                                {isReferences &&
                                    <TouchableOpacity onPress={() =>  this.openModal('references')} style={{position: 'absolute', right: 5}}>
                                        <Image
                                            resizeMode="contain"
                                            style={{width: 30, height: 30}}
                                            source={require('./../assets/profile-icons/plus-button.png')}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                            {!isReferences &&
                                <View style={[styles.center, {height: 100, backgroundColor: '#F7F7F7', marginVertical: 10}]}>
                                    <TouchableOpacity onPress={() => this.openModal('references')}>
                                        <Image
                                            resizeMode="contain"
                                            style={{width: 75, height: 75}}
                                            source={require('./../assets/profile-icons/add.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                            {isReferences &&
                                (<View style={{marginVertical: 10}}>
                                    <ListView
                                        enableEmptySections={true}
                                        dataSource={this.state.ds.cloneWithRows(this.state.references)}
                                        renderRow={this.renderRow.bind(this)}
                                    />
                                </View>)
                            }

                            {/*     AVAILABILITY      */}
                            <View style={[styles.center, {flexDirection: 'row', paddingVertical: 7, backgroundColor: 'white'}]}></View>
                            <View style={[styles.center, {flexDirection: 'row', backgroundColor: '#F7F7F7', marginTop: 5}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 30, height: 30}}
                                    source={require('./../assets/profile-icons/discussion-white-bg.png')}
                                />
                                <Text style={{marginLeft: 10}}>AVAILABILITY</Text>
                            </View>

                            <View style={[styles.center, {height: 100, backgroundColor: '#F7F7F7', marginVertical: 10}]}>

                                {!this.state.availabilityShow &&
                                    (<TouchableOpacity onPress={() => this.setState({ availabilityShow: true })}>
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 75, height: 75 }}
                                            source={require('./../assets/profile-icons/add.png')}
                                        />
                                    </TouchableOpacity>)}

                                {this.state.availabilityShow &&
                                    (<View style={{ justifyContent: 'center'}}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                                            <Button
                                                onPress={() => this.setState({ isFullTime: true })}
                                                containerStyle={this.state.isFullTime ? styles.activeButton : styles.passiveButton}
                                                style={this.state.isFullTime ? styles.activeButtonText : styles.passiveButtonText}>
                                                {'Full-Time (> 30 Hours)'}
                                            </Button>
                                            <Button
                                                onPress={() => this.setState({ isFullTime: false })}
                                                containerStyle={!this.state.isFullTime ? styles.activeButton : styles.passiveButton}
                                                style={!this.state.isFullTime ? styles.activeButtonText : styles.passiveButtonText}>
                                                {'Part-Time (< 30 Hours)'}
                                            </Button>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                                            <Button
                                                onPress={() => this.onAvailabilitySavePress()}
                                                containerStyle={styles.saveButton}
                                                style={{ color: 'white' }}>
                                                SAVE
                                            </Button>
                                        </View>
                                    </View>)}
                            </View>

                            {/*     PERSONAL INFORMATION      */}
                            <View style={[styles.center, {flexDirection: 'row', paddingVertical: 7, backgroundColor: 'white'}]}></View>
                            <View style={[styles.center, {flexDirection: 'row', marginTop: 10, backgroundColor: '#F7F7F7'}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 40, height: 40}}
                                    source={require('./../assets/profile-icons/privacy.png')}
                                />
                                <Text style={{marginLeft: 10, color: 'red', fontWeight: 'bold', fontSize: 18}}>PERSONAL INFORMATION</Text>
                            </View>
                            <View style={ [styles.center, {marginVertical: 10}] }>
                                <Text>
                                    The information below is not available to the
                                </Text>
                                <Text>
                                    employer until you are hired
                                </Text>
                            </View>

                            {/*     HOME ADDRESS      */}
                            <View style={[styles.center, {flexDirection: 'row', paddingVertical: 7, backgroundColor: 'white'}]}></View>
                            <View style={[styles.center, {flexDirection: 'row', backgroundColor: '#F7F7F7'}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 30, height: 30}}
                                    source={require('./../assets/profile-icons/icons-home.png')}
                                />
                                <Text style={{marginLeft: 10}}>HOME ADDRESS</Text>
                            </View>

                            {!isHomeAddress &&
                                <View style={[styles.center, {height: 100, backgroundColor: '#F7F7F7', marginVertical: 10}]}>
                                    <TouchableOpacity onPress={() => Actions.HomeAddress({addressName: 'homeAddress'})}>
                                        <Image
                                            resizeMode="contain"
                                            style={{width: 75, height: 75}}
                                            source={require('./../assets/profile-icons/add.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                            {isHomeAddress &&
                                <View style={{backgroundColor:'#F7F7F7', marginTop: 10}}>
                                    <View style={{marginTop:10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor:'#F7F7F7'}}>
                                        <View>
                                            <Text style={{paddingLeft: 20}}>{homeAddress.homeAddress1}</Text>
                                            <Text style={{paddingLeft: 20}}>{homeAddress.homeAddress2}</Text>
                                            <Text style={{paddingLeft: 20}}>{homeAddress.city + ", " + homeAddress.state + " "}
                                                                            {homeAddress.zipCode}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => Actions.HomeAddress({addressName: 'homeAddress', homeAddress: homeAddress})}>
                                            <Image
                                                resizeMode="contain"
                                                style={{width: 40, height: 40}}
                                                source={require('./../assets/profile-icons/edit-button.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            {/*     CONTACT INFO      */}
                            <View style={[styles.center, {flexDirection: 'row', paddingVertical: 7, backgroundColor: 'white'}]}></View>
                            <View style={[styles.center, {flexDirection: 'row', backgroundColor: '#F7F7F7', marginTop: 5}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 30, height: 30}}
                                    source={require('./../assets/profile-icons/icons-home.png')}
                                />
                                <Text style={{marginLeft: 10}}>CONTACT INFO</Text>
                            </View>
                            {contactInfoErrorMessage &&
                                <Text style={styles.errorText}>{contactInfoErrorMessage}</Text>
                            }
                            <View style={[styles.center, { backgroundColor: '#F7F7F7', marginVertical: 10}]}>
                                {/* OLD PHONE CODE STRUCTURE, REMOVED
                                {!isContactInfoVerified &&
                                    <Image
                                        resizeMode="contain"
                                        style={{width: 20, height: 20, position: 'absolute', left: 8}}
                                        source={require('./../assets/profile-icons/phone.png')}
                                    />
                                }
                                {!isContactInfoVerified &&
                                    <Image
                                        resizeMode="contain"
                                        style={{width: 20, height: 20, position: 'absolute', left: 30}}
                                        source={require('./../assets/profile-icons/alert-red.png')}
                                    />
                                }
                                {(!contactInfoPhoneNumberEnterFields && !phoneNumber) && // && !isContactInfoVerified) &&
                                    <TouchableOpacity onPress={() => this.setState({contactInfoPhoneNumberEnterFields: true})}>
                                        <Image
                                            resizeMode="contain"
                                            style={{width: 75, height: 75}}
                                            source={require('./../assets/profile-icons/add.png')}
                                        />
                                    </TouchableOpacity>
                                }
                                {contactInfoPhoneNumberEnterFields &&
                                    <View style={{width: width - 80, marginLeft: 45, justifyContent: 'center', alignItems: 'center'}}>
                                        <View style={styles.inputField}>
                                            <Input
                                                style={{paddingLeft: 20, marginTop: 2}}
                                                defaultValue={this.state.contactInfoPhoneNumber}
                                                onChangeText={(text) => this.setState({contactInfoPhoneNumber: text})}
                                                returnKeyType="next"
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({contactInfoPhoneNumberEnterFields: false, contactInfoPhoneNumber: ''})}
                                                style={styles.contactInfoCancelButtonContainer}>
                                                <Text style={styles.contactInfoCancelButtonName}>CANCEL</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => this.contactInfoPhoneNumberValidation()}
                                                style={styles.contactInfoSaveButtonContainer}>
                                                <Text style={styles.contactInfoSaveButtonName}>SAVE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }*/}
                                {(isContactInfoVerified || true) &&
                                    <View style={{backgroundColor:'#F7F7F7', width: width}}>
                                        <View style={{marginTop:10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor:'#F7F7F7'}}>
                                            <View style={[{flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#F7F7F7'}]}>
                                                {!isContactInfoVerified ?
                                                    <Image
                                                        resizeMode="contain"
                                                        style={{width: 20, height: 20}}
                                                        source={require('./../assets/profile-icons/alert-red.png')}
                                                    /> :
                                                    <Image
                                                        resizeMode="contain"
                                                        style={{width: 22, height: 23}}
                                                        source={require('./../assets/profile-icons/phone.png')}
                                                    />
                                                }
                                                <Text style={{marginLeft: 10}}>{
                                                    phoneNumberFormatted
                                                }</Text>
                                            </View>
                                            {!isContactInfoVerified &&
                                             <View style={{flexDirection: 'row'}}>
                                                <TouchableOpacity
                                                    onPress={() => this.contactInfoPhoneNumberValidation()}
                                                    style={styles.contactInfoSaveButtonContainer}>
                                                    <Text style={styles.contactInfoSaveButtonName}>VERIFY</Text>
                                                </TouchableOpacity>
                                             </View>
                                            }
                                            <TouchableOpacity onPress={()=>Actions.EditContactInfo(
                                             {id: id, contactInfo: {phoneNumber: phoneNumber, email: email, verified: isContactInfoVerified}})}>
                                                <Image
                                                    resizeMode="contain"
                                                    style={{width: 40, height: 40}}
                                                    source={require('./../assets/profile-icons/edit-button.png')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{marginTop:10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor:'#F7F7F7'}}>
                                            <View style={[{flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#F7F7F7'}]}>
                                                <Image
                                                    resizeMode="contain"
                                                    style={{width: 22, height: 23}}
                                                    source={require('./../assets/profile-icons/email.png')}
                                                />
                                                <Text style={{marginLeft: 10}}>{email}</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>Actions.EditContactInfo(
                                             {id: id, contactInfo: {phoneNumber: phoneNumber, email: email, verified: isContactInfoVerified}})}>
                                            <Image
                                                resizeMode="contain"
                                                style={{width: 40, height: 40}}
                                                source={require('./../assets/profile-icons/edit-button.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                }
                            </View>


                            {/*     IDENTIFICATION      */}
                            {/* IDENTIFICATION IS NOT NEEDED FOR UPCOMING RELEASE
                            <View style={[styles.center, {flexDirection: 'row', marginTop: 10}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 30, height: 30}}
                                    source={require('./../assets/profile-icons/profile.png')}
                                />
                                <Text style={{marginLeft: 10}}>IDENTIFICATION</Text>
                            </View>
                            {!isIdentified &&
                            <View style={[styles.center, {height: 100, backgroundColor: '#F7F7F7', marginVertical: 10}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 20, height: 20, position: 'absolute', left: 30}}
                                    source={require('./../assets/profile-icons/alert-red.png')}
                                />
                                <TouchableOpacity onPress={() => this.openModal('identification')}>
                                    <Image
                                        resizeMode="contain"
                                        style={{width: 75, height: 75}}
                                        source={require('./../assets/profile-icons/add.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            }
                            {isIdentified &&
                            <View style={{backgroundColor:'white', marginTop: 10}}>
                                <View style={{marginTop:10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor:'rgba(216,216,216,0.2)'}}>
                                    <View>
                                        <Text style={{paddingLeft: 20}}>{identifyDocType} UPLOADED</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.openModal('identification')}>
                                        <Image
                                            resizeMode="contain"
                                            style={{width: 40, height: 40}}
                                            source={require('./../assets/profile-icons/edit-button.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            }
                            */}

                            {/*     LANGUAGES      */}
                            <View style={[styles.center, {flexDirection: 'row', paddingVertical: 7, backgroundColor: 'white'}]}></View>
                            <View style={[styles.center, {flexDirection: 'row', marginTop: 5, backgroundColor: '#F7F7F7'}]}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 30, height: 30}}
                                    source={require('./../assets/profile-icons/profile.png')}
                                />
                                <Text style={{marginLeft: 10}}>LANGUAGES</Text>
                                {isLanguages &&
                                (<View style={{position: 'absolute', right: 10}}>
                                    <TouchableOpacity onPress={() => Actions.Languages()}>
                                        <Image
                                            resizeMode="contain"
                                            style={{width: 30, height: 30}}
                                            source={require('./../assets/profile-icons/plus-button.png')}
                                        />
                                    </TouchableOpacity>
                                </View>)
                                }
                            </View>
                            {!isLanguages &&
                            (<View
                                style={[styles.center, {height: 100, backgroundColor: '#F7F7F7', marginTop: 10, marginBottom: 20}]}>
                                <TouchableOpacity onPress={() => Actions.Languages()}>
                                    <Image
                                        resizeMode="contain"
                                        style={{width: 75, height: 75}}
                                        source={require('./../assets/profile-icons/add.png')}
                                    />
                                </TouchableOpacity>
                            </View>)
                            }
                            {isLanguages &&
                            (<View style={{marginBottom: 10, marginTop: 20}}>
                                <ListView
                                    enableEmptySections={true}
                                    dataSource={this.state.ds.cloneWithRows(languages)}
                                    renderRow={this.renderLanguages.bind(this)}
                                />
                            </View>)
                            }
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    offset={200}
                    open={this.state.openModal}
                    overlayBackground={'rgba(100, 100, 100, 0.3)'}
                    modalDidOpen={() => undefined}
                    modalDidClose={() => this.setState({openModal: false})}
                    containerStyle={styles.modalContainer}
                    modalStyle={styles.modalContentContainer}
                >
                    <View>
                        <View style={styles.modalContent}>
                            <Image
                                resizeMode="contain"
                                style={{width: 110, height: 110}}
                                source={modalData.imgUrl}
                            />
                            <Text style={styles.modalText}>{modalData.paragraph}</Text>
                            {modalData.type === 'verifyPhoneNumber' &&
                            <View style={styles.verifyNumberInputField}>
                                <Input
                                    style={{paddingLeft: 20, marginTop: 2}}
                                    defaultValue={this.state.phoneNumberVerifyCode}
                                    onChangeText={(text) => this.setState({phoneNumberVerifyCode: text})}
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    placeholder="CODE"
                                />
                            </View>
                            }
                            {(modalData.type === 'references' || modalData.type === 'identification' || modalData.type === 'verifyPhoneNumber') &&
                            <View>
                                <TouchableOpacity onPress={() => modalData.button1.url(modalData.button1.arguments)} style={styles.modalButtonContainer}>
                                    <Text style={styles.modalButtonName}>{modalData.button1.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => modalData.button2.url(modalData.button2.arguments)}
                                                  style={( modalData.type === 'verifyPhoneNumber') ? styles.modalWhiteBackgroundButtonContainer : styles.modalButtonContainer}>
                                    <Text style={( modalData.type === 'verifyPhoneNumber') ? styles.modalWhiteBackgroundButtonName : styles.modalButtonName}>{modalData.button2.name}</Text>
                                </TouchableOpacity>
                            </View>
                            }
                            {(modalData.type === 'contactInfo') &&
                            <View>
                                <View style={styles.contactInfoModalButtonsRow}>
                                    <TouchableOpacity onPress={() => modalData.button1.url(modalData.button1.arguments)} style={styles.contactInfoModalSmallButtonContainer}>
                                        <Text style={styles.modalButtonName}>{modalData.button1.name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => modalData.button2.url(modalData.button2.arguments)} style={styles.contactInfoModalSmallButtonContainer}>
                                        <Text style={styles.modalButtonName}>{modalData.button2.name}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => modalData.button3.url(modalData.button3.arguments)} style={styles.modalWhiteBackgroundButtonContainer}>
                                        <Text style={styles.modalWhiteBackgroundButtonName}>{modalData.button3.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            }
                        </View>
                        <View style={styles.modalFooterContainer}>
                            <TouchableOpacity onPress={() => this.setState({openModal: false})}>
                                <Image
                                    resizeMode="contain"
                                    style={{width: 50, height: 50}}
                                    source={require('./../assets/profile-icons/close-button-modal.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 0
            },
            android: {
                paddingTop: 0
            }
        }),
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    activeButton: {
        padding: 3,
        height: 25,
        width: 170,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#007AFF'
    },
    activeButtonText: {
        fontSize: 15,
        color: 'white'
    },
    passiveButton: {
        padding: 3,
        height: 25,
        width: 170,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#007AFF'
    },
    passiveButtonText: {
        fontSize: 15,
        color: '#007AFF'
    },
    saveButton: {
        padding: 7,
        height: 35,
        width: 130,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#0022A1'
    },
    text: {
        fontSize: 15,
        color: '#4A4A4A',
    },
    modalContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    modalContentContainer: {
        marginTop: 65,
        width: width * 0.8,
        padding: 0,
        borderRadius: 5,
        backgroundColor: 'transparent'
    },
    modalContent: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: 'rgb(153,153,153)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    modalText: {
        color: '#4A4A4A',
        textAlign: 'center',
        paddingVertical: 10,
        width: width * 0.6
    },
    modalButtonContainer: {
        backgroundColor: '#0022A1',
        padding: 10,
        width: width * 0.55,
        marginVertical: 5
    },
    contactInfoModalSmallButtonContainer: {
        backgroundColor: '#0022A1',
        padding: 10,
        width: width * 0.3,
        marginVertical: 5,
        marginHorizontal: 5
    },
    modalWhiteBackgroundButtonContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        width: width * 0.55,
        marginVertical: 5,
    },
    modalButtonName: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalWhiteBackgroundButtonName: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalFooterContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    inputField: {
        borderColor: 'rgba(74,74,74,0.5)',
        backgroundColor: 'white',
        borderWidth: 1,
        height: 40,
        width: width - 80
    },
    verifyNumberInputField: {
        borderColor: 'rgba(74,74,74,0.5)',
        backgroundColor: 'white',
        borderWidth: 1,
        height: 40,
        width: width * 0.55
    },
    whiteBackgroundButtonContainer: {
        backgroundColor: 'white',
        padding: 10,
        width: (width - 100) / 2,
        marginTop: 10,
    },
    contactInfoCancelButtonContainer: {
        backgroundColor: 'white',
        padding: 10,
        width: (width - 100) / 2,
        marginTop: 10,
    },
    contactInfoSaveButtonContainer: {
        backgroundColor: '#0022A1',
        padding: 10,
        width: (width - 100) / 2,
        marginLeft: 10,
        marginTop: 10,
    },
    contactInfoCancelButtonName: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contactInfoSaveButtonName: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 2
    },
    contactInfoModalButtonsRow: {
        flexDirection: 'row'
    }
});

const userQuery = gql `
 query UserById($id: Uuid!){
  userById(id: $id){
    id
    firstName
    lastName
    zipCode
    homeAddress
    userPhoneConfirmed
    userPhoneNumber
    aboutMeText
    userEmail
    avatarUrl
    userReferencesByUserId{
      edges{
        node{
          id
          firstName
          lastName
          referencePhoneNumber
          referenceEmailAddress
          relationship
          userId
        }
      }
    }
    userEmployersByUserId{
      nodes{
         id
         userId
         employerName
         city
         state
         jobTitle
         jobDescription
         startDate
         endDate
      }
    }
  	userEducationsByUserId{
      nodes{
        id
        userId
        educationalInstitutionName,
        city
        state
        awardType
        fieldOfStudy
        startDate
        endDate
      }
    }
    userLanguagesByUserId {
      nodes {
        id
        userId
        languageName
      }
    }
    userAvailabilitiesByUserId {
      nodes {
        id
        userId
        hourRange
      }
    }
  }
}`;

const confirmUserPhoneNumber = gql `
  mutation updateUserById($id: Uuid!) {
      updateUserById(input: {id: $id, userPatch: {userPhoneConfirmed: true}}) {
          user{
              id
              userPhoneConfirmed
          }
      }
  }`;

const createUserAvailability = gql `
    mutation createUserAvailability($id: Uuid!, $userId: Uuid!, $hourRange: String!) {
        createUserAvailability(input: {userAvailability: {id: $id, userId: $userId, hourRange: $hourRange}}) {
            userAvailability {
                id
                userId
                hourRange
            }
        }
    }`;

const updateUserAvailabilityById = gql `
    mutation updateUserAvailabilityById($id: Uuid!, $userId: Uuid!, $hourRange: String!) {
        updateUserAvailabilityById(input: {id: $id, userAvailabilityPatch: {userId: $userId, hourRange: $hourRange}}) {
            userAvailability {
                id
                userId
                hourRange
            }
        }
    }`;

const MyProfile = compose(
    graphql(userQuery, {
        options: (ownProps) => {
            return {
                variables: {
                    id: ownProps.state.myProfile.id,
                }
            }
        }
    }),
    graphql(confirmUserPhoneNumber, {
        name: 'confirmUserPhoneNumber'
    }),
    graphql(createUserAvailability, {
        name: 'createUserAvailability'
    }),
    graphql(updateUserAvailabilityById, {
        name: 'updateUserAvailabilityById'
    })
)(MyProfileComponent);

export default MyProfile;


// To return this component to its original state, you must delete the row below, enable all gql template literals, and reactivate all source code under componentWillReceiveProps
//export default MyProfileComponent
