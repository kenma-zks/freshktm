import CharacterList from "@/components/CharacterList";
import { FiSearch } from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-screen px-[120px]">
      <div className="flex flex-col w-full h-[100px] px-[24px] pb-[12px]">
        <div className="flex flex-row h-full items-center ">
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
      <div className="flex flex-col w-full h-[100px] px-[24px] ">
        <div className="flex flex-row h-full items-end justify-between border-b border-gray-200">
          <div className="flex items-center justify-start border-b border-black w-[400px] relative ">
            <FiSearch className="absolute w-5 h-5  " />
            <input
              className="text-xl font-semibold  w-full h-full pl-8 py-1 focus:outline-none"
              style={{
                letterSpacing: "0.5px",
              }}
              placeholder="SEARCH..."
            />
          </div>
        </div>
      </div>

      <CharacterList />
    </div>
  );
};

export default Dashboard;
