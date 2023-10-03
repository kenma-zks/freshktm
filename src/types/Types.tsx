export type ICharacterData = {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      }
    ];
  };
  series: {
    available: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      }
    ];
  };
};

export type IComicData = {
  id: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};
export type ISeriesData = {
  id: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};
