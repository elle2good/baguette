import React from "react";

import Fox from "../images/MetaMask_Fox.png";

const LandingPage = ({ state, connectToMetaMask }) => {
  return (
    <div className="box-signin-btn">
      <h1>MetaMask 연결 및 토큰 전송</h1>
      <p>내 주소: {state.currentAccounts}</p>
      <p>잔액: {state.ethereumBalance} </p>
      <button onClick={connectToMetaMask}>
        <img src={Fox} />
        Sign in MetaMask
      </button>
    </div>
  );
};

export default LandingPage;
