import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import imgProfileBg from "../images/img_profile_bg.png";
import imglevelGarlicBread from "../images/img_level_garlic_bread.png";

const ProfilePage = ({ state }) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!state.imageUrl) {
  //     alert("Buy NFT");
  //     navigate("/set_profile");
  //   } else {
  //     navigate("/profile");
  //   }
  // }, [state]);

  // 여기에서 return 문을 통해 어떤 UI를 렌더링할지 결정해야 합니다.
  // 예시:
  return (
    <div>
      <div className="box-profile">
        <div className="box-profile-img">
          <img
            className="img-profile-bg"
            src={imgProfileBg}
            alt="img-profile-bg"
          />
          <div className="img-profile-nft">NFT Image</div>
        </div>
        <div className="box-profile-info">
          <p className="txt-profile-info">Nickname</p>
          <p className="txt-profile-info">
            Crouton Level: <span>Garlic Bread</span>
            <div className="bg-profile-level">
              <img src={imglevelGarlicBread} alt="level-img" />
            </div>
          </p>
        </div>
        <div className="box-balance">
          <p className="txt-balance">
            My MATIC Balance: <span>000</span>
          </p>
          <p className="txt-balance">
            My CRB Balance: <span>000</span>
          </p>
          <button className="btn-balance-exchange">Exchange</button>
          <button className="btn-balance-transfer">Send</button>
        </div>
        <div className="box-breadcrumb-img">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
