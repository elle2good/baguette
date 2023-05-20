import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import imgProfileBg from "../images/img_profile_bg.png";
import imglevelGarlicBread from "../images/img_level_garlic_bread.png";

// 이미지 업로드
import ImagesUpload from "react-images-upload";
import axios from "axios";

const ProfilePage = ({ state }) => {
  const navigate = useNavigate();

  //////////////////
  // Image Upload //
  //////////////////
  const dbUrl = process.env.REACT_APP_DB_CONNECT;

  const [images, setImages] = useState([]);

  const onDrop = (files) => {
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // 이미지 파일들을 formData에 추가
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      console.log("jere", dbUrl);
      const response = await axios.post(dbUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message);
      // 서버 응답에 대한 처리 추가
    } catch (error) {
      console.error("Failed to upload image:", error);
      // 에러 처리 추가
    }
  };

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
        <div>
          <ImagesUpload
            className="images-preview"
            onChange={onDrop}
            imgExtension={[".jpg", ".png", ".gif", ".jpeg"]}
            maxFileSize={5242880}
          />
          <div className="image-list">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                {/* <img src={URL.createObjectURL(image)} alt="uploaded" /> */}
                <button onClick={() => removeImage(index)}>Remove</button>
              </div>
            ))}
          </div>
          <button onClick={uploadImage}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
