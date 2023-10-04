import CharacterList from "@/components/CharacterList";
import Header from "@/components/Header";
import Searchbar from "@/components/ui/Searchbar";
import { setSearchQuery } from "@/store/searchSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleSearch = (searchTerm: string) => {
    dispatch(setSearchQuery(searchTerm));
  };
  return (
    <div className="flex flex-col w-full h-screen ">
      <Header />

      <div className="flex flex-col px-[12px] md:px-[32px] lg:px-[120px] gap-4">
        <div className="flex flex-col w-full px-[12px] md:px-[12px]">
          <div className="flex flex-row h-full items-center mt-4">
            <p
              className="text-xl font-semibold "
              style={{
                letterSpacing: "0.5px",
              }}
            >
              MARVEL CHARACTER LIST
            </p>
          </div>
        </div>
        <Searchbar onSubmit={handleSearch} />
        <CharacterList />
      </div>
    </div>
  );
};

export default Dashboard;
