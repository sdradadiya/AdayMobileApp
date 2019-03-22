/**
 * @flow
 */
'use strict';

import * as React from 'react';
import {
    AsyncStorage,
    Button,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, Alert,
    Platform
} from 'react-native';
import {SERVER_URL} from '../../constants';
import {
    Actions
} from 'react-native-router-flux';
import {gql, graphql } from 'react-apollo';
let {
    height : windowHeight,
    width: width
}  = Dimensions.get('window');
import Carousel from 'react-native-looped-carousel';
import SpinnerComponent from '../SpinnerComponent';
import FCM, {FCMEvent} from 'react-native-fcm';
//import {Tracker} from '../../constants';

/**
 *@summary welcome sequary welcome sequence for users, "view opportunities" is added due to appstore guidelines and improves user experience.
 * @toence for users, "view opportunities" is added due to appstore guidelines and improves user experience.
 * @todo refresh list gif: https://mobile.ant.design/components/refresh-control/
 * @version 1.0.0
 */
var debug = false;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
          loading: true
        }
    }

    openModal() {
      this.setState({modalVisible:true});
    }

    closeModal() {
      this.setState({modalVisible:false});
    }

    componentWillMount() {
        AsyncStorage.setItem('token', "", () => { 
            AsyncStorage.getItem('email', (err, email) => { 
                console.log('email', email)
                if (email) { // email cached, user should be logged in 
                    AsyncStorage.getItem('password', (err, password) => {
                      if (password){
                         this.props.mutate({
                                variables: {
                                    data: {
                                        email: email,
                                        password: password
                                    }
                                }
                            }).then(({ data }) => {
                                if (data.authenticate.jwt){
                                    AsyncStorage.setItem('token', data.authenticate.jwt, () => {
                                        console.log(this.state.email)
                                        Actions.reset("Account", { email: email });
                                        //Tracker.trackScreenView("All Shift");
                                        //Tracker.trackEvent(email, "Login In Successfull");
                                          FCM.on(FCMEvent.RefreshToken, (token) => {
                                            console.log(token)
                                            // fcm token may not be available on first load, catch it here
                                          });
                                                // iOS: show permission prompt for the first call. later just check permission in user settings
                                         // Android: check permission in user settings

                                          FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));

                                          FCM.getFCMToken().then(token => {
                                            debug && console.warn(token)
                                            var body = token
                                            debug && console.warn (JSON.stringify(this.props))
                                            try{
                                            debug && console.warn ("Store")
                                            debug && console.warn(this.props.store)
                                          }catch(error)
                                          {
                                            console.warn (error)
                                          }

                                            var osDevice = Platform.OS ==='ios' ? 'ios' : 'android'
                                            try {
                                            fetch(SERVER_URL + '/api/test', {
                                              method: 'POST',
                                              headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                              },
                                              body: JSON.stringify({
                                                token: token,
                                                actionType:  'saveToken',
                                                user_email: email,
                                                os: osDevice,
                                              }),
                                            });
                                                debug && console.warn ("Request sent")
                                              }
                                              catch (error)
                                              {

                                                console.warn (error)
                                              }
                                            debug && console.warn ("DATABASE UPDATED")        // store fcm token in your server


                                            FCM.getInitialNotification().then(notif => {
                                               console.log(notif)
                                            });
                                          })

                                    });
                                } else {
                                   this.setState({loading: false});
                                 }
                            }) .catch((err)=>{
                             console.log(err);
                             Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                         })
                      } else {
                        this.setState({loading: false})
                      }
                    })
                } else {
                  this.setState({loading: false})
                }
            })
        })
    }


    render() {

        /**
         * Components Section
         */

         if (this.state.loading) {
          return (
            <View style={{flex: 1, position: 'absolute', zIndex: 100}}>
                <SpinnerComponent />
            </View>
           )
         }

         const AdaySplashHeader = () => (
             <View style={styles.homePageHeaderContainer}>
                 <Image style={styles.logoImage}
                     source={require('./../assets/logos/aday-full-logo.png')}/>
             </View>
         )

       // const JoinAdayButton = () => (
       //     <TouchableOpacity style={styles.joinButton} onPress={()=>Actions.SignUpForm({})}>
       //          <Text style={styles.buttonWhiteText}>JOIN ADAY</Text>
       //      </TouchableOpacity>
       //  )

       const JoinAdayButtonTemp = () => (
           <TouchableOpacity style={styles.joinButton} onPress={() => this.openModal()}>
                <Text style={styles.buttonWhiteText}>JOIN ADAY</Text>
            </TouchableOpacity>
        )

        const SignInButton = () => (
            <TouchableOpacity style={styles.signButton} onPress={()=>Actions.Login({})}>
                <Text style={styles.buttonBlueText}>SIGN IN</Text>
            </TouchableOpacity>
        )

        // const ShowOpportunitiesButton = () => (
        //     <TouchableOpacity style={styles.opportunitiesButton}>
        //         <Text style={styles.buttonWhiteText}>VIEW JOB OPPORTUNITIES</Text>
        //     </TouchableOpacity>
        // )

        return (
          <View style={styles.homePageContainer}>
            <AdaySplashHeader />
            <Carousel delay={10000} style={styles.carouselContainer} autoplay bullets bulletStyle={styles.carouselBulletStyle} chosenBulletStyle={styles.carouselChosenBulletStyle} bulletsContainerStyle={styles.carouselBulletsContainerStyle}>
              <View style={styles.container}>
                <Image resizeMode="contain" style={{ flex: 2, width: "60%"}} source={require('./assets/manage-schedule.png')} />
                <Text style={ styles.bodyText }>Manage your schedule and pick up extra shifts from your workplace</Text>
              </View>
              <View style={styles.container}>
                <Image resizeMode="contain" style={{ flex: 2, width: "60%"}} source={require('./assets/climb-ladder.png')} />
                <Text style={ styles.bodyText }>Build your career through training opportunities at premium employers</Text>
              </View>
              <View style={styles.container}>
                <Image resizeMode="contain" style={{ flex: 2, width: "60%"}} source={require('./assets/preferences.png')} />
                <Text style={ styles.bodyText }>Enter your scheduling preferences and influence when, where, and how you earn</Text>
              </View>
            </Carousel>

          <View style={styles.footerContainer}>
              {/* <View style={{ flex: 0.25}}/> */}
              <View style={{flexDirection: 'row'}}>
                 <View style={{ flex: 0.06}}/>
                 <JoinAdayButtonTemp />
                  <View style={{ flex: 0.03}}/>
                  <SignInButton />
                  <View style={{ flex: 0.06}}/>
              </View>
              {/* <View style={{ flex: 1 }}>
                 <ShowOpportunitiesButton />
              </View>
              <View style={{ flex: 1.5}}/> */}
          </View>
          <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible} onRequestClose={() => this.closeModal()}>
              <View style={{marginTop: 22}}>
                      <_br />
                      <Text style={{color: '#000', alignSelf: 'center', fontSize: 24, fontFamily: 'RobotoCondensed-Regular' }}>Invitation Only</Text>
                      <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
                          <Image
                            style={{ width: 150, height: 150, resizeMode: 'contain'}}
                            source={{uri: 'https://s3.us-east-2.amazonaws.com/aday-mail-alerts/invitation-envelope.png'}}
                          />
                      </View>
                      <Text style={{color: '#595959', alignSelf: 'center', fontSize: 16, fontFamily: 'Lato-Regular' }}>Currently, sign-ups are by invitation only</Text>
                      <Text style={{color: '#595959', alignSelf: 'center', fontSize: 16, fontFamily: 'Lato-Regular' }}>Contact your HR rep for sign-up information</Text>
                      <_br />
                      <Button onPress={() => this.closeModal()} title="GO BACK" />
                </View>
            </Modal>
           </View>
        )
    };
};


