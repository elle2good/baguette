import React, { useEffect, useState } from "react";

import Fox from "../images/lg_metamask.png";

const LandingPage = ({
  state,
  connectToMetaMask,
  fetchImageMetadata,
  fTokenBalanceOf,
  addTokenToMetaMask,
  fNickname,
}) => {
  const [tokenBalance, setTokenBalance] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (state.currentAccounts && state.currentAccounts.length > 0) {
      fetchImageMetadata();
      fTokenBalanceOf().then((balance) => setTokenBalance(balance));
  
      const fetchNickname = async () => {
        const nickname = await fNickname();
        setNickname(nickname);
      };
  
      fetchNickname();
    }
  }, [state.currentAccounts]);

  const handleNicknameClick = () => {
    alert(`Hello, ${nickname}!`);
  };
  

  return (
    <div className="box-signin-btn">
      <p>내 주소: {state.currentAccounts}</p>
      <div className="box-about-team">
        This is the space to go into Mission, About, How it Works, Team.
      </div>
      <button onClick={connectToMetaMask}>
        <img src={Fox} />
        Sign in MetaMask
      </button>
      <p>잔액: {parseFloat(state.ethereumBalance).toFixed(4)} ETH</p>
      <p>토큰 잔액 ≈ {tokenBalance} CRB</p>
      <p onClick={handleNicknameClick}>닉네임: {nickname}</p>
      <button onClick={addTokenToMetaMask}>토큰 추가</button>
      {state.imageUrl && (
        <div>
          <p>이미지:</p>
          <img src={state.imageUrl} alt="NFT 이미지" />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
