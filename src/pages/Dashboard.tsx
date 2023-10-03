import CharacterList from "@/components/CharacterList";
import Searchbar from "@/components/ui/Searchbar";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-screen px-[120px] gap-4">
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
      <Searchbar />
      <CharacterList />
    </div>
  );
};

export default Dashboard;
