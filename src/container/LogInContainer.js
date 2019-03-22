import {connect} from "react-redux";
import {actions} from "../modules/login-module";
import LoginComponent from "../components/LoginComponent";

const mapStateToProps = (state) => {
    return ({
        state: state
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        loginAction: (email, password) => {
            dispatch(actions.loginAction(email, password));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);
