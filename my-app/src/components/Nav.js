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
        <div className="btn-menu-toggle" onClick={toggleMenu}>
          <div className="square" id="sq1"></div>
          <div className="square" id="sq2"></div>
          <div className="square" id="sq3"></div>
          <div className="square" id="sq4"></div>
          <div className="square" id="sq5"></div>
          <div className="square" id="sq6"></div>
          <div className="square" id="sq7"></div>
          <div className="square" id="sq8"></div>
          <div className="square" id="sq9"></div>
        </div>
      </div>
      <style jsx="true">
        {`
          .box-menu {
            display: ${toggleOpen ? "flex" : "none"};
          }

          .box-nav .btn-menu-toggle {
            background-color: ${toggleOpen ? "#2d712a" : "none"};
          }

          .square {
            background: ${toggleOpen ? "#ffffff" : "#2d712a"};
          }
        `}
      </style>
      <div className="box-menu">
        <button className="btn-nav" onClick={goToMain}>
          Main
        </button>
        <button className="btn-nav" onClick={goToAbout}>
          About
        </button>
        <button className="btn-nav" onClick={goToBreadcrumbTrail}>
          How it Works
        </button>
        <button className="btn-nav" onClick={goToGatherings}>
          BakeShop<p>(Comming soon)</p>
        </button>
        <button className="btn-nav" onClick={goToProfile}>
          Profile
        </button>
      </div>
    </div>
  );
};

export default Nav;
