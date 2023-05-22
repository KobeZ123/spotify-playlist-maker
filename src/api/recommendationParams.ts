export class TrackAttribute {
    min: number;
    max: number;
    target: boolean;

    constructor(value: number);
    constructor(min: number, max: number);
    constructor(valueOrMin: number, max?: number) {
        if (max === undefined) {
            this.min = valueOrMin;
            this.max = valueOrMin;
            this.target = true;
        } else {
            this.min = valueOrMin;
            this.max = max;
            this.target = false;
        }
    }

    isTarget(): boolean {
        return this.target;
    }
}

export interface SpotifyRecommendationParams {
    // Required parameters
    seed_artists?: string[];       // Array of Spotify artist IDs
    seed_genres?: string[];        // Array of genre names
    seed_tracks?: string[];        // Array of Spotify track IDs
  
    // Optional parameters
    limit?: number;                // The maximum number of recommendations to return (1-100)
    market?: string;               // An ISO 3166-1 alpha-2 country code to limit the results
    target_acousticness?: number;  // A value from 0 to 1 representing the target acousticness of the tracks
    target_danceability?: number;  // A value from 0 to 1 representing the target danceability of the tracks
    target_energy?: number;        // A value from 0 to 1 representing the target energy of the tracks
    target_instrumentalness?: number;  // A value from 0 to 1 representing the target instrumentalness of the tracks
    target_key?: number;           // An integer representing the target key of the tracks (0-11, where 0 = C, 1 = C#, etc.)
    target_liveness?: number;      // A value from 0 to 1 representing the target liveness of the tracks
    target_loudness?: number;      // A value from -60 to 0 representing the target loudness of the tracks (in decibels)
    target_mode?: number;          // 0 for minor, 1 for major (default: no preference)
    target_popularity?: number;    // A value from 0 to 100 representing the target popularity of the tracks
    target_speechiness?: number;   // A value from 0 to 1 representing the target speechiness of the tracks
    target_tempo?: number;         // A value representing the target tempo of the tracks (in beats per minute)
    target_time_signature?: number;  // An integer representing the target time signature of the tracks
    target_valence?: number;       // A value from 0 to 1 representing the target valence of the tracks
  
    // Additional min/max parameters
    min_acousticness?: number;     // A value from 0 to 1 representing the minimum acousticness of the tracks
    max_acousticness?: number;     // A value from 0 to 1 representing the maximum acousticness of the tracks
    min_danceability?: number;     // A value from 0 to 1 representing the minimum danceability of the tracks
    max_danceability?: number;     // A value from 0 to 1 representing the maximum danceability of the tracks
    min_energy?: number;           // A value from 0 to 1 representing the minimum energy of the tracks
    max_energy?: number;           // A value from 0 to 1 representing the maximum energy of the tracks
    min_instrumentalness?: number;  // A value from 0 to 1 representing the minimum instrumentalness of the tracks
    max_instrumentalness?: number;  // A value from 0 to 1 representing the maximum instrumentalness of the tracks
    min_key?: number;               // A value from 0 to 11 representing the minimum key of the track
    max_key?: number;               // A value from 0 to 11 representing the maximum key of the track
    min_liveness?: number;         // A value from 0 to 1 representing the minimum liveness of the tracks
    max_liveness?: number;         // A value from 0 to 1 representing the maximum liveness of the tracks
    min_loudness?: number;         // A value from -60 to 0 representing the minimum loudness of the tracks (in decibels)
    max_loudness?: number;         // A value from -60 to 0 representing the maximum loudness of the tracks (in decibels)
    min_mode?: number;             // A value from 0 to 1 representing the minimum mode of the track 
    max_mode?: number;             // A value from 0 to 1 representing the maximum mode of the track 
    min_popularity?: number;       // A value from 0 to 100 representing the minimum popularity of the tracks (default: 0)
    max_popularity?: number;       // A value from 0 to 100 representing the maximum popularity of the tracks (default: 100)
    min_speechiness?: number;      // A value from 0 to 1 representing the minimum speechiness of the tracks
    max_speechiness?: number;      // A value from 0 to 1 representing the maximum speechiness of the tracks
    min_tempo?: number;            // A value representing the minimum tempo of the tracks (in beats per minute)
    max_tempo?: number;            // A value representing the maximum tempo of the tracks (in beats per minute)
    min_time_signature?: number;   // An integer representing the minimum time signature of the tracks
    max_time_signature?: number;   // An integer representing the maximum time signature of the tracks
    min_valence?: number;          // A value from 0 to 1 representing the minimum valence of the tracks
    max_valence?: number;          // A value from 0 to 1 representing the maximum valence of the tracks
}

export class RecommendationParams {
    traits: SpotifyRecommendationParams;

    constructor() {
        this.traits = {}
    }

    addAcousticness(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_acousticness = attribute.min;
        } else {
            this.traits.max_acousticness = attribute.max;
            this.traits.min_acousticness = attribute.min;
        }
        return this;
    }

    addDancability(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_danceability = attribute.min;
        } else {
            this.traits.max_danceability = attribute.max;
            this.traits.min_danceability = attribute.min;
        }
        return this;
    }

    addEnergy(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_energy = attribute.min;
        } else {
            this.traits.max_energy = attribute.max;
            this.traits.min_energy = attribute.min;
        }
        return this;
    }

    addInstrumentalness(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_instrumentalness = attribute.min;
        } else {
            this.traits.max_instrumentalness = attribute.max;
            this.traits.min_instrumentalness = attribute.min;
        }
        return this;
    }

    addKey(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_key = attribute.min;
        } else {
            this.traits.max_key = attribute.max;
            this.traits.min_key = attribute.min;
        }
        return this;
    }

    addLiveness(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_liveness = attribute.min;
        } else {
            this.traits.max_liveness = attribute.max;
            this.traits.min_liveness = attribute.min;
        }
        return this;
    }

    addLoudness(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_loudness = attribute.min;
        } else {
            this.traits.max_loudness = attribute.max;
            this.traits.min_loudness = attribute.min;
        }
        return this;
    }

    addMode(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_mode = attribute.min;
        } else {
            this.traits.max_mode = attribute.max;
            this.traits.min_mode = attribute.min;
        }
        return this;
    }

    addPopularity(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_popularity = attribute.min;
        } else {
            this.traits.max_popularity = attribute.max;
            this.traits.min_popularity = attribute.min;
        }
        return this;
    }

    addSpeechiness(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_speechiness = attribute.min;
        } else {
            this.traits.max_speechiness = attribute.max;
            this.traits.min_speechiness = attribute.min;
        }
        return this;
    }

    addTempo(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_tempo = attribute.min;
        } else {
            this.traits.max_tempo = attribute.max;
            this.traits.min_tempo = attribute.min;
        }
        return this;
    }

    addTimeSignature(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_time_signature = attribute.min;
        } else {
            this.traits.max_time_signature = attribute.max;
            this.traits.min_time_signature = attribute.min;
        }
        return this;
    }

    addValence(attribute: TrackAttribute) {
        if (attribute.isTarget()) {
            this.traits.target_valence = attribute.min;
        } else {
            this.traits.max_valence = attribute.max;
            this.traits.min_valence = attribute.min;
        }
        return this;
    }
}