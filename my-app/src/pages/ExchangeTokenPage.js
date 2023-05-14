import React, { useEffect, useState } from "react";

const ExchangeTokenPage = ({ state, connectToMetaMask, fExchangeTokens }) => {
  const [VExchangeEther, setVExchangeEther] = useState("");
  const [VExchangeTokens, setVExchangeTokens] = useState("");

  useEffect(() => {
    connectToMetaMask();
  }, [connectToMetaMask]);

  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>
      <input
        type="text"
        value={VExchangeEther}
        onChange={(e) => setVExchangeEther(e.target.value)}
        placeholder="exchange ether"
      />
      <br />
      <br />
      <br />

      <input
        type="text"
        value={VExchangeTokens}
        onChange={(e) => setVExchangeTokens(e.target.value)}
        placeholder="exchange token"
      />
      <button onClick={() => fExchangeTokens(VExchangeTokens)}>
        exchange token
      </button>
    </div>
  );
};

export default ExchangeTokenPage;
