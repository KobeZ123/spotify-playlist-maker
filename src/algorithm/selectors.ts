import { getRecommendationsByDuration } from "../api/loadData";
import { ARTISTS, GENRES, TRACKS } from "../utils/constants";
import { getRandomInt } from "../utils/utils";

// given a list of artists, genres, and tracks, use five seeds to select a track of the range duration
export async function trackSelector(
  token: string,
  artists: string[],
  genres: string[],
  tracks: string[],
  min_duration: number,
  max_duration: number,
  callback: (result: any) => void = () => {}
) {
  // arrays of selected seeds
  const selectedArtists = [];
  const selectedGenres = [];
  const selectedTracks = [];

  // adds the argument arrays that are not empty
  const selectableArrays = [];
  const selectableProperties = [];
  if (artists.length > 0) {
    selectableArrays.push(artists);
    selectableProperties.push(ARTISTS);
  }
  if (genres.length > 0) {
    selectableArrays.push(genres);
    selectableProperties.push(GENRES);
  }
  if (tracks.length > 0) {
    selectableArrays.push(tracks);
    selectableProperties.push(TRACKS);
  }

  // if there are 5 or less seeds total, add all seeds
  if (artists.length + genres.length + tracks.length <= 5) {
    selectedArtists.push(...artists);
    selectedGenres.push(...genres);
    selectedTracks.push(...tracks);
  } else {
    // keeps adding seeds until 5 seeds have been added
    let num_seeds = 0;
    while (num_seeds < 5) {
      let randomIndex = getRandomInt(selectableArrays.length);
      // gets a random item from a random seed array and adds it to list of selected seeds
      let selectedArray = selectableArrays[randomIndex];
      let selectedSeedType = selectableProperties[randomIndex];
      let selectedSeedItem = selectedArray[getRandomInt(selectedArray.length)];

      if (selectedSeedType === ARTISTS) {
        selectedArtists.push(selectedSeedItem);
      } else if (selectedSeedType === GENRES) {
        selectedGenres.push(selectedSeedItem);
      } else if (selectedSeedType === TRACKS) {
        selectedTracks.push(selectedSeedItem);
      }
      num_seeds = num_seeds + 1;
    }
  }
  return getRecommendationsByDuration(
    token,
    selectedArtists,
    selectedGenres,
    selectedTracks,
    min_duration,
    max_duration
  );
}
