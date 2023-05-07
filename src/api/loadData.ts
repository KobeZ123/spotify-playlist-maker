import axios from "axios";
import useStore from "../stores/useStore";

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