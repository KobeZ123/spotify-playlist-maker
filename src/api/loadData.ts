import axios from "axios";

export async function getUser(token: string) {
    await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response.data);
        return response.data;
    });
}

export async function searchArtists(token: string, name: string) {
    // let token = useStore((state) => state.getToken());
    await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: name,
            type: "artist"
        }
    }).then((data) => {
        console.log(data);
    });
}