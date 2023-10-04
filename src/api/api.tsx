import axios from "axios";

const instance = axios.create({
  baseURL: "https://gateway.marvel.com",
});

export const getCharacters = async (
  page: number,
  itemsPerPage: number,
  query: string
) => {
  const url = `/v1/public/characters`;
  const offset = (page - 1) * itemsPerPage;

  const response = await instance.get(url, {
    params: {
      apikey: "59596135a1e26a7ad544548aea32b3d6",
      hash: "31cb30cf91afbb0fff532869c67e5174",
      ts: 1696168450,
      offset,
      limit: itemsPerPage,
      ...(query && { nameStartsWith: query }),
    },
  });

  return response.data;
};

export const getCharacter = async (collectionURI: string) => {
  const response = await instance.get(collectionURI, {
    params: {
      apikey: "59596135a1e26a7ad544548aea32b3d6",
      hash: "31cb30cf91afbb0fff532869c67e5174",
      ts: 1696168450,
    },
  });

  return response.data.data.results[0];
};

export const getComics = async (collectionURI: string) => {
  const response = await instance.get(collectionURI, {
    params: {
      apikey: "59596135a1e26a7ad544548aea32b3d6",
      hash: "31cb30cf91afbb0fff532869c67e5174",
      ts: 1696168450,
    },
  });

  return response.data.data.results;
};

export const getSeries = async (collectionURI: string) => {
  const response = await instance.get(collectionURI, {
    params: {
      apikey: "59596135a1e26a7ad544548aea32b3d6",
      hash: "31cb30cf91afbb0fff532869c67e5174",
      ts: 1696168450,
    },
  });

  return response.data.data.results;
};
