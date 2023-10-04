import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const Searchbar = ({
  onSubmit,
}: {
  onSubmit: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSubmit(searchTerm);

    if (e.target.value === "") {
      onSubmit("");
    }
  };

  return (
    <div className="flex flex-col w-full px-[12px] lg:px-[24px] ">
      <div className="flex flex-row h-full items-end justify-between border-b border-gray-200">
        <div className="flex items-center justify-start border-b border-black w-[400px] relative ">
          <FiSearch className="absolute w-5 h-5  " />
          <input
            className="text-xl font-semibold  w-full h-full pl-8 py-1 focus:outline-none"
            style={{
              letterSpacing: "0.5px",
            }}
            placeholder="SEARCH..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
