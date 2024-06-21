export const playlistName = "Democratic Spotify"
export const playlistDescription = "A playlist created by the Democratic Spotify app"
export const playlistPublic = false
export const playlistCollaborative = false

let playlistID = '';

export function setPlaylistID(id) {
    playlistID = id;
}

export function getPlaylistID() {
    return playlistID;
}