import { GetState, SetState, StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { useLocalStorage } from "react-use";
interface PlaylistFormState {
  formData: {
    playlistName: string;
    playlistDuration: number;
    selectedArtists: any[];
    selectedTracks: any[];
    selectedGenres: any[];
    playlistID: string;
  };
}

interface PlaylistFormActions {
  formData: PlaylistFormState["formData"];
  updatePlaylistFormData: (
    field: keyof PlaylistFormState["formData"],
    value: any
  ) => void;
  resetFormData: () => void;
}

const initialPlaylistFormState: PlaylistFormState = {
  formData: {
    playlistName: "",
    playlistDuration: 0,
    selectedArtists: [],
    selectedTracks: [],
    selectedGenres: [],
    playlistID: "",
  },
};

const createStore: StateCreator<PlaylistFormActions> = (
  set: SetState<PlaylistFormActions>,
  get: GetState<PlaylistFormActions>
) => ({
  formData: { ...initialPlaylistFormState.formData },
  updatePlaylistFormData: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
  resetFormData: () =>
    set(() => ({
      formData: { ...initialPlaylistFormState.formData },
    })),
});

export const usePlaylistFormStore = create(
  persist(createStore, {
    name: "playlist-form-storage",
    getStorage: () => localStorage,
  })
);
// type PlaylistFormState = {
//   playlistName: string;
//   playlistDuration: number;
//   selectedArtists: any[];
//   selectedTracks: any[];
//   selectedGenres: any[];
//   playlistID: string;
// };

// type PlaylistFormStore = {
//   formData: PlaylistFormState;
//   updatePlaylistFormData: (field: keyof PlaylistFormState, value: any) => void;
//   resetFormData: () => void;
// };

// const initialPlaylistFormState: PlaylistFormState = {
//   playlistName: "",
//   playlistDuration: 0,
//   selectedArtists: [],
//   selectedTracks: [],
//   selectedGenres: [],
//   playlistID: "",
// };

// export const usePlaylistFormStore = create(
//   persist(
//     (set) => ({
//       formData: { ...initialPlaylistFormState },
//       updatePlaylistFormData: (field:any, value: any) =>
//         set((state: PlaylistFormStore) => ({
//           formData: {
//             ...state.formData,
//             [field]: value,
//           },
//         })),
//       resetFormData: () =>
//         set(() => ({
//           formData: { ...initialPlaylistFormState },
//         })),
//     }),
//     {
//       name: 'playlist-form-storage', // Specify a unique name for the storage
//       getStorage: () => localStorage, // Use local storage for persistence
//     }
//   )
// );

// export const usePlaylistFormStore = create<PlaylistFormStore>((set) => {
//   const [formData, setFormData] = useLocalStorage(
//     "playlist-form-storage",
//     initialPlaylistFormState
//   );

//   return {
//     formData,
//     updatePlaylistFormData: (field, value) =>
//       set((state) => ({
//         formData: {
//           ...state.formData,
//           [field]: value,
//         },
//       })),
//     resetFormData: () =>
//       set(() => ({
//         formData: initialPlaylistFormState,
//       })),
//   };
// });
