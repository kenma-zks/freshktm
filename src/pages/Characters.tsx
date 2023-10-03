import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { IComicData, ISeriesData } from "@/types/Types";
import Header from "@/components/Header";
import { useQuery } from "react-query";
import { getComics, getSeries } from "@/api/api";
import Loading from "@/components/ui/Loading";

const Characters = () => {
  const selectedCharacter = useSelector(
    (state: RootState) => state.characters.selectedCharacter
  );

  const {
    data: comicData,
    error: comicError,
    isLoading: comicLoading,
  } = useQuery(["comicData", selectedCharacter?.id], () =>
    getComics(selectedCharacter?.comics?.collectionURI || "")
  );

  const {
    data: seriesData,
    error: seriesError,
    isLoading: seriesLoading,
  } = useQuery(["seriesData", selectedCharacter?.id], () =>
    getSeries(selectedCharacter?.series?.collectionURI || "")
  );

  if (comicLoading || seriesLoading) {
    return <Loading />;
  }

  if (comicError || seriesError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="w-full h-screen ">
      <Header />
      <div className="flex flex-row items-center justify-start w-full h-2/3 border border-black px-60 bg-[#151515]">
        <div className="flex flex-col items-center justify-center  h-full border border-black gap-4">
          <img
            src={`${selectedCharacter?.thumbnail.path}.${selectedCharacter?.thumbnail.extension}`}
            alt={selectedCharacter?.name}
            className="w-full h-full object-cover "
          />
          <p className="text-xl text-gray-200 font-bold pb-2">
            {selectedCharacter?.name}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full h-full border border-black px-24 py-12 gap-4">
          <h2 className="font-bold text-2xl  text-gray-200 ">Description</h2>
          <p className="text-sm  text-gray-200 font-bold text-justify">
            {selectedCharacter?.description || "No description available"}
          </p>
        </div>
      </div>
      <div className="flex flex-row  w-full border border-black px-12 bg-[#F3F4F7]">
        <div className="flex flex-col w-1/2 items-center justify-start border-r border-black px-4 py-4 gap-4">
          <div className="border-b border-black">
            <p className="text-lg  font-bold ">Comics Appeared In</p>
          </div>
          <div className="grid grid-cols-3 gap-4 gap-x-4 py-[12px] justify-between">
            {comicData?.length > 0 ? (
              comicData.map((comic: IComicData) => (
                <div key={comic.id}>
                  <div className="flex flex-col items-center justify-center max-w-[200px] max-h-[300px] min-w-[200px] min-h-[300px]">
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                      className="max-w-[200px] max-h-[300px] min-w-[200px] min-h-[300px] object-cover"
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
        <div className="flex flex-col w-1/2 items-center justify-start border-l border-black px-4 py-4 gap-4">
          <div className="border-b border-black">
            <p className="text-lg  font-bold ">Series Appeared In</p>
          </div>
          <div className="grid grid-cols-3 gap-4 gap-x-4 py-[12px] justify-between">
            {seriesData?.length > 0 ? (
              seriesData.map((series: ISeriesData) => (
                <div key={series.id}>
                  <div className="flex flex-col items-center justify-center max-w-[200px] max-h-[300px] min-w-[200px] min-h-[300px]">
                    <img
                      src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                      alt={series.title}
                      className="max-w-[200px] max-h-[300px] min-w-[200px] min-h-[300px] object-cover"
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
