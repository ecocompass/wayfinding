import Toast from "react-native-root-toast";
import { MAPBOX_PUBLIC_TOKEN, status, weather_api_key } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const liveUrl = 'http://prod.ecocompass.live/api/';
const baseUrl = 'http://34.242.139.134:5000/api/';
const prodUrl = 'https://prod.ecocompass.live/api/';
const endpoint = {
    signup: `${liveUrl}auth/signup`,
    login: `${liveUrl}auth/login`,
    logout: `${liveUrl}auth/logout`,
    saveLocation: `${liveUrl}user/savedlocations`,
    pref: `${liveUrl}user/preferences`,
    profile: `${liveUrl}user/profile`,
    saveTrip: `${liveUrl}user/trips`,
    goals: `${liveUrl}user/goals`,
    weather: "https://api.openweathermap.org/data/2.5/weather?",
    feedback: `${liveUrl}trips/feedback`,
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
    return fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?` +
        new URLSearchParams({
            access_token: MAPBOX_PUBLIC_TOKEN,
            proximity,
        })
    )
        .then((response) => response.json())
        .catch((error) => console.log(error));
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
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('Error', error);
        });
};

export const userLogin = async (payload: any) => {
    let payload2 = payload.payload;
    payload2 = JSON.stringify(payload2);
    return await fetch(endpoint.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload2,
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => console.log('Error', error));
};

export const userLogout = async () => {
    return await fetch(endpoint.logout, {
        method: 'DELETE',
        headers: {
            AUTHORIZATION: getTokenString(),
        },
    })
        .then((response) => {
            return response.status === status.ok ? response.json() : false;
        })
        .catch((error) => console.log("Error", error));
};

export const saveToken = async (STORAGE_KEY: any) => {
    try {
        let token_obj = {
            accessToken: STORAGE_KEY,
            timestamp: new Date().getTime(),
        };
        await AsyncStorage.setItem('access_token_obj', JSON.stringify(token_obj));
    } catch (e) {
        console.log('Failed to save the data to the storage');
    }
};
export const saveMap = async (payload: any) => {
    try {
        let map_obj = {
            payload: payload,
            timestamp: new Date().getTime(),
        };
        await AsyncStorage.setItem('map_obj', JSON.stringify(map_obj));
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

export const readMap = async () => {
    try {
        const value = await AsyncStorage.getItem('map_obj');
        if (value) {
            let map_obj = JSON.parse(value);
            console.log('Mapobj', map_obj);
            return map_obj;
        }
    } catch (e) {
        console.log('Failed to fetch the data to the storage');
        return '';
    }
};

export const saveGoalToken = async (STORAGE_KEY: any) => {
    try {
        let token_obj = {
            goalToken: STORAGE_KEY,
            timestamp: new Date().getTime(),
        };
        await AsyncStorage.setItem('goal_token_obj', JSON.stringify(token_obj));
    } catch (e) {
        console.log('Failed to save the data to the storage');
    }
};
export const readGoalToken = async () => {
    try {
        const value = await AsyncStorage.getItem('goal_token_obj');
        if (value) {
            let token_obj = JSON.parse(value);
            return token_obj;
        }
    } catch (e) {
        console.log('Failed to save the data to the storage');
        return '';
    }
};
export const removeStorageItem = function (key: string) {
    return AsyncStorage.removeItem(key);
};

export const getPath = async function (coordinateObj: any) {
    console.log(coordinateObj);
    const token = await readToken();
    return fetch(
        'http://prod.ecocompass.live/api/routes2?' +
        new URLSearchParams(coordinateObj),
        {
            method: 'GET',
            headers: {
                AUTHORIZATION: token,
            },
        }
    )
        .then((response) => {
            if (response.status === status.ok) {
                return response.json();
            } else {
                return false;
            }
        })
        .catch((e) => {
            console.log(e);
            return false;
        });
};

export const getSaveLocations = async function () {
    const token = await readToken();
    return await fetch(endpoint.saveLocation, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            return response.status === status.ok ? response.json() : false;
        })
        .catch((e) => console.log(e));
};

// {
//   "payload": {
//       "awards": {
//           "awards for walking": [
//               "Achievement Unlocked: Reached walking goal of 50 km."
//           ]
//       },
//       "message": "Saved Trips"
//   }
// }

export const saveTrip = async function (data: any) {
    const token = await readToken();
    let strData = JSON.stringify(data);
    return await fetch(endpoint.saveTrip, {
        method: 'POST',
        body: strData,
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
            'Content-Length': strData,
        },
    })
        .then((response) => {
            if (response.status === status.ok) {
                return response.json();
            } else {
                return { error: true, response: response.json() };
            }
        })
        .catch((err) => {
            return { error: true, message: err };
        });
};

export const saveLocation = async function (data: any) {
    const token = await readToken();
    return await fetch(endpoint.saveLocation, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow',
    })
        .then((response) => {
            return response.status === status.ok ? response.json() : false;
        })
        .catch((error) => {
            return { error: true, message: error };
        });
};

export const userPref = async (payload: any) => {
    let payload2 = payload.payload;
    payload2 = JSON.stringify(payload2);
    let token = await readToken();
    return await fetch(endpoint.pref, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(payload2),
            Authorization: `Bearer ${token.accessToken}`,
        },
        body: payload2,
    })
        .then((response) => {
            return response.status === status.ok ? response.json() : false;
        })
        .catch((err) => console.log("Error", err));
};
export const userFeedback = async (payload: any) => {
    let payload2 = payload.payload;
    payload2 = JSON.stringify(payload2);
    let token = await readToken();
    return await fetch(endpoint.feedback, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(payload2),
            Authorization: `Bearer ${token.accessToken}`,
        },
        body: payload2,
    })
        .then((response) => {
            return response.status === status.ok ? response.json() : false;
        })
        .catch((err) => console.log("Error", err));
};

export const userGoals = async (payload: any) => {
    let payload2 = payload.payload;
    let newDate = new Date();
    let date = Math.floor(newDate.getTime() / 1000);
    let created_date = date;
    saveGoalToken(created_date);
    let expiry_date = newDate.setDate(newDate.getDate() + 7);
    expiry_date = Math.floor(new Date(expiry_date).getTime() / 1000);
    let pay = [
        {
            type: "walking",
            target: payload2.walking_weight,
            created_at: created_date,
            expiry: expiry_date,
        },
        {
            type: "cycling",
            target: payload2.bike_weight,
            created_at: created_date,
            expiry: expiry_date,
        },
        {
            type: "public_transport",
            target: payload2.public_transport,
            created_at: created_date,
            expiry: expiry_date,
        },
    ];

    let pay2 = JSON.stringify(pay);
    let token = await readToken();
    return await fetch(endpoint.goals, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(pay2),
            Authorization: `Bearer ${token.accessToken}`,
        },
        body: pay2,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log("Error", err));
};

export const readProfile = async () => {
    let token = await readToken();
    return await fetch(endpoint.profile, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.accessToken}`,
        },
    })
        .then((response) => {
            return response.status === status.ok ? response.json() : false;
        })
        .catch((err) => console.log("Error", err));
};

export const readGoals = async () => {
    let token = await readToken();
    let goal = await readGoalToken();
    let newDate = new Date();
    let date = Math.floor(newDate.getTime() / 1000);
    const endpointGoal = `${endpoint.goals}?start_time=${goal ? goal.goalToken : date
        }`;
    return await fetch(endpointGoal, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.accessToken}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return false;
            }
        })
        .catch((err) => console.log("Error", err));
};

export const getPreference = async () => {
    let token = await readToken();
    return await fetch(endpoint.pref, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.accessToken}`,
        },
    })
        .then((response) => {
            return response.status === status.ok ? response.json() : false;
        })
        .catch((err) => console.log("Error", err));
};

export const fetchWeather = async (payload: any) => {
    let api_key = weather_api_key;
    let payload2 = payload.payload;
    let weather = `${endpoint.weather}lat=${encodeURIComponent(
        payload2.lat
    )}&lon=${encodeURIComponent(payload2.lon)}&appid=${api_key}&units=metric`;
    return await fetch(weather, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log('error', err));
};

export const fetchCurrentIncidents = async (params: any) => {
    console.log(params);
    return fetch(
        `http://prod.ecocompass.live/api/transit/incidents?recommendationId=${params.payload.recommendationId}`,
        {
            method: 'GET',
        }
    )
        .then((response) => {
            // return response.json();
            console.log(response.status);
            if (response.status === status.ok) {
                return response.json();
            } else {
                return false;
            }
        })
        .catch((e) => {
            console.log(e);
            return false;
        });
};

export const reportIncident = async (data: any) => {
    const token = await readToken();
    let body = JSON.stringify(data.payload);
    return fetch('http://prod.ecocompass.live/createIncident', {
        method: 'POST',
        headers: {
            AUTHORIZATION: token,
        },
        body,
    })
        .then((response) => {
            if (response.status === status.ok) {
                return response.json();
            } else {
                return false;
            }
        })
        .catch((e) => {
            console.log(e);
            return false;
        });
};
export const getTripHistory = async function () {
    const token = await readToken();
    console.log('Token', token);
    return await fetch(endpoint.saveTrip, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            return response.status === status.ok ? response.json() : false;
        })
        .catch((err) => {
            return { error: true, message: err };
        });
};
