import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SetProfilePage = ({ state, connectToMetaMask, fetchImageMetadata, fMintByETH }) => {
  const navigate = useNavigate();

  // Profile 이동
  const goToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const initialize = async () => {
      await connectToMetaMask();
      const fetchedImageUrl = fetchImageMetadata();
      const real = await fetchedImageUrl;
      if (real) {
        state.imageUrl = fetchedImageUrl;
      } else if (!state.imageUrl) {
        await fMintByETH();
        //const newFetchedImageUrl = await fetchImageMetadata();
        //if (newFetchedImageUrl) {
        //  state.imageUrl = newFetchedImageUrl;
        //}
      }
    };

    initialize();
  }, [connectToMetaMask, fetchImageMetadata, fMintByETH, state.imageUrl]);



  return (
    <div className="box-set-profile">
      {state.imageUrl ? (
        <div className="box-nft-profile">
          <img src={state.imageUrl} alt="NFT 이미지" />
        </div>
      ) : (
        <button onClick={fMintByETH} className="btn-nft-mint">
          Get NFT profile
        </button>
      )}
      {/* 닉네임 설정 */}
      <label htmlFor="inputNickname" className="label-nickname">
        Nickname
      </label>
      <input
        type="text"
        id="inputNickname"
        className="input-nickname"
        placeholder="About 6 Korean or 20 English characters"
      />
      <button className="btn-profile-save" onClick={goToProfile}>
        Save
      </button>
    </div>
  );
};

export default SetProfilePage;
