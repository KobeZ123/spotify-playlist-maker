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

// removes the "-" from the genre name
export function simplifyGenreName(name: string) {
  let genreNameArray = name.split("-");
  return genreNameArray.reduce((acc, word) => {
    return acc + word;
  });
}

// converts one of the genre strings from the API to a user-friendly string
export function polishGenreName(name: string) {
  // r-n-b is an exception
  if (name === "r-n-b") {
    return "RNB";
  }
  // each multi-word genre name is split by dashes
  let genreNameArray = name.split("-");
  genreNameArray = genreNameArray.map((word) => {
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

function minimum(a: number, b: number, c: number): number {
  return Math.min(a, Math.min(b, c));
}

function levenshteinDistance(word1: string, word2: string): number {
  const len1 = word1.length;
  const len2 = word2.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [];
    matrix[i][0] = i;
  }
  for (let j = 1; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;

      matrix[i][j] = minimum(
        matrix[i - 1][j] + 1, // Deletion
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return matrix[len1][len2];
}

export function searchWords(searchQuery: string, wordList: string[]): string[] {
  // const distances: [string, number][] = [];
  // for (const word of wordList) {
  //   const distance = levenshteinDistance(searchQuery, word);
  //   distances.push([word, distance]);
  // }

  // const sortedWords = distances.sort((a, b) => a[1] - b[1]);
  const distances: [string, number, number][] = [];
  for (const word of wordList) {
    const distance = levenshteinDistance(searchQuery, simplifyGenreName(word));
    const position = word.indexOf(searchQuery);

    distances.push([word, distance, position]);
  }

  const sortedWords = distances.sort((a, b) => {
    if (a[2] !== -1 && b[2] !== -1) {
      // Both words have a match at the beginning
      if (a[2] === b[2]) {
        // Same position, sort by distance
        return a[1] - b[1];
      } else {
        // Different position, sort by position
        return a[2] - b[2];
      }
    } else if (a[2] !== -1) {
      // Only word 'a' has a match at the beginning
      return -1;
    } else if (b[2] !== -1) {
      // Only word 'b' has a match at the beginning
      return 1;
    } else {
      // No match at the beginning for both words, sort by distance
      return a[1] - b[1];
    }
  });

  return sortedWords.map((sortedWords) => {
    return sortedWords[0];
  });
}
