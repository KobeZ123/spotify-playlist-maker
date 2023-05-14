
// given a list of artists, genres, and tracks, use five seeds to select a track of the range duration
export async function trackSelector(token: string, artists: string[], genres: string[], 
    tracks: string[], callback: (result: any) => void, 
    min_duration: number, max_duration: number) {
    const selectedArtists = [];
    const selectedGenres = []; 
    const selectedTracks = [];

    // adds the argument arrays that are not empty 
    const selectableArrays = [];
    if (artists.length > 0) {
        selectableArrays.push(artists);
    }
    if (genres.length > 0) {
        selectableArrays.push(genres);
    }
    if (tracks.length > 0) {
        selectableArrays.push(tracks);
    }

    // if there are 5 or less seeds total, add all seeds 
    if (artists.length + genres.length + tracks.length <= 5) {
        selectedArtists.push(...artists);
        selectedGenres.push(...genres);
        selectedTracks.push(...tracks);
    }

    // keeps adding seeds until 5 seeds have been added 
    let num_seeds = 0;
}