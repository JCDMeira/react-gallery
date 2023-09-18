/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface IImageStore {
  photos: any[];
  setPhotos: (photos: any[]) => void;
  query: string;
  setQuery: (query: string) => void;
  page: number;
  setPage: (page: number) => void;
}

export const imagesStore = create<IImageStore>((set) => ({
  photos: [],
  setPhotos: (photos) =>
    set((state) => {
      if (state.query && state.page === 1) {
        return { ...state, photos };
      } else if (state.page === 1) {
        return { ...state, photos };
      }
      return { ...state, photos: [...state.photos, ...photos] };
    }),
  query: "",
  setQuery: (query) => set((state) => ({ ...state, query })),
  page: 1,
  setPage: (page) => set((state) => ({ ...state, page })),
}));
