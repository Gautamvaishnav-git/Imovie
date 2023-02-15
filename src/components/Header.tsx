import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex bg-teal-500 text-white">
      <NavLink to="/" className="px-3 py-2 capitalize">
        Home
      </NavLink>
      <NavLink to="/trending" className="px-3 py-2 capitalize">
        trending
      </NavLink>
    </div>
  );
};

export default Header;
