import { create } from 'zustand';

type State = {
  token: string | null;
};

const initialState: State = {
  token: localStorage.getItem('token') || null,
};

type StoreTypes = {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  reset: () => void;
  isTokenNull: () => boolean;
};

const useStore = create<StoreTypes>((set, get) => ({
  ...initialState,

  setToken: (token: string) => {
    localStorage.setItem('token', token);
    set(() => ({ token: token }));
  },

  removeToken: () => {
    localStorage.removeItem('token');
    set(() => ({ token: null }));
  },

  reset: () => {
    localStorage.removeItem('token');
    set(() => ({ token: null }));
  },

  isTokenNull: () => {
    return get().token === null;
  },
}));

export default useStore;