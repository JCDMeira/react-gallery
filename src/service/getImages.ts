import { imagesService } from ".";

type getImagesDTO = {
  query: string;
  page: number;
};

const clientID = `?client_id=${import.meta.env.VITE_API_KEY}`;

export const getImages = async ({ query, page }: getImagesDTO) => {
  const urlComplement = query ? "search/photos/" : "photos/";

  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("query", query);

  const { data } = await imagesService.get(`${urlComplement}${clientID}`, {
    params,
  });
  return data;
};
