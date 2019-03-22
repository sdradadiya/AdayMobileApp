import React,{ Component } from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {gql, graphql, compose} from 'react-apollo';
import {orderBy, uniqBy} from 'lodash';

class Position extends Component{
    constructor(){
        super();
        this.state = {
            allPositions: []
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.allPositions && nextProps.allPositions.allPositions && nextProps.allPositions.allPositions.nodes)
        {
            let positionsSorted = orderBy(nextProps.allPositions.allPositions.nodes, function(e) { return e.positionName}, ['asc'])
            this.setState({allPositions: positionsSorted})
        }
    }

    renderPosition = (item) => {
        return(
            <View style={styles.positionCell}>
                <View>
                    <Text style={{fontSize:22}}>{item.positionName}</Text>
                </View>
                <View>
                    {(item.jobsByPositionId.nodes.length > 0 && item.jobsByPositionId.nodes[0].isPositionActive)?
                    <View>
                        <Image source={require('../../assets/Blue_Check.png')} style={{ height: 25, width: 25, tintColor:'rgba(20, 139, 242, 1)'}} />
                    </View>
                        :null
                     }
                </View>
            </View>
        )
    };

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.allPositions}
                    renderItem={({item}) => this.renderPosition(item)}
                    bounces={false}/>
            </View>
        );
    }

}

const allPositions = gql`
query relevantPositionsQuery ($corporationId: Uuid, $userId: Uuid) {
    allPositions (condition: {corporationId: $corporationId}) {
        nodes {
            id
            positionName
            traineeHours
            jobsByPositionId (condition: { isPositionActive: true, userId: $userId }) {
                nodes {
                    id
                    isPositionActive
                    primaryJob
                    rating
                    userId
                    numTraineeHoursCompleted
                }
            }
        }
    }
}`;

export default compose(
    graphql(allPositions, {
        name: 'allPositions',
        options: (ownProps) => {
            return {
                variables: {
                    corporationId: ownProps.corporationId,
                    userId: ownProps.userId,
                }
            }
        }
    })
)(Position);

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#FFFFFF"
    },
    positionCell: {
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:'white'
    },
});