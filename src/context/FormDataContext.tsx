import { createContext, useReducer } from "react";

type FormData = {
  playlistName: string;
  playlistDuration: number;
  selectedArtists: any[];
  selectedTracks: any[];   
  selectedGenres: any[];  
  playlistID: string;
};

const initialState = {
  playlistName: "",
  playlistDuration: 0,
  selectedArtists: [],
  selectedTracks: [],
  selectedGenres: [],
  playlistID: "",
}

export const FormDataContext = 
  createContext<{
    formData: FormData, 
    dispatch: (value: any) => void}>(
    { 
      formData: initialState, 
      dispatch: (value: any) => {} 
    }
  );

// reducer actions 
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_PLAYLIST_NAME':
      return { ...state, playlistName: action.payload };
    case 'SET_PLAYLIST_DURATION':
      return { ...state, playlistDuration: action.payload };
    case 'SET_PLAYLIST_ID':
      return { ...state, playlistID: action.payload };
    case 'ADD_ARTIST': {
      // payload is artist data object 
      // add artist to selectedArtists if it is not already there
      console.log(action.payload);
      if (!state.selectedArtists.some((item: any) => item.id === action.payload.id)) {
        return { ...state, selectedArtists: [...state.selectedArtists, action.payload] };
      }
      else { return state }
    }
    case 'ADD_TRACK': {
      // payload is track data object 
      // add track to selectedTracks if it is not already there
      if (!state.selectedTracks.some((item: any) => item.id === action.payload.id)) {
        return { ...state, selectedTracks: [...state.selectedTracks, action.payload] };
      }
      else { return state }
    }
    case 'ADD_GENRE': {
      // payload is genre string name 
      // add genre to selectedGenres if it is not already there
      if (!state.selectedGenres.some((item: any) => item === action.payload)) {
        return { ...state, selectedGenres: [...state.selectedGenres, action.payload] };
      }
      else { return state }
    }
    case 'REMOVE_ARTIST': {
      // payload is artist data object 
      // remove given artist from selectedArtists
      return { ...state, selectedArtists: state.selectedArtists.filter((element: any) => element.id != action.payload.id) };
    }
    case 'REMOVE_TRACK': {
      // payload is track data object 
      // remove given track from selectedTracks
      return { ...state, selectedTracks: state.selectedTracks.filter((element: any) => element.id != action.payload.id) };
    }
    case 'REMOVE_GENRE': {
      // payload is genre string name
      // remove given genre from selectedGenres
      return { ...state, selectedGenres: state.selectedGenres.filter((element: any) => element != action.payload) };
    }
    default: {
      throw Error('unexpected action.type in FormDataContext reducer');
    }
  }
}

export const FormDataProvider = ({ children }: any) => {
  const [formData, dispatch] = useReducer(reducer, initialState);
  
  return (
    <FormDataContext.Provider value={{ formData, dispatch }}>
      {children}
    </FormDataContext.Provider>
  );
};