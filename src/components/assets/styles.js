import {
    Dimensions
} from 'react-native';

let {height, width} = Dimensions.get('window');

export default {
    textStyle: {
        color: "rgba(74,74,74,0.5)",
    },
    inputFieldContainer: {
        height:45,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 0,
        paddingBottom: 0
    },
    badgeStyle: {
        position: 'absolute', 
        right: 0, 
        height:18, 
        width:18
    },
    badgeStyleWindow: {
        position: 'absolute', 
        right: 0,
        top: 3, 
        height:18, 
        width:18
    },
    buttonStyle: {
        flex: 1,
        width: width - 20,
        maxHeight: 40,
        minHeight: 40,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#0022A1",
        paddingHorizontal: 0,
        shadowColor: '#000000',
    	shadowOffset: {
     	width: 0,
      	height: 4
    	},
    	shadowRadius: 1,
    	shadowOpacity: .50
    },
    contactsView: {
        flex:1, 
        flexDirection:"row", 
        marginTop: 5
    },
    contentContainer: {
        marginTop: 30,
        flex: 1,
        flexDirection: "column",
        alignSelf: 'flex-start'
    },
    contentContainerError: {
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        alignSelf: 'flex-start'
    },
    textBadge: {
        color: 'white', 
        fontFamily: 'Arial', 
        fontWeight: 'bold', 
        fontSize: 11
    },
}