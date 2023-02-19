import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex bg-slate-900/70 text-white backdrop-blur-sm backdrop-grayscale sticky top-0 z-20">
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
