import React, { useEffect, useState } from "react";

import Fox from "../images/MetaMask_Fox.png";

const LandingPage = ({ state, connectToMetaMask, fetchImageMetadata, fTokenBalanceOf, addTokenToMetaMask, fNickname }) => {
  const [tokenBalance, setTokenBalance] = useState("");
  //const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (state.currentAccounts && state.currentAccounts.length > 0) {
      fetchImageMetadata();
      fTokenBalanceOf().then((balance) => setTokenBalance(balance));
      //fNickname.then((nickname) => setNickname(nickname));
    }
  }, [state.currentAccounts]);


  return (
    <div className="box-signin-btn">
      <h1>MetaMask 연결 및 토큰 전송</h1>
      <p>내 주소: {state.currentAccounts}</p>
      <p>잔액: {parseFloat(state.ethereumBalance).toFixed(4)} ETH</p>
      <p>토큰 잔액 ≈ {tokenBalance} CRB</p>
      {/*<p>닉네임: {nickname}</p> {/* 닉네임 표시 */}
      <button onClick={connectToMetaMask}>
        <img src={Fox} />
        Sign in MetaMask
      </button>
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