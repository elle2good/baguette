import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  // 메인으로 이동
  const goToMain = () => {
    navigate("/");
  };

  // 이더리움 전송으로 이동
  const goToEthTransfer = () => {
    navigate("/eth_transfer");
  };

  // 토큰 전송으로 이동
  const goToTokenTransfer = () => {
    navigate("/token_transfer");
  };

  // 프로필 NFT 구매로 이동
  const goToNFTMint = () => {
    navigate("/nft_mint");
  };

  // FT 민팅으로 이동
  const goToFTMint = () => {
    navigate("/ft_mint");
  };

  // 토큰 교환으로 이동
  const goToExchangeToken = () => {
    navigate("/exchange_token");
  };

  // 투표로 이동
  const goToVote = () => {
    navigate("/vote");
  };

  // 관리자 컨트롤러로 이동
  const goToAdminController = () => {
    navigate("/admin/controller");
  };

  // 관리자 팀 민팅으로 이동
  const goToAdminTeamMint = () => {
    navigate("/admin/team_mint");
  };

  return (
    <div>
      <button className="btn-nav" onClick={goToMain}>
        main
      </button>
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
  );
};

export default Nav;
