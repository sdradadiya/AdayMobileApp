/**
 * Created by Vardan on 2/2/2017.
 */
import {connect} from "react-redux";
import {actions} from "../modules/zipCode-module";
import ZipCodeComponent from "../components/ZipCodeComponent";

const mapStateToProps = (store) => {
    return ({
        state: store
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        getZipCodeLocation: (zipCode, addressName) => {
            dispatch(actions.getZipCodeLocation(zipCode, addressName));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ZipCodeComponent);
