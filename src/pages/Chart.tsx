import { getCharacters } from "@/api/api";
import Header from "@/components/Header";
import Loading from "@/components/ui/Loading";
import { ICharacterData } from "@/types/Types";
import { useQuery } from "react-query";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import {
  AiFillCaretDown,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
} from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Chart = () => {
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  // Use react-query to fetch characters data
  const { data, error, isLoading } = useQuery(
    ["characters", currentPage],
    () => getCharacters(currentPage, itemsPerPage, ""),
    {
      enabled: currentPage > 0,
    }
  );

  // Extract characters and total pages from the fetched data
  const characters = data?.data?.results as ICharacterData[];
  const totalPages = Math.ceil(data?.data?.total / itemsPerPage) || 0;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to render pagination buttons
  const renderPagination = () => {
    const pageNumbersToShow = 3;
    const pages = Array.from({ length: totalPages }).map(
      (_, index) => index + 1
    );

    const renderPageButton = (page: number) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-1 py-1 rounded-full hover:text-red-600 text-xs ${
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
            <span className="mx-1 text-xs">...</span>
            {lastPages.map(renderPageButton)}
          </>
        );
      } else {
        const previousPages = pages.slice(currentPage - 2, currentPage);
        const nextPages = pages.slice(currentPage, currentPage + 2);

        return (
          <>
            {renderPageButton(firstPages[0])}
            <span className="mx-1 text-xs">...</span>
            {previousPages.map(renderPageButton)}
            {nextPages.map(renderPageButton)}
            <span className="mx-1 text-xs">...</span>
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
          className="flex flex-row items-center px-1 py-1 rounded-full font-semibold hover:text-red-600 text-xs"
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
        className="flex flex-row items-center px-1 py-1 rounded-full text-xs font-semibold hover:text-red-600"
        disabled={currentPage === totalPages}
      >
        NEXT
        <AiOutlineCaretRight />
      </button>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  const handleCharacterToggle = (characterName: string) => {
    setSelectedCharacters((prevSelected) => {
      if (prevSelected.includes(characterName)) {
        // Remove character from the selected list
        return prevSelected.filter((name) => name !== characterName);
      } else {
        // Add character to the selected list
        return [...prevSelected, characterName];
      }
    });
  };

  // Chart options for the Bar chart
  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Characters appearances in comics and series",
      },
    },
    maintainAspectRation: false,
    aspectRatio: 1,
  };

  const labels = characters?.map((character) => character.name);

  // Prepare data for the Bar chart based on selected characters
  const filteredChartData = {
    labels: labels?.filter((label) => selectedCharacters.includes(label)),
    datasets: [
      {
        label: "Comics",
        data: characters
          ?.filter((character) => selectedCharacters.includes(character.name))
          .map((character) => character.comics.available),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Series",
        data: characters
          ?.filter((character) => selectedCharacters.includes(character.name))
          .map((character) => character.series.available),
        backgroundColor: "rgb(54, 162, 235)",
      },
    ],
  };

  return (
    <div key={currentPage} className="w-full h-screen">
      <Header />
      <div className="flex flex-col w-full h-full px-12 py-6">
        <div className="flex flex-row h-auto items-center justify-end ">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center space-x-2 font-semibold text-sm text-gray-600 mb-4 hover:text-red-600 hover:cursor-pointer">
              <p>Characters</p>
              <AiFillCaretDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 px-4 py-4 bg-white">
              <DropdownMenuLabel>Character Lists</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col text-xs font-semibold">
                {/* Render checkboxes for character selection */}
                {labels?.map((label) => (
                  <label key={label} className="mb-2 ">
                    <input
                      type="checkbox"
                      checked={selectedCharacters.includes(label)}
                      onChange={() => handleCharacterToggle(label)}
                      className="mr-2"
                    />
                    {label}
                  </label>
                ))}
                <div className="flex flex-row items-center justify-center text-xs">
                  {renderPreviousButton()}
                  {renderPagination()}
                  {renderNextButton()}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col w-full min-h-[400px] items-center justify-center ">
          <Bar options={options} data={filteredChartData} className="" />
        </div>
      </div>
    </div>
  );
};

export default Chart;
