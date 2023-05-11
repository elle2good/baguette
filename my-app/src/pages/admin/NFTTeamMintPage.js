import React from "react";

const NFTTeamMintPage = ({ fTeamMint }) => {
  return (
    <div>
      {" "}
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
