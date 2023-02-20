import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const windowObj: Window = window;
  const [navHideOrShow, setNavHideOrShow] = useState(false);
  useEffect(() => {
    windowObj.addEventListener("wheel", (e) => {
      if (e.deltaY < 0) {
        setNavHideOrShow(true);
      } else {
        setNavHideOrShow(false);
      }
    });
  }, []);

  return (
    <div className={navHideOrShow ? "showNav sticky" : "hideNav sticky"}>
      <div className="w-full h-auto flex bg-slate-900/70 text-white backdrop-blur-sm backdrop-grayscale top-0 z-20 duration-200">
        <NavLink to="/" className="capitalize px-3 py-2">
          Home
        </NavLink>
        <NavLink to="/trending" className="capitalize px-3 py-2">
          trending
        </NavLink>
        <NavLink to="/search" className="capitalize px-3 py-2">
          Search
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
