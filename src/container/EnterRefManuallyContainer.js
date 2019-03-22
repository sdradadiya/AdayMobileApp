/**
 * Created by Robert on 3/11/2017.
 */
import {connect} from "react-redux";
import {actions} from "../modules/myReference-module";
import EnterRefManuallyComponent from "../components/ReferenceComponent/EnterRefManuallyComponent";

const mapStateToProps = (store) => {
    return ({
        references: store.myReferences.myReferences,
        store,
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        saveReferenceData: (data) => {
            dispatch(actions.saveReferenceData(data));
        },
        updateReferenceData: (data) => {
            dispatch(actions.updateReferenceData(data));
        },
        removeReferenceData: (data) => {
            dispatch(actions.removeReference(data));
        },
        addContacts: (data) => {
            dispatch(actions.addContacts(data));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnterRefManuallyComponent);