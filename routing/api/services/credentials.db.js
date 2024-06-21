// let accessToken = '';
// let refreshToken = '';
let userID = '';

let accessToken = 'BQDIEicdeDv-AGVevqcIKIxNB1eKaS0u1Ev98moUOgWs1mOVh8qkMg-c0hoyYGG9HFYDVz1knHEUZKvdBB-JSk5L2ULHB-iPpeUqTts3WXP6cWmoCLUaD6TToAwGKgxRq2QDRkmBWxq9NoTidjbZJ37q8tnYfL4xMwIs1iSy_L8YS6G67bxpGvzcpkt27449sG4Od8E';
let refreshToken = '2222';

export function getAccessToken() {
    return accessToken;
}

export function setAccessToken(token) {
    accessToken = token;
}

export function clearAccessToken() {
    accessToken = '';
}

export function getRefreshToken() {
    return refreshToken;
}

export function setRefreshToken(token) {
    refreshToken = token;
}

export function setUserID(id) {
    userID = id;
}

export function getUserID() {
    return userID;
}