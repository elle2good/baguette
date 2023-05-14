import React, { useEffect, useState } from "react";

const FTMintPage = ({
  state,
  connectToMetaMask,
  fMintByETH_FT,
  fBalanceOf,
  fCheckAndClaimGoodToken,
}) => {
  const [VMintByETH_FT, setVMintByETH_FT] = useState("");
  const [VBalanceOf, setVBalanceOf] = useState("");
  const [VCheckAndClaimGoodToken, setVCheckAndClaimGoodToken] = useState("");
  const [balanceOfResult, setBalanceOfResult] = useState("");

  useEffect(() => {
    connectToMetaMask();
  }, [connectToMetaMask]);

  const handleBalanceOf = async (value) => {
    const result = await fBalanceOf(value);
    setBalanceOfResult(result.toString());
  };

  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>
      <input
        type="text"
        value={VMintByETH_FT}
        onChange={(e) => setVMintByETH_FT(e.target.value)}
        placeholder="1155 nft 민팅"
      />
      <button onClick={() => fMintByETH_FT(VMintByETH_FT)}>
        1155 nft 민팅 1번부터 4번까지 번호 넣기
      </button>
      <br />
      <br />
      <input
        type="text"
        value={VBalanceOf}
        onChange={(e) => setVBalanceOf(e.target.value)}
        placeholder="이건 내가 몇개 ERC1155 있는지 확인하는곳"
      />
      <button onClick={() => handleBalanceOf(VBalanceOf)}>
        이건 내가 몇개 ERC1155 있는지 확인하는곳
      </button>
      <p>ERC1155 토큰 수량: {balanceOfResult}</p>
      <br />
      <br />
      <input
        type="text"
        value={VCheckAndClaimGoodToken}
        onChange={(e) => setVCheckAndClaimGoodToken(e.target.value)}
        placeholder="심사 후 클레임 (나의 보트 번호 넣는곳)"
      />
      <button onClick={() => fCheckAndClaimGoodToken(VCheckAndClaimGoodToken)}>
        클레임 받기
      </button>
    </div>
  );
};

export default FTMintPage;
