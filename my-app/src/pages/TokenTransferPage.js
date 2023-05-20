import React, { useState, useEffect } from "react";

const TokenTransferPage = ({ state, connectToMetaMask, transferToken }) => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [transferValue, setTransferValue] = useState("");

  useEffect(() => {
    connectToMetaMask();
  }, [connectToMetaMask]);

  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>
      <h2>토큰 전송</h2>
      <input
        type="text"
        value={receiverAddress}
        onChange={(e) => setReceiverAddress(e.target.value)}
        placeholder="받는 주소"
      />
      <input
        type="text"
        value={transferValue}
        onChange={(e) => setTransferValue(e.target.value)}
        placeholder="토큰 전송량"
      />
      <button onClick={() => transferToken(receiverAddress, transferValue)}>
        토큰 전송
      </button>
    </div>
  );
};

export default TokenTransferPage;
