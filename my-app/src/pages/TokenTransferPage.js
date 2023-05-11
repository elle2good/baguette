import React from "react";

const TokenTransferPage = ({ state, transferToken }) => {
  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>
      <h2>토큰 전송</h2>
      <input
        type="text"
        value={state.sendTo}
        onChange={(e) => this.setState({ sendTo: e.target.value })}
        placeholder="받는 주소"
      />
      <input
        type="text"
        value={state.sendAmount}
        onChange={(e) => this.setState({ sendAmount: e.target.value })}
        placeholder="토큰 전송량"
      />
      <button onClick={() => transferToken(state.sendTo, state.sendAmount)}>
        토큰 전송
      </button>
    </div>
  );
};

export default TokenTransferPage;
