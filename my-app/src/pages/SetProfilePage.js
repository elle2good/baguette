import React, { useEffect } from "react"; // useState를 제거했습니다.
import { useNavigate } from "react-router-dom";

const SetProfilePage = ({
  state,
  connectToMetaMask,
  fetchImageMetadata,
  fMintByETH,
}) => {
  const navigate = useNavigate();

  // useState 코드를 제거했습니다.

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
      }
      // else if 코드를 제거했습니다.
    };

    initialize();
  }, [connectToMetaMask, fetchImageMetadata, state.imageUrl]); // nickname를 종속성 배열에서 제거했습니다.

  // handleNicknameChange 함수를 제거했습니다.

  const handleButtonClick = async () => {
    const nickname = document.getElementById("inputNickname").value;
    if (!nickname) {
      alert("Please set your nickname first!");
    } else {
      await fMintByETH(nickname);
    }
  };

  return (
    <div className="box-set-profile">
      {state.imageUrl ? (
        <div className="box-nft-profile">
          <img src={state.imageUrl} alt="NFT 이미지" />
        </div>
      ) : (
        <button onClick={handleButtonClick} className="btn-nft-mint">
          Get NFT profile
        </button>
      )}
      <label htmlFor="inputNickname" className="label-nickname">
        Nickname
      </label>
      <input
        type="text"
        id="inputNickname"
        className="input-nickname"
        placeholder="About 6 Korean or 20 English characters"
        // onChange 핸들러를 제거했습니다.
      />
      <button className="btn-profile-save" onClick={goToProfile}>
        Save
      </button>
    </div>
  );
};

export default SetProfilePage;
