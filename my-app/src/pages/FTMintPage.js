import React from "react";

const FTMintPage = ({
  state,
  fMintByETH_FT,
  fBalanceOf,
  fCheckAndClaimGoodToken,
}) => {
  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>{" "}
      <input
        type="text"
        value={state.VMintByETH_FT}
        onChange={(e) => this.setState({ VMintByETH_FT: e.target.value })}
        placeholder="1155 nft 민팅"
      />
      <button onClick={() => fMintByETH_FT(state.VMintByETH_FT)}>
        1155 nft 민팅 1번부터 4번까지 번호 넣기
      </button>
      <br />
      <br />
      <input
        type="text"
        value={state.VBalanceOf}
        onChange={(e) => this.setState({ VBalanceOf: e.target.value })}
        placeholder="이건 내가 몇개 ERC1155 있는지 확인하는곳"
      />
      <button onClick={() => fBalanceOf(state.VBalanceOf)}>
        이건 내가 몇개 ERC1155 있는지 확인하는곳
      </button>
      <br />
      <br />
      <input
        type="text"
        value={state.VCheckAndClaimGoodToken}
        onChange={(e) =>
          this.setState({ VCheckAndClaimGoodToken: e.target.value })
        }
        placeholder="심사 후 클레임 (나의 보트 번호 넣는곳)"
      />
      <button
        onClick={() => fCheckAndClaimGoodToken(state.VCheckAndClaimGoodToken)}
      >
        클레임 받기
      </button>
    </div>
  );
};

export default FTMintPage;
