// let accessToken = '';
// let refreshToken = '';
let userID = '';

let accessToken = ''
let refreshToken = '';

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
