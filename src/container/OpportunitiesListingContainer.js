import {connect} from "react-redux";
import {actions} from "../modules/opportunities-module";
import OpportunitiesListing from "../components/OpportunitiesComponent/OpportunitiesListing";

const mapStateToProps = (state) => {
    return ({
        data: state.opportunities.data
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
)(OpportunitiesListing);
