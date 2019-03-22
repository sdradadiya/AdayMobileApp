/**
 * Created by Vardan on 6/30/2017.
 */
import {connect} from "react-redux";
import {actions} from "../modules/alertsSettings-module";
import AlertSettings from "../components/SettingsComponent/AlertSettings";

const mapStateToProps = (store) => {
    return ({
        store: store
    });
};

const mapDispatchToProps = (dispatch) => ({
    actions: {

    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertSettings);
