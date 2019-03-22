import {connect} from "react-redux";
import {actions} from "../modules/opportunities-module";
import OpportunitiesComponent from "../components/OpportunitiesComponent";

const mapStateToProps = (state) => {
    return ({
        state: state
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
)(OpportunitiesComponent);