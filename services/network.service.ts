/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import Toast from "react-native-root-toast";
import { MAPBOX_PUBLIC_TOKEN } from "../constants";
const baseUrl = 'http://3.249.30.30:5050/api/'
const endpoint = {
    signup: `${baseUrl}auth/signup`,
    login: `${baseUrl}auth/login`
}
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
    let payload2 = payload.payload
    payload2 = JSON.stringify(payload2)
    return await fetch(endpoint.signup, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(payload2)
        },
        body: payload2
    }).then(response => response.json()
    ).catch(error => console.log("Error", error))
}

export const userLogin = async (payload: any) => {
    let payload2 = payload.payload
    payload2 = JSON.stringify(payload2)
    return await fetch(endpoint.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(payload2)
        },
        body: payload2
    }).then(response => response.json()
    ).catch(error => console.log("Error", error))

}