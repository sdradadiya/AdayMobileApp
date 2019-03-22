import {
    connect
} from "react-redux";
import {
    actions
} from "../modules/home-module";
import HomeComponent from "../components/HomeComponent/HomeComponent";

const mapStateToProps = (state) => {
    return ({
        state: state
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);
