import React, { useEffect, useState } from "react";

const ExchangeTokenPage = ({ state, connectToMetaMask, fExchangeEther }) => {
  const [VExchangeTokens, setVExchangeTokens] = useState("");

  useEffect(() => {
    connectToMetaMask();
  }, [connectToMetaMask]);

  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>

      <input
        type="text"
        value={VExchangeTokens}
        onChange={(e) => setVExchangeTokens(e.target.value)}
        placeholder="exchange token"
      />
      <button onClick={() => fExchangeEther(VExchangeTokens)}>
        exchange token
      </button>
    </div>
  );
};

export default ExchangeTokenPage;
