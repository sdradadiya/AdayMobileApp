/**
 * Created by Vardan on 6/30/2017.
 */
import {connect} from "react-redux";
import {actions} from "../modules/alertsSettings-module";
import Alerts from "../components/SettingsComponent/Alerts";

const mapStateToProps = (state) => {
    return ({
        state: state
    });
};
// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        getAlertSettingsData: () => {
            dispatch(actions.getAlertsSettings());
        },
        changeAlertSettings: (name) => {
            dispatch(actions.changeAlertSetting(name));
        },
        changeIdAlertSetting: (name) => {
            dispatch(actions.changeIdAlertSetting(name));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alerts);
