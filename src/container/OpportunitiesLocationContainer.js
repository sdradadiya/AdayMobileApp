import {connect} from "react-redux";
import {actions} from "../modules/opportunities-module";
import OpportunitiesLocation from "../components/OpportunitiesComponent/OpportunitiesLocation";

const mapStateToProps = (state) => {
    return ({
        opportunities: state.opportunities.data
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
)(OpportunitiesLocation);
