let items = [];
let syncQueue = [];

// enrich payload with likes and dislikes attributes
function enrichItems() {
    return items.forEach((item) => {
        item.likes = 0;
        item.dislikes = 0;
    });
}

// ensure no duplicate songs
export function checkDuplicate(id) {
    return items.some((item) => item.id === id);
}

// deep clone object
export function setItems(data) {
    items = structuredClone(data);
    enrichItems();
}

export function getItems() {
    return items;
}

export function addLike(id) {
    const item = items.find((item) => item.id === id);
    item.likes++;
}

export function addDislike(id) {
    const item = items.find((item) => item.id === id);
    item.dislikes++;
}

export function insertTrack(track) {
    // TODO: Track validation
    // id, name, artist, image, duration, popularity
    // enrich track with likes and dislikes
    if (checkDuplicate(track.id)) {
        return;
    }
    track.likes = 0;
    track.dislikes = 0;
    items.push(track);
}

// Get next track and delete first track
export function nextTrack(){
    let next = items[0];
    deleteFirstTrack();
    return next;
}

// delete track by id
export function deleteTrack(id) {
    items = items.filter((item) => item.id !== id);
}

export function deleteFirstTrack() {
    items.shift();
}

// delete tracks with dislikes greater than threshold
export function deleteDislikedTracks(threshold) {
    items = items.filter((item) => item.dislikes < threshold);
}

// reorder items by overall score (likes - dislikes)
// otherwise sort by song popularity
export function reorder() {
    // overall = likes minus dislikes
    // if same overall sort by popularity
    items.sort((a, b) => {
        const aScore = a.likes - a.dislikes;
        const bScore = b.likes - b.dislikes;
        if (aScore === bScore) {
            return b.popularity - a.popularity;
        }
        return bScore - aScore;
    });
}

// Reset items playlist
export function purgeItems() {
    items = [];
}

export function incrementLike(id) {
    const item = items.find((item) => item.id === id);
    item.likes++;
}

export function incrementDislike(id) {
    const item = items.find((item) => item.id === id);
    item.dislikes++;
}

export function decrementLike(id) {
    const item = items.find((item) => item.id === id);
    item.likes--;
}

export function decrementDislike(id) {
    const item = items.find((item) => item.id === id);
    item.dislikes--;
}

// returns array of objects with range_start and insert_before
// allowing for bulk updating playlist items to sync the spotify playlist on spotify.
export function syncTracks(original, updated) {
    // Record current position of original tracklist
    // Find position in updated tracklist
    let range_start;
    let insert_before;

    original.forEach((track, index) => {
        const updatedTrack = updated.find((item) => item.id === track.id);
        if (updatedTrack) {
            if (index !== updated.indexOf(updatedTrack)) {
                range_start = index;
                // +1 because spotify demands 1-indexed positions for insertion
                insert_before = updated.indexOf(updatedTrack) + 1;
                syncQueue.push({ range_start, insert_before });
                return;
            }
        }
    });
}
