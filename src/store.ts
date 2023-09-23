/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getImages } from "./service";

interface IImageStore {
  photos: any[];
  page: number;
  isLoading: boolean;
  setQuery: (query: string) => void;
  fetchData: () => void;
  fetchMore: () => void;
  reset_Fetch: () => void;
  init_FetchData: () => void;
  finish_FetchData: () => void;
}

const setQuey = (key: string, value: string) => {
  if ("URLSearchParams" in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newRelativePathQuery =
      window.location.pathname + "?" + searchParams.toString();
    history.pushState(null, "", newRelativePathQuery);
  }
};
const getQuey = (key: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(key) || "";
};

export const imagesStore = create<IImageStore>((set, get) => ({
  photos: [],
  page: 1,
  isLoading: false,
  setQuery: (query) => {
    const reset_Fetch = get().reset_Fetch;
    set((state) => ({ ...state, query }));
    setQuey("query", query);
    reset_Fetch();
  },
  reset_Fetch: () => {
    const fetchData = get().fetchData;
    set((state) => ({ ...state, page: 1 }));
    fetchData();
  },
  fetchData: async () => {
    const page = get().page;
    const query = getQuey("query");
    const init_FetchData = get().init_FetchData;
    const finish_FetchData = get().finish_FetchData;
    init_FetchData();
    const data = await getImages({ page, query });
    finish_FetchData();
    set((state) => {
      if (query && state.page === 1) {
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
  init_FetchData: () => {
    set((state) => ({ ...state, isLoading: true }));
  },
  finish_FetchData: () => {
    set((state) => ({ ...state, isLoading: false }));
  },
}));
