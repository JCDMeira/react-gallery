import axios from "axios";

export const imagesService = axios.create({
  baseURL: "https://api.unsplash.com",
});
