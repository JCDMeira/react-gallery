/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getImages } from "./service";

interface IImageStore {
  photos: any[];
  setPhotos: (photos: any[]) => void;
  query: string;
  setQuery: (query: string) => void;
  page: number;
  setPage: (page: number) => void;
  fetchData: () => void;
  fetchMore: () => void;
}

export const imagesStore = create<IImageStore>((set, get) => ({
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
  fetchData: async () => {
    const page = get().page;
    const query = get().query;
    const data = await getImages({ page, query });
    set((state) => ({ ...state, photos: data }));
  },
  fetchMore: () => set((state) => ({ ...state, page: state.page + 1 })),
}));
