import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ state }) => {
  const navigate = useNavigate();

  // Profile 이동
  const goToProfile = () => {
    if (!state.imageUrl) {
      alert("Buy NFT");
    } else {
      navigate("/profile");
    }
  };

  // 여기에서 return 문을 통해 어떤 UI를 렌더링할지 결정해야 합니다.
  // 예시:
  return (
    <div>
      <button onClick={goToProfile}>Go to profile</button>
    </div>
  );
};

export default ProfilePage;
