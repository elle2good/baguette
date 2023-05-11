import React from "react";

const ExchangeTokenPage = ({ state, fExchangeTokens }) => {
  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>
      <input
        type="text"
        value={state.VExchangeEther}
        onChange={(e) => this.setState({ VExchangeEther: e.target.value })}
        placeholder="exchange ether"
      />
      {/*<button onClick={() => this.fBalanceOf(this.state.VExchangeEther)}>exchange ether</button>*/}

      <br />
      <br />
      <br />

      <input
        type="text"
        value={state.VExchangeTokens}
        onChange={(e) => this.setState({ VExchangeTokens: e.target.value })}
        placeholder="exchange token"
      />
      <button onClick={() => fExchangeTokens(state.VExchangeTokens)}>
        exchange token
      </button>
    </div>
  );
};

export default ExchangeTokenPage;
