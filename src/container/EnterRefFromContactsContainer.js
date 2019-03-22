/**
 * Created by Robert on 7/3/2017.
 */
import {connect} from "react-redux";
import {actions} from "../modules/myReference-module";
import EnterRefsFromContacts from "../components/ReferenceComponent/EnterRefFromContacts";

const mapStateToProps = (store) => {
    return ({
        references: store.myReferences.myReferences
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        saveReferenceData: (data) => {
            dispatch(actions.saveReferenceData(data));
        },
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnterRefsFromContacts);