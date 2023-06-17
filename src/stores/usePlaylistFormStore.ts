import { create } from "zustand";

type PlaylistFormState = {
  playlistName: string;
  playlistDuration: number;
  selectedArtists: string[];
  selectedTracks: string[];
  selectedGenres: string[];
};

type PlaylistFormStore = {
  formData: PlaylistFormState;
  updatePlaylistFormData: (field: keyof PlaylistFormState, value: any) => void;
  resetFormData: () => void;
};

const initialPlaylistFormState: PlaylistFormState = {
  playlistName: "",
  playlistDuration: 0,
  selectedArtists: [],
  selectedTracks: [],
  selectedGenres: [],
};

export const usePlaylistFormStore = create<PlaylistFormStore>((set) => ({
  formData: { ...initialPlaylistFormState },
  updatePlaylistFormData: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
  resetFormData: () =>
    set(() => ({
      formData: { ...initialPlaylistFormState },
    })),
}));
