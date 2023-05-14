import React, { useState, useEffect } from "react";

const ETHTransferPage = ({ state, connectToMetaMask, transferETH }) => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [transferValue, setTransferValue] = useState("");

  useEffect(() => {
    connectToMetaMask();
  }, [connectToMetaMask]);
  
  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p> {/* 내 주소 표시 */}
      <h2>이더 전송</h2>
      <input
        type="text"
        value={receiverAddress}
        onChange={(e) => {
          console.log("Input value:", e.target.value);
          setReceiverAddress(e.target.value);
        }}
        placeholder="받는 주소"
      />
      <input
        type="number"
        value={transferValue}
        onChange={(e) => setTransferValue(e.target.value)}
        placeholder="이더 전송량"
      />
      <button onClick={() => transferETH(receiverAddress, transferValue)}>
        이더 전송
      </button>
    </div>
  );
};

export default ETHTransferPage;
