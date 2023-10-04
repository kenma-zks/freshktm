import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { IComicData, ISeriesData } from "@/types/Types";
import Header from "@/components/Header";
import { useQuery } from "react-query";
import { getCharacter, getComics, getSeries } from "@/api/api";
import Loading from "@/components/ui/Loading";
import { useParams } from "react-router-dom";

const Characters = () => {
  const { characterId } = useParams<{ characterId: string }>();

  const selectedCharacter = useSelector(
    (state: RootState) => state.characters.selectedCharacter
  );

  const characterURI = `https://gateway.marvel.com/v1/public/characters/${characterId}`;

  const comicURI = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics`;
  const seriesURI = `https://gateway.marvel.com/v1/public/characters/${characterId}/series`;

  const {
    data: characterData,
    error: characterError,
    isLoading: characterLoading,
  } = useQuery(["characterData", selectedCharacter?.id], () =>
    getCharacter(characterURI)
  );

  const {
    data: comicData,
    error: comicError,
    isLoading: comicLoading,
  } = useQuery(["comicData", selectedCharacter?.id], () =>
    getComics(comicURI || "")
  );

  const {
    data: seriesData,
    error: seriesError,
    isLoading: seriesLoading,
  } = useQuery(["seriesData", selectedCharacter?.id], () =>
    getSeries(seriesURI || "")
  );

  if (characterLoading || comicLoading || seriesLoading) {
    return <Loading />;
  }

  if (characterError || comicError || seriesError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="w-full h-screen ">
      <Header />
      <div className="flex flex-row items-center justify-start w-full h-1/3 lg:h-2/3 border border-black px-[24px] md:px-[48px] lg:px-60 bg-[#151515]">
        <div className="flex flex-col items-center justify-center  h-full border border-black gap-2 md:gap-4">
          <img
            src={`${characterData?.thumbnail.path}.${characterData?.thumbnail.extension}`}
            alt={characterData?.name}
            className="w-full h-full object-cover "
          />
          <p className="text-lg md:text-xl text-gray-200 font-bold pb-2">
            {characterData?.name}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full h-full border border-black px-6 py-6 gap-2 md:px-24 md:py-12 md:gap-4">
          <h2 className="font-bold text-lg md:text-2xl  text-gray-200 ">
            Description
          </h2>
          <p className="text-xs md:text-sm  text-gray-200 font-bold text-justify">
            {selectedCharacter?.description || "No description available"}
          </p>
        </div>
      </div>
      <div className="flex flex-row  w-full border border-black px-[12px] lg:px-12 bg-[#F3F4F7]">
        <div className="flex flex-col w-1/2 items-center justify-center md:justify-start border-r border-black px-[12px] py-[12px] lg:px-4 lg:py-4 lg:gap-4">
          <div className="border-b border-black">
            <p className="text-sm md:text-lg  font-bold ">Comics Appeared In</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-[24px] lg:grid-cols-3 lg:gap-4 lg:gap-x-4 py-[12px] items-center justify-center lg:justify-between">
            {comicData?.length > 0 ? (
              comicData.map((comic: IComicData) => (
                <div key={comic.id}>
                  <div className="flex flex-col items-center justify-center max-w-[100px] max-h-[150px] min-w-[100px] min-h-[150px] lg:max-w-[200px] lg:max-h-[300px] lg:min-w-[200px] lg:min-h-[300px]">
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                      className="max-w-[100px] max-h-[150px] min-w-[100px] min-h-[150px] lg:max-w-[200px] lg:max-h-[300px] lg:min-w-[200px] lg:min-h-[300px] object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold mt-2 line-clamp-2 h-[40px]">
                    {comic.title}
                  </p>
                </div>
              ))
            ) : (
              <p>No comics available</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-1/2 items-center justify-start border-r border-black px-[12px] py-[12px] lg:px-4 lg:py-4 lg:gap-4">
          <div className="border-b border-black">
            <p className="text-sm md:text-lg  font-bold ">Series Appeared In</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-[24px] lg:grid-cols-3 lg:gap-4 lg:gap-x-4 py-[12px] lg:justify-between">
            {seriesData?.length > 0 ? (
              seriesData.map((series: ISeriesData) => (
                <div key={series.id}>
                  <div className="flex flex-col items-center justify-center max-w-[100px] max-h-[150px] min-w-[100px] min-h-[150px] lg:max-w-[200px] lg:max-h-[300px] lg:min-w-[200px] lg:min-h-[300px]">
                    <img
                      src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                      alt={series.title}
                      className="max-w-[100px] max-h-[150px] min-w-[100px] min-h-[150px] lg:max-w-[200px] lg:max-h-[300px] lg:min-w-[200px] lg:min-h-[300px] object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold mt-2 line-clamp-2 h-[40px]">
                    {series.title}
                  </p>
                </div>
              ))
            ) : (
              <p>No series available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
