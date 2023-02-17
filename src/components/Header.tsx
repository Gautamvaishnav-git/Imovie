import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex bg-slate-900 text-white">
      <NavLink to="/" className="px-3 py-2 capitalize">
        Home
      </NavLink>
      <NavLink to="/trending" className="px-3 py-2 capitalize">
        trending
      </NavLink>
      <NavLink to="/tv" className="px-3 py-2 capitalize">
        tv
      </NavLink>
    </div>
  );
};

export default Header;
