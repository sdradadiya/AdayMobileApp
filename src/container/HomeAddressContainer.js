/**
 * Created by Vardan on 2/2/2017.
 */
import {connect} from "react-redux";
import {actions} from '../modules/myProfile-module'
import HomeAddressComponent from "../components/HomeAddressComponent";

const mapStateToProps = (state) => {
    return ({
        state: state
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        saveHomeAddress: (homeAddress) => {
            dispatch(actions.saveHomeAddressData(homeAddress));
        }, 
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeAddressComponent);