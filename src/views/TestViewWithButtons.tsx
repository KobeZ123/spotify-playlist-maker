import { getUser, searchArtists } from "../api/loadData";
import useStore from "../stores/useStore";

export default function TestViewWithButtons() {

    const token = useStore((state) => state.token);

    const getMyUserData = async () => {
        // searchArtists(token, "izzy");
        if (token != null) {   
            getUser(token);
            
        }
    }

    const getArtistSearch = async (name: string) => {
        if (token != null) {   
            searchArtists(token, name);
        }
    }



    return (
        <div>
            <button onClick={getMyUserData}>GET MY USER DATA</button>
            <button onClick={() => getArtistSearch("drake")}>SEARCH ARTIST</button>
        </div>
    );
}
