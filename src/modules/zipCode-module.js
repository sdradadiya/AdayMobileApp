/**
 * Created by Vardan on 7/3/2017.
 */
import {createAction, createReducer} from "redux-action";
import axios from 'axios';

const GET_ZIP_CODE_LOCATION = "GET_ZIP_CODE_LOCATION";

const getZipCodeLocation = createAction(GET_ZIP_CODE_LOCATION, (zipCode, addressName) => {
    const url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode;
    return axios.get(url)
        .then((response) => {
            const result = response.data;
            let addressIndex;
            let address;
            for (let i = 0; i < result.results.length; i++) {
                (result.results[i].address_components[3]) ? addressIndex = i : addressIndex = null;
            }
            if (typeof(addressIndex) === 'number') {
                let responseAddressAComponents = result.results[addressIndex].address_components;
                address = responseAddressAComponents[1].long_name + ', ' + responseAddressAComponents[2].short_name;
            } else {
                address = 'Invalid Zip Code';
            }
            return {
                address: address,
                zipCode: zipCode,
                addressName: addressName
            }
        })
});

const initialState = {};

export const actions = {
    getZipCodeLocation
};

const zipCodeReducer = createReducer(initialState, ({
    [GET_ZIP_CODE_LOCATION]: (actionPayload, state) => {

        return {...state, [actionPayload.addressName]: actionPayload.address, zipCode: actionPayload.zipCode};
    },
}));

export default zipCodeReducer;
