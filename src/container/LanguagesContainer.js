import {connect} from "react-redux";
import {actions} from "../modules/languages-module";
import LanguagesComponent from "../components/LanguagesComponent";

const mapStateToProps = (store) => {
    return ({
        store: store
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        saveLanguage: (data) => {
            dispatch(actions.saveLanguage(data));
        },
        deleteLanguage: (data) => {
            dispatch(actions.deleteLanguage(data));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguagesComponent);

