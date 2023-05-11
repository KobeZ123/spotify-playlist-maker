import axios from "axios";

// returns the user's information
export async function getUserInformation(token: string) {
    await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response.data);
        return response.data;
    });
}

// returns the current user's playlists
export async function getCurrentUserPlaylists(token: string) {
    await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response.data);
        return response.data;
    });
}

// ABSTRACTION: search for an item by the queried string 
export async function searchBy(token: string, query: string, type: string, callback: (result: any) => void) {
    await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: query,
            type: type,
        }
    }).then((response) => {
        if (type === "artist") {
            console.log(response.data.artists.items);
            callback(response.data.artists.items);
        }
        else if (type === "track") {
            console.log(response.data.tracks.items);
            callback(response.data.tracks.items);
        }
    });
}

// search artists by the queried string 
export async function searchArtists(token: string, query: string, callback: (result: any) => void = ()=>{}) {
    searchBy(token, query, "artist", callback);
}

// search tracks by the queried string 
export async function searchTracks(token: string, query: string, callback: (result: any) => void = ()=>{}) {
    searchBy(token, query,  "track", callback);
}

// ABSTRACTION: return's the user's top item in the given term 
export async function getTopItemByTerm(token: string, type: string, term: string, 
    callback: (result: any) => void, limit: number = 20, offset: number = 0) {
    var allowed_terms: string[] = ["short_term", "medium_term", "long_term"];
    if (!allowed_terms.includes(term)) {
        throw new Error("invalid term for getTopItemByTerm");
    }
    await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            time_range: term,
            limit: limit, 
            offset: offset, 
        }
    }).then((response) => {
        console.log(response.data.items);
        callback(response.data.items);
        return response.data.items;
    });
}

// return's the user's top artists in the last 4 weeks (short term) 
export async function getTopArtistsShortTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, "artists", "short_term", callback);
}

// return's the user's top artists in the last 6 months (medium term) 
export async function getTopArtistsMediumTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, "artists", "medium_term", callback);
}

// return's the user's top artists in the last few years (long term) 
export async function getTopArtistsLongTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, "artists", "long_term", callback);
}

// return's the user's top tracks in the last 4 weeks (short term) 
export async function getTopTracksShortTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, "tracks", "short_term", callback);
}

// return's the user's top tracks in the last 6 months (medium term) 
export async function getTopTracksMediumTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, "tracks", "medium_term", callback);
}

// return's the user's top tracks in the last few years (long term) 
export async function getTopTracksLongTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, "tracks", "long_term", callback);
}

// returns recommendations based on a list of artist ids, genre names, and track ids
export async function getRecommendations(token: string, artists: string[] = [], genres: string[] = [], 
    tracks: string[] = [], callback: (result: any) => void) {
    let num_seeds = 0
    const param_seed_formatter = (list: string[]) => {
        return list.reduce((accumulator, item) => {
            if (num_seeds < 5) {
                if (accumulator === "") {
                    accumulator = item;
                } else {
                    accumulator = accumulator + "," + item;
                }
                num_seeds = num_seeds + 1;
            }
            return accumulator;
        }, "");
    }

    await axios.get("https://api.spotify.com/v1/recommendations", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            seed_artists: param_seed_formatter(artists), 
            seed_genres: param_seed_formatter(genres),
            seed_tracks: param_seed_formatter(tracks),
        }
    }).then((response) => {
        console.log(response.data);
        callback(response.data.tracks);
        return response.data;
    });
}