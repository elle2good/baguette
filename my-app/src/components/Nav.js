import React, { useState } from "react";
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

  // 메인으로 이동
  const goToMain = () => {
    navigate("/");
    toggleMenu();
  };

  // 이더리움 전송으로 이동
  const goToEthTransfer = () => {
    navigate("/eth_transfer");
    toggleMenu();
  };

  // 토큰 전송으로 이동
  const goToTokenTransfer = () => {
    navigate("/token_transfer");
    toggleMenu();
  };

  // 프로필 NFT 구매로 이동
  const goToNFTMint = () => {
    navigate("/nft_mint");
    toggleMenu();
  };

  // FT 민팅으로 이동
  const goToFTMint = () => {
    navigate("/ft_mint");
    toggleMenu();
  };

  // 토큰 교환으로 이동
  const goToExchangeToken = () => {
    navigate("/exchange_token");
    toggleMenu();
  };

  // 투표로 이동
  const goToVote = () => {
    navigate("/vote");
    toggleMenu();
  };

  // 관리자 컨트롤러로 이동
  const goToAdminController = () => {
    navigate("/admin/controller");
    toggleMenu();
  };

  // 관리자 팀 민팅으로 이동
  const goToAdminTeamMint = () => {
    navigate("/admin/team_mint");
    toggleMenu();
  };

  return (
    <div>
      <div className="box-nav">
        <button className="btn-nav-main" onClick={goToMain}>
          <img src={lgBaguette} />
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
        <button className="btn-nav" onClick={goToEthTransfer}>
          eth_transfer
        </button>
        <button className="btn-nav" onClick={goToTokenTransfer}>
          token_transfer
        </button>
        <button className="btn-nav" onClick={goToNFTMint}>
          nft_mint
        </button>
        <button className="btn-nav" onClick={goToFTMint}>
          ft_mint
        </button>
        <button className="btn-nav" onClick={goToExchangeToken}>
          exchange_token
        </button>
        <button className="btn-nav" onClick={goToVote}>
          vote
        </button>
        <button className="btn-nav" onClick={goToAdminController}>
          admin/controller
        </button>
        <button className="btn-nav" onClick={goToAdminTeamMint}>
          admin/team_mint
        </button>
      </div>
    </div>
  );
};

export default Nav;
