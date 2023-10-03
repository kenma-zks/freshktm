import { useState } from "react";
import { ICharacterData } from "@/types/Types";
import CharacterCard from "./CharacterCard";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import { setSelectedCharacter } from "@/store/characterSlice";
import { useQuery } from "react-query";
import { getCharacters } from "@/api/api";
import Loading from "./ui/Loading";

const CharacterList = () => {
  const itemsPerPage = 20;

  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useQuery(
    ["characters", currentPage],
    () => getCharacters(currentPage, itemsPerPage),
    {
      enabled: currentPage > 0,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  const characters = data?.data?.results as ICharacterData[];
  const totalPages = Math.ceil(data?.data?.total / itemsPerPage) || 0;
  const totalResults = data?.data?.total || 0;

  const filteredCharacters = characters?.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredCharacters);

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
        <p
          className="font-semibold text-gray-500 text-xs"
          style={{
            letterSpacing: "1px",
          }}
        >
          {totalResults} RESULTS
        </p>
      </div>
      <div className="grid grid-cols-5 gap-4 gap-x-4 py-[12px]">
        {filteredCharacters?.map((character: ICharacterData) => (
          <Link
            to={`/characters/${character.id}`}
            key={character.id}
            onClick={() => {
              dispatch(setSelectedCharacter(character));
            }}
          >
            <CharacterCard key={character.id} character={character} />
          </Link>
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
