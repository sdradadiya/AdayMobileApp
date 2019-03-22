/**
 * Created by Vardan on 7/10/2017.
 */
import {connect} from "react-redux";
import {actions} from "../modules/myProfile-module";
import EditContactInfoComponent from "../components/EditContactInfoComponent";

const mapStateToProps = (store) => {
    return ({
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        updateContactInfo: (data) => {
            dispatch(actions.saveContactInfoData(data));
        },
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContactInfoComponent);