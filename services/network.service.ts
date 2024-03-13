/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import Toast from "react-native-root-toast";
import { MAPBOX_PUBLIC_TOKEN } from "../constants";
import * as RootNavigation from '../../wayfinding/components/Navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseUrl = 'http://34.242.139.134:5050/api/';
const endpoint = {
    signup: `${baseUrl}auth/signup`,
    login: `${baseUrl}auth/login`,
    logout: `${baseUrl}auth/logout`,
    pref: `${baseUrl}user/preferences`,
};
let access_token: any = '';

const getTokenString = () => {
    let access_token_str = `Bearer ${access_token}`;
    return access_token_str;
};

export const getLocationData = async (data: any) => {
    try {
        const response = await fetch(
            `http://ecocompass.anupal.me/test-core?latitude=${encodeURIComponent(
                data.latitude
            )}&longitude=${encodeURIComponent(data.longitude)}`,
            { method: "GET" }
        );

        const json = await response.json();
        Toast.show(json.message, {
            duration: 10000,
        });
        console.log(json);
    } catch (error) {
    } finally {
    }
};

const getUserClickLoc = function (loc: any) {
    let locObj = loc.nativeEvent.coordinate;
    getLocationData({
        latitude: locObj.latitude,
        longitude: locObj.longitude,
    });
};

export const geoCodeApi = function (text: string, proximity: string = '') {
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?` + new URLSearchParams({
        access_token: MAPBOX_PUBLIC_TOKEN,
        proximity,
    })).then(response => response.json())
        .catch(error => console.log(error));
};

export const userSignup = async (payload: any) => {
    let payload2 = payload.payload;
    payload2 = JSON.stringify(payload2);
    return await fetch(endpoint.signup, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(payload2),
        },
        body: payload2,
    }).then(response => response.json()
    ).catch(error => console.log("Error", error));
};

export const userLogin = async (payload: any) => {
    let payload2 = payload.payload;
    payload2 = JSON.stringify(payload2);
    return await fetch(endpoint.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(payload2),
        },
        body: payload2,
    }).then(response => response.json()
    ).catch(error => console.log("Error", error));

};

export const userLogout = async (token: any) => {
    return await fetch(endpoint.logout, {
        method: 'DELETE',
        headers: {
            'AUTHORIZATION': token,
        },
    }).then(response => {
        response.json();
        RootNavigation.navigate('Login', {});
    }
    ).catch(error => console.log("Error", error));
};

export const saveToken = async (STORAGE_KEY: any) => {
    try {
        await AsyncStorage.setItem('accesstoken', STORAGE_KEY);
    } catch (e) {
        console.log('Failed to save the data to the storage');
    }
};

export const readToken = async () => {
    try {
        const value = await AsyncStorage.getItem('accesstoken');
        access_token = value;
        return value;
    } catch (e) {
        console.log('Failed to save the data to the storage');
    }
}

/*const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage successfully cleared!');
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  }; */

export const getPath = function (coordinateObj: any) {
    return fetch(`http://141.148.199.176:8080/api/routes?` + new URLSearchParams(coordinateObj),
        {
            method: 'GET',
            headers: {
                'Host': '141.148.199.176:8080',
            },
        })
        .then((response) => response.json())
        .then((res) => res);
};

export const readPref = async (payload: any) => {
    let payload2 = payload.payload;
    payload2 = JSON.stringify(payload2);
    console.log(access_token);
    return await fetch(endpoint.pref, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(payload2),
            'Authorization': getTokenString(),
        },
        body: payload2,
    }).then(response => response.json())
        .catch(err => console.log("Error", err));
};
