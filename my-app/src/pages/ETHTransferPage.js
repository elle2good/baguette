import React from "react";

const ETHTransferPage = ({ state, transferETH }) => {
  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>
      <h2>이더 전송</h2>
      <input
        type="text"
        value={state.receiverAddress}
        //인풋 될때마다 setState 업데이트 됩니다. 1을 치면 1, 즉, 123을 치면 1,12,123 으로 업데이트 됩니다.
        onChange={(e) => {
          console.log("Input value:", e.target.value);
          this.setState({ receiverAddress: e.target.value });
        }}
        placeholder="받는 주소"
      />
      <input
        type="number"
        value={state.transferValue}
        onChange={(e) => this.setState({ transferValue: e.target.value })}
        placeholder="이더 전송량"
      />
      <button
        onClick={() => transferETH(state.receiverAddress, state.transferValue)}
      >
        이더 전송
      </button>
    </div>
  );
};

export default ETHTransferPage;
