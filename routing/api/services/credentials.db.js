// let accessToken = '';
// let refreshToken = '';

let accessToken = 'BQC6us6dRaXhJ6xzzzGRllHMRdHawpxhNyrVMbPvyxOs7S9EhgGiOVyEWhX8RaKRr0Xvo8JK0b0Ji48HdT8dxOYGBhXYK7qUqc3mcN8lnT1CUhU7JcTY4Yj5cKscKhOt5zjwLzsTlG-bHdkvmjddMdJwKHv4YsKP_aRFIHcDaZtPldml4D3XpPlf7MrbXPPpVYaTZ77LiSgrRvtuT6s04CkNkArcOTuXrKZ4q7nN2A-RAlzZtL1z4kOlPjhIhgmwimq1tgnULPRfZOc';
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
