import React, {
    Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

let {
    width
} = Dimensions.get('window');
import {
    gql,
    ApolloClient,
    graphql
} from 'react-apollo';
import {
    withApollo
} from 'react-apollo';
import {
    compose
} from 'react-apollo';

import OpportunitiesList from './OpportunitiesList';
//import {Tracker} from "../../constants/index";

const allOpportunitiesQuery = gql `
 query allOpportunities {
    allOpportunities {
        edges{
          node{
            workplaceId
            positionId
            opportunityWage
            isPublic
            id
            workplaceByWorkplaceId {
              address
              workplaceImageUrl
              brandByBrandId {
                brandName
                brandIconUrl
              }
            }
            positionByPositionId{
              positionName
            }
          }
        }
    }
  }`;

 /**
  * The primary sheet for opportunities in the application
  * @author Vardan
  * @todo slider with customized color: https://mobile.ant.design/components/slider/
  * @todo refresh control: https://mobile.ant.design/components/refresh-control/
  * @since August 11, 2017
  */
class Opportunities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            showFilter: false,
            isData: false,
            isAssociatesList: false,
            associatesName: ''
        }
       //Tracker.trackScreenView("Oppotunities");

    }

    componentDidMount() {
        const listData = this.props.state.opportunities.data;
        //const listData = [];
        const isData = (listData.length > 0);
        const associatesName = "Restaurant Associate's";
        this.setState({
            listData,
            isData,
            associatesName
        });
    }

    render() {
        const {
            listData,
            isData,
        } = this.state;
        /**
         * ToDo
         * instead of onPress bellow (for Start Over button) should be query request function, which will get default opportunities
         *
         */
        return (
            <View style={{flex: 627/667}}>

            {/*Source: globals*/}
                <View style={styles.contentContainer}>
                    {isData &&
                    <OpportunitiesList listData={listData}/>
                    }
                    {!isData &&
                    <View style={{backgroundColor: '#FAFAFA', flex: 1, alignItems: 'center'}}>
                       <Image style={{width: 150, height: 150, marginVertical: 30}}
                           source={require('../assets/noOpportunitiesIcon.png')}/>
                        <View style={{alignItems: 'center', width: width * 0.7}}>
                            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5, textAlign: 'center'}}>No Opportunities Found</Text>
                            <Text style={{fontSize: 15, textAlign: 'center'}}>We cannot find any opportunities in your area, please check back soon!</Text>
                            <TouchableOpacity onPress={() => this.setState({isData: true})} style={styles.buttonContainer}>
                                <Text style={{color: 'white'}}>START OVER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 5,
        flex: 1
    },
    buttonContainer: {
        marginTop: 30,
        backgroundColor: '#0022A1',
        paddingVertical: 5,
        paddingHorizontal: 30,
    }
});

Opportunities.propTypes = {
    client: React.PropTypes.instanceOf(ApolloClient).isRequired,
};

const OpportunitiesComponent = compose(
    graphql(allOpportunitiesQuery),
)(withApollo(Opportunities));

export default OpportunitiesComponent;
