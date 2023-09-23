/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getImages } from "./service";

interface IImageStore {
  photos: any[];
  query: string;
  setQuery: (query: string) => void;
  page: number;
  resetFetch: () => void;
  fetchData: () => void;
  fetchMore: () => void;
}

export const imagesStore = create<IImageStore>((set, get) => ({
  photos: [],
  query: "",
  page: 1,
  setQuery: (query) => {
    const fetchData = get().fetchData;
    set((state) => ({ ...state, query }));
    fetchData();
  },
  resetFetch: () => {
    const fetchData = get().fetchData;
    set((state) => ({ ...state, page: 1 }));
    fetchData();
  },
  fetchData: async () => {
    const page = get().page;
    const query = get().query;
    const data = await getImages({ page, query });
    set((state) => {
      if (state.query && state.page === 1) {
        return { ...state, photos: data };
      } else if (state.page === 1) {
        return { ...state, photos: data };
      }
      return { ...state, photos: [...state.photos, ...data] };
    });
  },
  fetchMore: () => {
    const fetchData = get().fetchData;
    set((state) => ({ ...state, page: state.page + 1 }));
    fetchData();
  },
}));
