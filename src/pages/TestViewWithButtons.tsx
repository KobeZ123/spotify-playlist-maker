import { getCurrentUserPlaylists, getTopArtistsLongTerm, getTopArtistsMediumTerm, getTopArtistsShortTerm, getTopTracksLongTerm, getTopTracksMediumTerm, getTopTracksShortTerm, getUserInformation, searchArtists } from "../api/loadData";
import TestIntervalSelector from "../components/TestIntervalSelector";
import useStore from "../stores/useStore";

export default function TestViewWithButtons() {

    const token = useStore((state) => state.token);

    const getUserData = async () => {
        // searchArtists(token, "izzy");
        if (token != null) {   
            getUserInformation(token);
        }
    }

    const getUserPlaylists = async () => {
        // searchArtists(token, "izzy");
        if (token != null) {   
            getCurrentUserPlaylists(token);
        }
    }

    const getArtistSearch = async (name: string) => {
        if (token != null) {   
            searchArtists(token, name);
        }
    }

    const getTopArtists = async () => {
        if (token != null) {   
            getTopArtistsShortTerm(token);
            getTopArtistsMediumTerm(token);
            getTopArtistsLongTerm(token);
        }
    }

    const getTopTracks = async () => {
        if (token != null) {   
            getTopTracksShortTerm(token);
            getTopTracksMediumTerm(token);
            getTopTracksLongTerm(token);
        }
    }

    return (
        <div>
            <button onClick={getUserData}>GET MY USER DATA</button>
            <button onClick={() => getArtistSearch("drake")}>SEARCH ARTIST</button>
            <button onClick={() => getUserPlaylists()}>GET ALL PLAYLISTS</button>
            <button onClick={() => getTopArtists()}>GET TOP ARTISTS</button>
            <button onClick={() => getTopTracks()}>GET TOP TRACKS</button>
            <TestIntervalSelector />
        </div>
    );
}
