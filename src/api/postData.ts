import axios from "axios";
import { getRecommendationsByDuration, getUserID } from "./loadData";
import { getRandomInt, millisecondsLowerBound, millisecondsRounded, millisecondsUpperBound, reduceStringArray } from "../utils/utils";

// creates a playlist with the given name and returns the playlist id
export async function createEmptyPlaylist(token: string, name: string, callback: (result: string) => void = () => {}) {
    await getUserID(token).then(async (data) => {
        await axios.post(`https://api.spotify.com/v1/users/${data.id}/playlists`,
            {
                name: name,
                // public: false, 
                // description: "This playlist was generated by Spotify Interval Playlist", 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response.data);
            callback(response.data.id);
            return response.data.id;
        });
    });
}

// populates the given playlist with the given list of tracks 
export async function populatePlaylist(token: string, playlist_id: string, tracks: any[]) {
    const createURIString = () => {
        let trackURIs = tracks.map((track) => { 
            return track.uri;
        });
        return reduceStringArray(trackURIs);   
    }

    await axios.put(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${createURIString()}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((response) => {
        console.log(response.data);
        return response.data;
    }).catch(error => {
            console.error('Error creating playlist: ', error.response.data.error);
    });

    // axios({
    //     method: 'put',
    //     url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${createURIString()}`,
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     },
    //   })
    //     .then(response => {
    //       console.log('Tracks added successfully:', response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error adding tracks:', error.response.data.error);
    //     });

}

// populates the given playlist with tracks that sum to the given duration in milliseconds
export async function selectTracksForPlaylistAlgorithm(token: string, artists: string[], genres: string[], 
    tracks: string[], playlist_id: string, duration: number) {
    let done = false;
    // keep selecting a singular recommendation 
    let selectedTracks: any[] = []; // tracks selected  
    while (duration > 499 && !done) {
        await getRecommendationsByDuration(token, artists, genres, tracks, 0, duration).then((tracks: any[]) => {
            console.log("tracks");
            console.log(tracks);
            if (tracks.length == 0) {
                done = true;
            } else {
                let selected = tracks[getRandomInt(tracks.length)];
                console.log("selected");
                console.log(selected);
                if (!selectedTracks.includes(selected)) {
                    console.log("adding track");
                    selectedTracks.push(selected);
                    duration = duration - selected["duration_ms"]
                }
            }
        });
    }
    
    // attempts to find better fitting track 
    let swapped = false;
    if (duration > 499 && done) {
        let counter = 0
        while (counter < selectedTracks.length && !swapped) {
            let added_song = selectedTracks[counter];
            let song_duration_rounded = millisecondsRounded(added_song["duration_ms"]) + duration;
            console.log("milliseconds rounded " + millisecondsRounded(added_song["duration_ms"]));
            await getRecommendationsByDuration(token, artists, genres, tracks,
                millisecondsLowerBound(song_duration_rounded), millisecondsUpperBound(song_duration_rounded)).then((tracks: any[]) => {
                if (tracks.length != 0) {
                    let selected = tracks[getRandomInt(tracks.length)];
                    console.log("selected for filling");
                    console.log(selected);
                    if (!selectedTracks.includes(selected)) {
                        console.log("adding track");
                        selectedTracks.splice(counter, 1);
                        selectedTracks.push(selected);
                        swapped = true
                    }
                } 
                counter = counter + 1;
            })
        }
    }
    await populatePlaylist(token, playlist_id, selectedTracks);
}