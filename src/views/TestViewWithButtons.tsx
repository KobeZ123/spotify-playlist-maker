import { getUserInformation, searchArtists } from "../api/loadData";
import useStore from "../stores/useStore";

export default function TestViewWithButtons() {

    const token = useStore((state) => state.token);

    const getUserData = async () => {
        // searchArtists(token, "izzy");
        if (token != null) {   
            getUserInformation(token);
        }
    }

    const getArtistSearch = async (name: string) => {
        if (token != null) {   
            searchArtists(token, name);
        }
    }

    return (
        <div>
            <button onClick={getUserData}>GET MY USER DATA</button>
            <button onClick={() => getArtistSearch("drake")}>SEARCH ARTIST</button>
        </div>
    );
}
