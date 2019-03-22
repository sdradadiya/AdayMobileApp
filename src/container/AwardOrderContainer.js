/**
 * Created by Robert on 2/13/2017.
 */
import {connect} from "react-redux";
import AwardOrderComponent from "../components/AwardOrderComponent";

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
)(AwardOrderComponent);