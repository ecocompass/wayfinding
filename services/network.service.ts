/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import Toast from "react-native-root-toast";
import { MAPBOX_PUBLIC_TOKEN } from "../constants";
import * as RootNavigation from '../../wayfinding/components/Navigation/RootNavigator';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Store } from "lucide-react-native";
import { storeToken } from "../store/actions/auth";

const baseUrl = 'http://34.242.139.134:5050/api/';
const endpoint = {
    signup: `${baseUrl}auth/signup`,
    login: `${baseUrl}auth/login`,
    logout: `${baseUrl}auth/logout`
}
let access_token: any = '';

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
        }
    }).then(response => {
        response.json();
        RootNavigation.navigate('Login', {})
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
        console.log('Failed to save the data to the storage')
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
