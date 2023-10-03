import { ICharacterData } from "@/types/Types";
import CharacterCard from "./CharacterCard";
import { useState, useEffect } from "react";

const CharacterList = () => {
  const [character, setCharacter] = useState<ICharacterData[] | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          "https://gateway.marvel.com:443/v1/public/characters?apikey=59596135a1e26a7ad544548aea32b3d6&hash=31cb30cf91afbb0fff532869c67e5174&ts=1696168450"
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        const characterData: ICharacterData[] = data.data.results.map(
          (result: ICharacterData) => ({
            id: result.id,
            name: result.name,
            description: result.description,
            thumbnail: result.thumbnail,
          })
        );

        setCharacter(characterData);
        console.log(characterData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCharacter();
  }, []);

  return (
    <div className="flex flex-col w-full h-full px-[24px] py-[12px] gap-4">
      <div className="flex flex-row h-auto items-center justify-between ">
        <p className="font-semibold text-gray-500 text-sm">2000 RESULTS</p>
        <p className="font-semibold text-gray-500 text-sm"> SORT BY</p>
      </div>
      <div className="grid grid-cols-5 gap-4 gap-x-4 py-[12px]">
        {character?.map((character: ICharacterData) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
