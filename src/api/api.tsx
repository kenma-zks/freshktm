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
      apikey: "762b368e819bdc2839a3c34108d6375f",
      hash: "4e5d5653785a55a37e97032fa1b98745",
      ts: 1696329009,
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
      apikey: "762b368e819bdc2839a3c34108d6375f",
      hash: "4e5d5653785a55a37e97032fa1b98745",
      ts: 1696329009,
    },
  });

  return response.data.data.results[0];
};

export const getComics = async (collectionURI: string) => {
  const response = await instance.get(collectionURI, {
    params: {
      apikey: "762b368e819bdc2839a3c34108d6375f",
      hash: "4e5d5653785a55a37e97032fa1b98745",
      ts: 1696329009,
    },
  });

  return response.data.data.results;
};

export const getSeries = async (collectionURI: string) => {
  const response = await instance.get(collectionURI, {
    params: {
      apikey: "762b368e819bdc2839a3c34108d6375f",
      hash: "4e5d5653785a55a37e97032fa1b98745",
      ts: 1696329009,
    },
  });

  return response.data.data.results;
};
