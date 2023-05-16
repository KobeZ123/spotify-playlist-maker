import axios from "axios";
import { getUserID } from "./loadData";

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
        return tracks.reduce((accumulator, track) => {
            if (accumulator === "") {
                return track.uri;
            } else {
                return accumulator + "," + track.uri;
            }
        }, "");
        
    }

    console.log(createURIString());

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
            console.error('Error adding tracks:', error.response.data.error);
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