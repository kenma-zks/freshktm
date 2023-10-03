import React from "react";
import { ICharacterData } from "@/types/Types";

interface CharacterCardProps {
  character: ICharacterData;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="relative flex flex-col w-[240px] h-[340px] bg-black cursor-pointer group">
      {character.thumbnail && (
        <div className="relative w-full max-h-[200px] min-h-[200px] overflow-hidden">
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="w-full h-full object-cover transition-transform transform scale-100 group-hover:scale-110"
          />
        </div>
      )}
      <div className="relative flex flex-col px-4 py-2 w-full h-[140px] border-t-4 border-red-600 justify-between overflow-hidden group-hover:after:bg-red-600 transition-all duration-300 ease-in-out">
        <div className="flex flex-col w-full h-full">
          <h2 className="font-semibold text-white relative z-10">
            {character.name}
          </h2>
        </div>
        <div className="relative flex flex-col w-full h-full z-10">
          <p className="line-clamp-3 font-semibold text-xs text-[#bdbaba] text-justify ">
            {character.description}
          </p>
        </div>
        <div className="absolute inset-x-0 top-0 h-0 bg-red-600 group-hover:h-full transition-all duration-300 ease-in-out"></div>
      </div>
    </div>
  );
};

export default CharacterCard;
