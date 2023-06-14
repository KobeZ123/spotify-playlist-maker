import { create } from 'zustand';

export const useFormStore = create((set) => ({
  formData: {
    name: '',
    dob: '',
  },
}));