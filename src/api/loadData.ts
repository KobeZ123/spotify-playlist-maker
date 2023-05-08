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

// ABSTRACTION: search for an item by the queried string 
export async function searchBy(token: string, query: string, type: string) {
    await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: query,
            type: type,
        }
    }).then((response) => {
        console.log(response.data);
        return response.data;
    });
}

// search artists by the queried string 
export async function searchArtists(token: string, query: string) {
    searchBy(token, query, "artist");
}

// search tracks by the queried string 
export async function searchTrack(token: string, query: string) {
    searchBy(token, query,  "track");
}

// ABSTRACTION: return's the user's top item in the given term 
export async function getTopItemByTerm(token: string, type: string, term: string, limit: number = 20, offset: number = 0) {
    var allowed_terms: string[] = ["short_term", "medium_term", "long_term"];
    if (!allowed_terms.includes(term)) {
        throw new Error("invalid term for getTopItemByTerm");
    }
    await axios.get("https://api.spotify.com/v1/me/top", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            type: type,
            time_range: term,
            limit: limit, 
            offset: offset, 
        }
    }).then((response) => {
        console.log(response.data);
        return response.data;
    });
}

// return's the user's top artists in the last 4 weeks (short term) 
export async function getTopArtistsShortTerm(token: string) {
    getTopItemByTerm(token, "artists", "short_term");
}

// return's the user's top artists in the last 6 months (medium term) 
export async function getTopArtistsMediumTerm(token: string) {
    getTopItemByTerm(token, "artists", "medium_term");
}

// return's the user's top artists in the last few years (long term) 
export async function getTopArtistsLongTerm(token: string) {
    getTopItemByTerm(token, "artists", "long_term");
}