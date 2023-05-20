import React, { useEffect, useState } from "react";
import GatheringMapPage from "./GatheringMapPage";
import GatheringProfilePage from "./GatheringProfilePage";
import { useLoadScript } from "@react-google-maps/api";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Routes, Route } from "react-router";

///////////////////
// place library //
///////////////////
const placesLibrary = ["places"];

const GatheringsPage = () => {
  const [id, setId] = useState("");

  const handleChange = (e) => {
    setId(e.target.value);
  };

  // 구글맵 로드 (api키), 라이브러리
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API, // Add your API key
    libraries: placesLibrary,
  });

  return isLoaded ? (
    <Wrapper apiKey={process.env.REACT_APP_MAP_API}>
      <Routes>
        <Route path="/" element={isLoaded && <GatheringMapPage />} />
        <Route path="/:id" element={<GatheringProfilePage />} />
      </Routes>
    </Wrapper>
  ) : null;
};

export default GatheringsPage;
