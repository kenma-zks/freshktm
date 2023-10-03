import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 left-0 w-full flex flex-row items-center justify-left pl-[144px] bg-[#202020] gap-12 z-50">
      <p className="text-gray-400 py-4 border-b-4 border-transparent hover:border-red-600 hover:text-white font-semibold text-sm hover:cursor-pointer">
        <Link to="/">Home</Link>
      </p>
      <p className="text-gray-400 py-4 border-b-4 border-transparent hover:border-red-600 hover:text-white font-semibold text-sm hover:cursor-pointer">
        Chart
      </p>
    </div>
  );
};

export default Header;
