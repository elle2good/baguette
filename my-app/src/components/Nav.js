import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// logo
import lgBaguette from "../images/lg_baguette.png";

const Nav = () => {
  const navigate = useNavigate();

  // toggle Display Boolean으로 값 변경
  const [toggleOpen, setToggleOpen] = useState(false);
  const [toggleCheck, setToggleCheck] = useState(false);
  const toggleMenu = () => {
    setToggleOpen(!toggleOpen);
    setToggleCheck(!toggleCheck);
  };

  // Main 이동
  const goToMain = () => {
    navigate("/");
    toggleMenu();
  };

  // About 이동
  const goToAbout = () => {
    navigate("/about");
    toggleMenu();
  };

  // Breadcrumb Trail 이동
  const goToBreadcrumbTrail = () => {
    navigate("/breadcrumb");
    toggleMenu();
  };

  // Gatherings 이동
  const goToGatherings = () => {
    navigate("/gatherings");
    toggleMenu();
  };

  // Profile 이동
  const goToProfile = () => {
    navigate("/profile");
    toggleMenu();
  };

  return (
    <div>
      <div id="bgNav" className="box-nav">
        <button className="btn-nav-main" onClick={goToMain}>
          Baguette
        </button>
        <input
          type="checkbox"
          id="btnMenu"
          onChange={toggleMenu}
          checked={toggleCheck}
        />
        <label htmlFor="btnMenu" className="btn-menu-toggle">
          <div className="btn-menu-bars" id="bar1"></div>
          <div className="btn-menu-bars" id="bar2"></div>
          <div className="btn-menu-bars" id="bar3"></div>
        </label>
      </div>
      <style jsx="true">
        {`
          .box-menu {
            display: ${toggleOpen ? "flex" : "none"};
          }
        `}
      </style>
      <div className="box-menu">
        <button className="btn-nav" onClick={goToAbout}>
          About
        </button>
        <button className="btn-nav" onClick={goToBreadcrumbTrail}>
          Breadcrumb Trail
        </button>
        <button className="btn-nav" onClick={goToGatherings}>
          Gatherings
        </button>
        <button className="btn-nav" onClick={goToProfile}>
          Profile
        </button>
      </div>
    </div>
  );
};

export default Nav;
