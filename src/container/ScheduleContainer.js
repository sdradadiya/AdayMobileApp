/**
 * Created by Vardan on 7/17/2017.
 */
import {connect} from "react-redux";
import {actions} from "../modules/schedule-module";
import ScheduleComponent from "../components/ScheduleComponent";

const mapStateToProps = (store) => {
    return ({
        store: store
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        addShiftData: (data) => {
            dispatch(actions.addShiftData(data));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleComponent);