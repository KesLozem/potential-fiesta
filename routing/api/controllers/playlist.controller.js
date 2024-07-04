import { getPlaylist } from "../services/playlist/get-playlist.service";
import { postPlaylist } from "../services/playlist/post-newPlaylist.service";
import { getSnapshotID } from "../services/playlist/playlist-utls";
import { insertTrack } from "../services/playlist/insert-track.service";
import { getTracks } from "../services/playlist/get-tracks.service";
import { searchDedicatedPlaylist } from "../services/playlist/search-dedicated.service";
import { reorderItems } from "../services/playlist/reorder-items.service";

export async function get_playlist(req, res) {
    try {
        const playlist = await getPlaylist(req, res);
        return res.status(200).send({ 
            playlist: {
                limit: playlist.limit,
                offset: playlist.offset,
                total: playlist.total,
                snapshot_id: playlist.snapshot_id,
                items: playlist.items.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        owner: item.owner.display_name,
                    }
                })
            } 
        });
    } catch (error) {
        return res.status(500).send(
            {
                error: {
                    status: error.status,
                    code: error.code,
                    message: error.message,
                    request: error.config
                }
            }
        );
    }
}

export async function create_playlist(req, res) {
    try {
        const playlist = await postPlaylist(req, res);
        return res.status(201).send({ playlist: playlist });
    } catch (error) {
        return res.status(500).send(
            {
                error: {
                    status: error.status,
                    code: error.code,
                    message: error.message,
                    request: error.config
                }
            }
        );
    }
}

export async function add_track(req, res) {
    try {
        const track = await insertTrack(req, res);
        return res.status(201).send({ track: track });
    } catch (error) {
        return res.status(500).send(
            {
                error: {
                    status: error.status,
                    code: error.code,
                    message: error.message,
                    request: error.config
                }
            }
        );
    }
}

export async function get_tracks(req, res){
    try {
        const tracks = await getTracks(req, res);
        return res.status(200).send({ 
            tracks: {
                limit: tracks.limit,
                offset: tracks.offset,
                total: tracks.total,
                items: tracks.items.map((item) => {
                    return {
                        id: item.track.id,
                        name: item.track.name,
                        artist: item.track.artists[0].name,
                        album: item.track.album.name,
                        image: item.track.album.images[0].url,
                        duration: item.track.duration_ms,
                        popularity: item.track.popularity
                    }
                })
            }  
        });
    } catch (error) {
        return res.status(500).send(
            {
                error: {
                    status: error.status,
                    code: error.code,
                    message: error.message,
                    request: error.config
                }
            }
        );
    }
}

export async function search_dedicated_playlist(req, res){
    try {
        const id = await searchDedicatedPlaylist(req, res);
        console.log(`Snapshot ID: ${getSnapshotID()}`)
        return res.status(200).send({
            playlist_id: id,
            snapshot_id: getSnapshotID()
        });
    } catch (error) {
        return res.status(500).send(
            {
                error: {
                    status: error.status,
                    code: error.code,
                    message: error.message,
                    request: error.config
                }
            }
        );
    }
}

export async function reorder_items(req, res){
    try {
        const snapshot_id = await reorderItems(req, res);
        return res.status(204).send({ snapshot_id: snapshot_id });
    } catch (error) {
        return res.status(500).send(
            {
                error: {
                    status: error.status,
                    code: error.code,
                    message: error.message,
                    request: error.config
                }
            }
        );
    }
}