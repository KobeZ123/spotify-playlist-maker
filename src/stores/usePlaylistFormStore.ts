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
