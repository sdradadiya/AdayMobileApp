import {createAction, createReducer} from "redux-action";

export const actions = {};

const initialState = {
    data: [
        {
            name: 'Cashier, Part-Time',
            companyType: "Restaurant Associate's",
            address: "1585 Massachusetts Avenue, Cambridge • 1.6 miles away",
            coordinate: {latitude: 37.78261276633253, longitude: -122.4498198991446},
            logo: require('./../components/assets/logos/logo1.png'),
            color: 'red'
        },
        {
            name: 'Cold Food Salad, Full-Time',
            companyType: "Flik Hospitality Group",
            address: "101 Huntington Avenue, Boston • 3.6 miles away",
            coordinate: {latitude: 37.78261276633253, longitude: -122.4598198991446},
            logo: require('./../components/assets/logos/logo2.png'),
            color: 'red'
        },
        {
            name: 'Food Service Worker, Part-Time',
            companyType: "Flik Hospitality Group",
            address: "16 Medford Street, Arlington • 6.4 miles away",
            coordinate: {latitude: 37.73261276633253, longitude: -122.4498198991446},
            logo: require('./../components/assets/logos/logo3.png'),
            color: 'red'
        },
        {
            name: 'Cook, Full-Time',
            companyType: "Eurest Services",
            address: "1 Memorial Drive, Cambridge • 2.8 miles away",
            coordinate: {latitude: 37.78261276633253, longitude: -122.4398198991446},
            logo: require('./../components/assets/logos/logo4.png'),
            color: 'red'
        },
        {
            name: 'Patient Flow Coordinator, Full-Time',
            companyType: "Crothall Healthcare",
            address: "736 Cambridge St, Brighton • 1.9 miles away",
            coordinate: {latitude: 37.38261276633253, longitude: -122.4498198991446},
            logo: require('./../components/assets/logos/logo5.png'),
            color: 'red'
        },
        {
            name: 'Cashier, Part-Time',
            companyType: "Restaurant Associate's",
            address: "1585 Massachusetts Avenue, Cambridge • 1.6 miles away",
            coordinate: {latitude: 37.78261276633253, longitude: -122.4498198991446},
            logo: require('./../components/assets/logos/logo1.png'),
            color: 'red'
        },
        {
            name: 'Cold Food Salad, Full-Time',
            companyType: "Flik Hospitality Group",
            address: "101 Huntington Avenue, Boston • 3.6 miles away",
            coordinate: {latitude: 37.78261276633253, longitude: -122.4491198991446},
            logo: require('./../components/assets/logos/logo2.png'),
            color: 'red'
        },
        {
            name: 'Food Service Worker, Part-Time',
            companyType: "Flik Hospitality Group",
            address: "16 Medford Street, Arlington • 6.4 miles away",
            coordinate: {latitude: 37.78771276633253, longitude: -122.4498198991446},
            logo: require('./../components/assets/logos/logo3.png'),
            color: 'red'
        },
        {
            name: 'Cook, Full-Time',
            companyType: "Eurest Services",
            address: "1 Memorial Drive, Cambridge • 2.8 miles away",
            coordinate: {latitude: 37.78261276633253, longitude: -122.4388198991446},
            logo: require('./../components/assets/logos/logo4.png'),
            color: 'red'
        },
        {
            name: 'Patient Flow Coordinator, Full-Time',
            companyType: "Crothall Healthcare",
            address: "736 Cambridge St, Brighton • 1.9 miles away",
            coordinate: {latitude: 37.785661276633253, longitude: -122.4498198991446},
            logo: require('./../components/assets/logos/logo5.png'),
            color: 'red'
        },
    ]
};


const opportunitiesReducer = createReducer(initialState, ({}));

export default opportunitiesReducer;