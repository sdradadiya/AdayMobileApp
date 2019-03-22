/**
 * Created by Vardan on 1/28/2017.
 */
import {connect} from "react-redux";
import {actions} from "../modules/account-module";
import {actions as profileActions} from "../modules/myProfile-module";
import AccountComponent from "../components/AccountComponent/AccountComponent";

const mapStateToProps = (store) => {
    return ({
        store: store
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        saveId: (id) => {
            dispatch(profileActions.saveId(id));
        },
        saveContactInfo: (data) => {
            dispatch(profileActions.saveContactInfoData(data));
        },
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountComponent);
