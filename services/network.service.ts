/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import Toast from "react-native-root-toast";
import { MAPBOX_PUBLIC_TOKEN } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const liveUrl = 'http://prod.ecocompass.live/api/'
const baseUrl = 'http://34.242.139.134:5000/api/';
const prodUrl = 'https://prod.ecocompass.live/api/'
const endpoint = {
    signup: `${liveUrl}auth/signup`,
    login: `${liveUrl}auth/login`,
    logout: `${liveUrl}auth/logout`,
    saveLocation: `${liveUrl}user/savedlocations`,
    pref: `${liveUrl}user/preferences`,
    profile: `${liveUrl}user/profile`,
    goals: `${liveUrl}user/goals`
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
    ).catch(error => {

        console.log("Error", error)
    });
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

export const userLogout = async () => {
    return await fetch(endpoint.logout, {
        method: 'DELETE',
        headers: {
            'AUTHORIZATION': getTokenString(),
        },
    }).then(response => {
        return response.json();
    }
    ).catch(error => console.log("Error", error));
};

export const saveToken = async (STORAGE_KEY: any) => {
    try {
        let token_obj = {
            accessToken: STORAGE_KEY,
            timestamp: (new Date()).getTime(),
        };
        await AsyncStorage.setItem('access_token_obj', JSON.stringify(token_obj));
    } catch (e) {
        console.log('Failed to save the data to the storage');
    }
};

export const readToken = async () => {
    try {
        const value = await AsyncStorage.getItem('access_token_obj');
        if (value) {
            let token_obj = JSON.parse(value);
            return token_obj;
        }

    } catch (e) {
        console.log('Failed to save the data to the storage');
        return '';
    }
};

/*const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage successfully cleared!');
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  }; */

export const removeStorageItem = function (key: string) {
    return AsyncStorage.removeItem(key);
};

export const getPath = function (coordinateObj: any) {
    return fetch(`http://141.148.199.176:8080/api/routes?` + new URLSearchParams(coordinateObj),
        {
            method: 'GET',
            headers: {
                'Host': '141.148.199.176:8080',
            },
        })
        .then((response) => response.json());
    // .then((res) => res);
};

export const getSaveLocations = async function () {
    const token = await readToken();
    return await fetch(endpoint.saveLocation, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw 'error';
            }
        }).catch(e => console.log(e));
}

export const saveLocation = async function (data: any) {
    const token = await readToken();
    let stringData = JSON.stringify(data);
    return await fetch(endpoint.saveLocation, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
            'Content-Length': stringData,
        },
        body: data,
    }).then(response => {
        console.log(response.status);
        return response.json();
    })
        .catch(error => {
            return { error: true, message: error };
        });
};

export const userPref = async (payload: any) => {
    let payload2 = payload.payload;
    payload2 = JSON.stringify(payload2);
    console.log("Pref",payload2)
    let token = await readToken();
    return await fetch(endpoint.pref, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(payload2),
            'Authorization': `Bearer ${token.accessToken}`,
        },
        body: payload2,
    }).then(response => {

        return response.json();
    })
        .catch(err => console.log("Error", err));
};

export const userGoals = async (payload: any) => {
    let payload2 = payload.payload;
    var date = new Date();
    let created_date=Date.now();
    let expiry_date = date.setDate(date.getDate() + 7);
    let pay = [{
        type: "walking",
        target: payload2.walking_weight,
        created_at: created_date,
        expiry: expiry_date
    }, {
        type: "cycling",
        target: payload2.bike_weight,
        created_at: created_date,
        expiry: expiry_date,
    }, {
        type: "public_transport",
        target: payload2.public_transport,
        created_at: created_date,
        expiry: expiry_date,
    }]

    
    let pay2 = JSON.stringify(pay)
    let token = await readToken();
    console.log("Mhaaro Payload", pay2)
    return await fetch(endpoint.goals, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(pay2),
            'Authorization': `Bearer ${token.accessToken}`,
        },
        body: pay2,
    }).then(response => {

        return response.json();
    })
        .catch(err => console.log("Error", err));
};


export const readProfile = async () => {

    let token = await readToken();
    return await fetch(endpoint.profile, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`,
        },
    }).then(response => {

        return response.json();
    })
        .catch(err => console.log("Error", err));
};

export const readGoals = async () => {

    let token = await readToken();
    return await fetch(endpoint.goals, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`,
        },
    }).then(response => {

        return response.json();
    })
        .catch(err => console.log("Error", err));
};


export const getPreference = async () => {
    let token = await readToken();
    return await fetch(endpoint.pref, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`,
        },
    }).then(response => {
        return response.json();
    }).catch(err => console.log("Error", err))
}
