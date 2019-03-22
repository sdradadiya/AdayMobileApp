/* @flow*/
import {connect} from "react-redux";
import {actions} from "../modules/aboutMe-container";
import AboutMeComponent from "../components/AboutMeComponent";

const mapStateToProps = (store) => {
    return ({
        store: store,
        aboutMe: store.aboutMe
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        saveAboutMeData: (data) => {
            dispatch(actions.saveAboutMeData(data));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutMeComponent);
