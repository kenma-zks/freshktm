import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IComicData, ISeriesData } from "@/types/Types";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";

const Characters = () => {
  const { characterId } = useParams<{ characterId: string }>();

  const selectedCharacter = useSelector(
    (state: RootState) => state.characters.selectedCharacter
  );
  const [comicData, setComicData] = useState<IComicData[] | null>(null);
  const [seriesData, setSeriesData] = useState<ISeriesData[] | null>(null);

  const fetchComicDetails = async () => {
    try {
      const response = await fetch(
        `${selectedCharacter?.comics.collectionURI}?apikey=762b368e819bdc2839a3c34108d6375f&hash=4e5d5653785a55a37e97032fa1b98745&ts=1696329009`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const comicData = data.data.results.map((result: IComicData) => ({
        id: result.id,
        title: result.title,
        thumbnail: result.thumbnail,
      }));
      console.log(comicData);
      setComicData(comicData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSeriesDetails = async () => {
    try {
      const response = await fetch(
        `${selectedCharacter?.series.collectionURI}?apikey=762b368e819bdc2839a3c34108d6375f&hash=4e5d5653785a55a37e97032fa1b98745&ts=1696329009`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const seriesData = data.data.results.map((result: ISeriesData) => ({
        id: result.id,
        title: result.title,
        thumbnail: result.thumbnail,
      }));
      console.log(seriesData);
      setSeriesData(seriesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComicDetails();
  }, [characterId]);

  useEffect(() => {
    fetchSeriesDetails();
  }, [characterId]);

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
          <div className="grid grid-cols-3 gap-4  gap-x-4 py-[12px] justify-between">
            {comicData?.map(
              (comic) =>
                (
                  <div key={comic.id}>
                    <div className="flex flex-col items-center justify-center max-w-[200px] max-h-[300px] min-w-[200px] min-h-[300px]">
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                        className=" max-w-[200px] max-h-[300px] min-w-[200px] min-h-[300px] object-cover"
                      />
                    </div>
                    <p className="text-xs font-bold mt-2 line-clamp-2 h-[40px]">
                      {comic.title}
                    </p>
                  </div>
                ) || "No comics available"
            )}
          </div>
        </div>
        <div className="flex flex-col w-1/2 items-center justify-start border-l border-black px-4 py-4 gap-4">
          <div className="border-b border-black">
            <p className="text-lg  font-bold ">Series Appeared In</p>
          </div>
          <div className="grid grid-cols-3 gap-4  gap-x-4 py-[12px] justify-between">
            {seriesData?.map(
              (series) =>
                (
                  <div key={series.id}>
                    <div className="flex flex-col items-center justify-center max-w-[200px] max-h-[300px] min-w-[200px] min-h-[300px]">
                      <img
                        src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                        alt={series.title}
                        className=" max-w-[200px] max-h-[300px] min-w-[200px] min-h-[300px] object-cover"
                      />
                    </div>
                    <p className="text-xs font-bold mt-2 line-clamp-2 h-[40px] ">
                      {series.title}
                    </p>
                  </div>
                ) || "No series available"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
