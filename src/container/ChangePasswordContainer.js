/**
 * Created by Robert on 2/13/2017.
 */
import {connect} from "react-redux";
import {actions} from "../modules/changePassword-module";
import ChangePassword from "../components/SettingsComponent/ChangePassword";

const mapStateToProps = (store) => {
    return ({
        store: store
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {

    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);