const authenticate = gql `mutation authenticate($data: AuthenticateInput!){
        authenticate(input:$data) {
                jwt
        }
    }`


const HomeComponent = graphql(authenticate)(Home);
export default HomeComponent;

const styles = StyleSheet.create({
    /*
     * Page Specific Stylings
     */
    homePageContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#FFFFFF"
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    footerContainer: {
      flex: 0.75, //when adding back training opportunities, make this "1"
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"#ECEFF1"
    },
    bodyText: {
      width: "80%",
      marginTop: 20,
      marginBottom: 50,
      fontSize: 16,
      fontFamily: 'Lato-Regular',
      color: '#4A4A4A',
      textAlign: 'center'
    },


    /*
     * Animation Stylings
     */
    animation: {
        width: width - (width * 0.6),
        //hejustifyContntight: (width - (width * 0.6)),
        //justifyContententight: (width - (width * 0.6)),
        //justifyContententight:
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselContainer: {
        width: width * .95,
        flex: 2, //change back to 1.25 when using training button
        alignSelf: 'center',
        justifyContent: 'flex-start',
        padding: 0
    },
    carouselBulletStyle: {
        backgroundColor: 'grey',
        borderColor: 'transparent'
    },
    carouselChosenBulletStyle: {
        backgroundColor: 'black',
        borderColor: 'transparent'
    },
    carouselBulletsContainerStyle: {
        marginTop: 10
    },

    /**
     * Stylings for all components
     */

    /*
     * AdaySplashHeader Stylings
     */
     homePageHeaderContainer: {
      paddingTop: 40,
      paddingBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
     },
     logoImage: {
      paddingTop: 10,
      width: 90,
      height: 108,
      resizeMode: 'contain'
     },

    /*
     * JoinAdayButton Stylings
     */
    joinButton: {
        display: 'flex',
        backgroundColor: '#002DB0',
        height: 75,
        borderRadius: 5,
        flex: 0.41,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
    buttonWhiteText: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: 'white',
        fontWeight: 'bold',
    },

    /*
     * SignInButton Stylings
     */

    signButton: {
        display: 'flex',
        backgroundColor: '#FFF',
        height: 75,
        borderRadius: 5,
        flex: 0.41,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#002DB0',
        borderWidth: 1,
        shadowRadius: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
    buttonBlueText: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#002DB0',
        fontWeight: 'bold',
    },

    /*
     * ShowOpportunitiesButton Stylings
     */
    opportunitiesButton: {
        backgroundColor: '#00A863',
        width: width * .88,
        height: 45,
        paddingVertical: 5,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowRadius: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
});
