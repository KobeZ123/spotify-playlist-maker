import { create } from 'zustand'
type State = {
  token: string | null
}

// define the initial state
const initialState: State = {
  token: null
}

type StoreTypes = {
  token: string | null
  setToken: (token: string) => void
  removeToken: () => void
  reset: () => void
  isTokenNull: () => boolean
}

const useStore = create<StoreTypes>((set, get) => ({
  ...initialState, 

  setToken: (token: string) => 
    set(() => ({ token: token })),

  removeToken: () => 
    set(() => ({ token: null })),

  reset: () => {
    set(initialState)
  },

  isTokenNull: () => {
    return get().token === null;
  },
}))

export default useStore;