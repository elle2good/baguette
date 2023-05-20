import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nav = ({ aboutRef, howItWorksRef }) => {
  const navigate = useNavigate();

  // 스크롤 위치 받아올 State
  const [scrollValue, setScrollValue] = useState(0);

  const handleScroll = () => {
    setScrollValue(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    toggleMenu();
  };

  // How it Works 이동
  const goToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
        <style jsx="true">
          {`
            .box-nav {
              background-color: ${scrollValue > 760 ? "#2d712a" : "#fee6ff"};
            }

            .box-nav {
              background-color: ${scrollValue > 1830 ? "#f9e5c7" : "none"};
            }

            .box-nav .btn-nav-main {
              color: ${scrollValue > 760 ? "#ffffff" : "none"};
            }

            .box-nav .btn-nav-main {
              color: ${scrollValue > 1830 ? "#2d712a" : "none"};
            }

            .btn-menu-toggle .square {
              background: ${scrollValue > 760 && scrollValue < 1830
                ? "#ffffff"
                : "#2d712a"};
            }

            .box-menu {
              display: ${toggleOpen ? "flex" : "none"};
            }

            .box-nav .btn-menu-toggle {
              background-color: ${toggleOpen ? "#2d712a" : "none"};
            }

            .square {
              background: ${toggleOpen ? "#ffffff!important" : "#2d712a"};
            }
          `}
        </style>
        <button className="btn-nav-main">Baguette</button>
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
      <div className="box-menu">
        <button className="btn-nav" onClick={goToMain}>
          Main
        </button>
        <button className="btn-nav" onClick={goToAbout}>
          About
        </button>
        <button className="btn-nav" onClick={goToHowItWorks}>
          How it Works
        </button>
        <button className="btn-nav" onClick="">
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
