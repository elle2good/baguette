import React, { useState } from "react";

const ETHTransferPage = ({ transferETH }) => {
  const [currentAccounts, setCurrentAccounts] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [transferValue, setTransferValue] = useState("");

  return (
    <div>
      <p>내 주소: {currentAccounts}</p>
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
