import { useState, useEffect } from "react";
import { ICharacterData } from "@/types/Types";
import CharacterCard from "./CharacterCard";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const CharacterList = () => {
  const itemsPerPage = 20;

  const [characters, setCharacters] = useState<ICharacterData[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const fetchCharacter = async (page: number) => {
    try {
      const offset = (page - 1) * itemsPerPage;

      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?apikey=59596135a1e26a7ad544548aea32b3d6&hash=31cb30cf91afbb0fff532869c67e5174&ts=1696168450&limit=${itemsPerPage}&offset=${offset}`
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

      setCharacters(characterData);
      setTotalPages(Math.ceil(data.data.total / itemsPerPage));
      setTotalResults(data.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharacter(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    const pageNumbersToShow = 5;
    const pages = Array.from({ length: totalPages }).map(
      (_, index) => index + 1
    );

    const renderPageButton = (page: number) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`mx-1 px-3 py-1 rounded-full hover:text-red-600 ${
          currentPage === page ? "font-semibold text-red-600" : "font-semibold"
        }`}
      >
        {page}
      </button>
    );

    if (totalPages <= pageNumbersToShow) {
      return pages.map(renderPageButton);
    } else {
      const firstPages = pages.slice(0, pageNumbersToShow - 1);
      const lastPage = pages[pages.length - 1];

      if (currentPage <= 3) {
        return (
          <>
            {firstPages.map(renderPageButton)}
            <span className="mx-1">...</span>
            {renderPageButton(lastPage)}
          </>
        );
      } else if (currentPage >= totalPages - 2) {
        const firstPage = pages[0];
        const lastPages = pages.slice(totalPages - pageNumbersToShow);

        return (
          <>
            {renderPageButton(firstPage)}
            <span className="mx-1">...</span>
            {lastPages.map(renderPageButton)}
          </>
        );
      } else {
        const previousPages = pages.slice(currentPage - 2, currentPage);
        const nextPages = pages.slice(currentPage, currentPage + 2);

        return (
          <>
            {renderPageButton(firstPages[0])}
            <span className="mx-1">...</span>
            {previousPages.map(renderPageButton)}
            {nextPages.map(renderPageButton)}
            <span className="mx-1">...</span>
            {renderPageButton(lastPage)}
          </>
        );
      }
    }
  };

  const renderPreviousButton = () => {
    return (
      currentPage > 1 && (
        <button
          className="flex flex-row items-center gap-2 mx-1 px-3 py-1 rounded-full text-sm font-semibold hover:text-red-600"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <AiOutlineCaretLeft />
          PREV
        </button>
      )
    );
  };
  const renderNextButton = () => {
    return (
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex flex-row items-center gap-2 mx-1 px-3 py-1 rounded-full text-sm font-semibold hover:text-red-600"
        disabled={currentPage === totalPages}
      >
        NEXT
        <AiOutlineCaretRight />
      </button>
    );
  };

  return (
    <div className="flex flex-col w-full h-full px-[24px] py-[12px] ">
      <div className="flex flex-row h-auto items-center justify-between ">
        <p className="font-semibold text-gray-500 text-sm">
          {totalResults} RESULTS
        </p>
        <p className="font-semibold text-gray-500 text-sm"> SORT BY</p>
      </div>
      <div className="grid grid-cols-5 gap-4 gap-x-4 py-[12px]">
        {characters?.map((character: ICharacterData) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        {renderPreviousButton()}
        {renderPagination()}
        {renderNextButton()}
      </div>
    </div>
  );
};

export default CharacterList;
