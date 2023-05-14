import React, { useEffect } from "react";

const NFTTeamMintPage = ({ state, connectToMetaMask, fTeamMint }) => {

  useEffect(() => {
    connectToMetaMask();
  }, [connectToMetaMask]);

  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>
      <h2>프로필 NFT 구매</h2>
      <h3>
        프로필은 아이디당 단 1번 1개만 구입이 가능합니다. 본인의 아이디를 다른
        사람에게 trnasfer 한 뒤에도 구입이 불가합니다.
      </h3>
      <button onClick={() => fTeamMint()}>팀 NFT 구매</button>
    </div>
  );
};

export default NFTTeamMintPage;
