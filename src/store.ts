/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getImages } from "./service";

interface IImageStore {
  photos: any[];
  query: string;
  page: number;
  isLoading: boolean;
  setQuery: (query: string) => void;
  resetFetch: () => void;
  fetchData: () => void;
  initFetchData: () => void;
  finishFetchData: () => void;
  fetchMore: () => void;
}

export const imagesStore = create<IImageStore>((set, get) => ({
  photos: [],
  query: "",
  page: 1,
  isLoading: false,
  setQuery: (query) => {
    const resetFetch = get().resetFetch;
    set((state) => ({ ...state, query }));
    resetFetch();
  },
  resetFetch: () => {
    const fetchData = get().fetchData;
    set((state) => ({ ...state, page: 1 }));
    fetchData();
  },
  fetchData: async () => {
    const page = get().page;
    const query = get().query;
    const initFetchData = get().initFetchData;
    const finishFetchData = get().finishFetchData;
    initFetchData();
    const data = await getImages({ page, query });
    finishFetchData();
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
    const isLoading = get().isLoading;
    set((state) => ({
      ...state,
      page: isLoading ? state.page : state.page + 1,
    }));
    if (!isLoading) fetchData();
  },
  initFetchData: () => {
    set((state) => ({ ...state, isLoading: true }));
  },
  finishFetchData: () => {
    set((state) => ({ ...state, isLoading: false }));
  },
}));
