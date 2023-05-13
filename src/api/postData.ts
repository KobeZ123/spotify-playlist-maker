import axios from "axios";
import { getUserID } from "./loadData";

// creates a playlist with the given name and returns the playlist id
export async function createPlaylist(token: string, name: string) {
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
                    'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log(response.data);
            return response.data.id;
        });
    });
    
    

    
}