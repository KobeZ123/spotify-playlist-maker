// gets a random integer between zero and max (exclusive)
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// converts a duration (minutes and seconds) to milliseconds
export function durationToMilliseconds(minutes: number, seconds: number) {
  return seconds * 1000 + minutes * 60000;
}

// given the milliseconds, return the lowest ms that rounds to the same second
export function millisecondsLowerBound(milliseconds: number) {
  return milliseconds - 499;
}

// given the milliseconds, return the highest ms that rounds to the same second
export function millisecondsUpperBound(milliseconds: number) {
  return milliseconds + 499;
}

// given the milliseconds, rounds to the nearest convertable seconds
export function millisecondsRounded(milliseconds: number) {
  if (milliseconds % 1000 < 500) {
    return milliseconds - (milliseconds % 1000);
  } else {
    return milliseconds + (milliseconds - (milliseconds % 1000));
  }
}

// reduces an array of strings to a comma-separated string
export function reduceStringArray(array: string[]): string {
  return array.reduce((accumulator, item) => {
    if (accumulator === "") {
      return item;
    } else {
      return accumulator + "," + item;
    }
  }, "");
}

// given an array of artist data objects, return the list of artists formatted
export function reduceArtistNamesToString(array: any[]): string {
  return array.reduce((str: string, artist_data: any, index: number) => {
    if (index === 0) {
      console.log("finding artist data");
      console.log(artist_data);
      console.log("getting string data");
      console.log(str);
      return artist_data.name;
    } else {
      console.log("more artist data");
      console.log(str);
      return str + ", " + artist_data.name;
    }
  }, "");
}

// capitalizes the first letter of the given word and returns it
export function capitalizeWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// converts one of the genre strings from the API to a user-friendly string
export function polishGenreName(name: string) {
  // r-n-b is an exception
  if (name === "r-n-b") {
    return "RNB";
  }
  // each multi-word genre name is split by dashes
  const genreNameArray = name.split("-");
  genreNameArray.forEach((word) => {
    return capitalizeWord(word);
  });
  // if genre is one word, capitalize it and return it
  // ex: "pop" => "Pop"
  if (genreNameArray.length == 1) {
    return genreNameArray[0];
  } else {
    // if any word in the genre is one letter, the "-" belongs in the genre
    // ex: "k-pop" => "K-Pop"
    if (genreNameArray[0].length == 1) {
      return genreNameArray[0] + "-" + genreNameArray[1];
    } else {
      // reduce the word to a singular string and return it
      return genreNameArray.reduce((acc, word, index) => {
        if (index == 0) {
          return word;
        } else {
          return acc + " " + word;
        }
      });
    }
  }
}