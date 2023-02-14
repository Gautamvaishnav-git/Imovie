import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex gap-4 bg-teal-500 text-white">
      <Link to="/" className="px-4 py-2">
        Home
      </Link>
    </div>
  );
};

export default Header;
