/**
 * Created by Robert on 2/7/2017.
 */
import {connect} from "react-redux";
import EducationHistoryComponent from "../components/EducationHistoryComponent";

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
)(EducationHistoryComponent);