import axios from "axios";
import { RecommendationParams } from "./recommendationParams";
import { ARTISTS, LONG_TERM, MEDIUM_TERM, SHORT_TERM, TRACKS } from "../utils/constants";
import { getRandomInt } from "../utils/utils";

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

// returns the user's id as a Promise
export async function getUserID(token: string) {
    return await axios.get("https://api.spotify.com/v1/me", {
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

// ABSTRACTION: returns the user's top item in the given term 
export async function getTopItemByTerm(token: string, type: string, term: string, 
    callback: (result: any) => void, limit: number = 20, offset: number = 0) {
    var allowed_terms: string[] = [SHORT_TERM, MEDIUM_TERM, LONG_TERM];
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

// promise that returns the user's top item in the given term 
export async function getTopItemByTermPromise(token: string, type: string, term: string, limit: number = 20, offset: number = 0) {
    var allowed_terms: string[] = [SHORT_TERM, MEDIUM_TERM, LONG_TERM];
    if (!allowed_terms.includes(term)) {
        throw new Error("invalid term for getTopItemByTerm");
    }
    return await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            time_range: term,
            limit: limit, 
            offset: offset, 
        }
    });
}

// return's the user's top artists in the last 4 weeks (short term) 
export async function getTopArtistsShortTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, ARTISTS, "short_term", callback);
}

// return's the user's top artists in the last 6 months (medium term) 
export async function getTopArtistsMediumTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, ARTISTS, "medium_term", callback);
}

// return's the user's top artists in the last few years (long term) 
export async function getTopArtistsLongTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, ARTISTS, "long_term", callback);
}

// return's the user's top tracks in the last 4 weeks (short term) 
export async function getTopTracksShortTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, TRACKS, "short_term", callback);
}

// return's the user's top tracks in the last 6 months (medium term) 
export async function getTopTracksMediumTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, TRACKS, "medium_term", callback);
}

// return's the user's top tracks in the last few years (long term) 
export async function getTopTracksLongTerm(token: string, callback: (result: any) => void = ()=>{}) {
    getTopItemByTerm(token, TRACKS, "long_term", callback);
}

// get a random selection of [amount] top items of the given type (artists, tracks) from the given terms [short_term, medium_term, long_term]
export async function getTopItemsAndSelectRandom(token: string, type: string, terms: string[], amount: number, callback: (result: any) => void = ()=>{}) {
    console.log("Selecting random");
    // item represented as a data object
    let selectedItems: any[] = []; 
    let count = 0;
    while (count < amount) {
        // gets an item from a random term term length and adds to list of items 
        await getTopItemByTermPromise(token, type, terms[getRandomInt(terms.length)]).then((response) => {
            const resultList = response.data.items;
            const randomItem = resultList[getRandomInt(resultList.length)]
            console.log(randomItem);
            const hasDuplicate = selectedItems.some((item) => item.id === randomItem.id);
            if (!hasDuplicate) {
                selectedItems.push(randomItem);
                console.log("current list");
                console.log(selectedItems);
                count = count + 1;
            }
            
            console.log("current count " + count);
        });
        
    }
    callback(selectedItems);
    return selectedItems;
}

// returns recommendations based on a list of artist ids, genre names, and track ids
export async function getRecommendations(token: string, artists: string[], genres: string[], 
    tracks: string[], callback: (result: any) => void) {
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
            limit: 100,
        }
    }).then((response) => {
        console.log(response.data);
        callback(response.data.tracks);
        return response.data;
    });
}

// returns recommendations based on a list of artist ids, genre names, track ids and optional parameters
export async function getRecommendationsWithOptionalParams(token: string, artists: string[], genres: string[], 
    tracks: string[], optional: RecommendationParams, callback: (result: any) => void) {
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
    console.log(optional);

    await axios.get("https://api.spotify.com/v1/recommendations", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            seed_artists: param_seed_formatter(artists), 
            seed_genres: param_seed_formatter(genres),
            seed_tracks: param_seed_formatter(tracks),
            limit: 100,
            ...optional.traits,
        }
    }).then((response) => {
        console.log(response.data);
        callback(response.data.tracks);
        return response.data;
    });
}

// returns data promise recommendations based on a list of artist ids, genre names, and track ids
export async function getRecommendationsByDuration(token: string, artists: string[], genres: string[], 
    tracks: string[], min_duration: number, max_duration: number, 
    callback: (result: any) => void = () => {}) {
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

    const promise = axios.get("https://api.spotify.com/v1/recommendations", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            seed_artists: param_seed_formatter(artists), 
            seed_genres: param_seed_formatter(genres),
            seed_tracks: param_seed_formatter(tracks),
            limit: 100,
            min_duration: min_duration, 
            max_duration: max_duration,
        }
    })
    
    const dataPromise = promise.then((response) => {
        console.log("getting recommendation by duration " + min_duration + " " + max_duration);
        console.log(response.data);
        callback(response.data.tracks);
        return response.data.tracks;
    });

    return dataPromise;
}