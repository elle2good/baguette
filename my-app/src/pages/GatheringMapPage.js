import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import GatheringPreview from "../components/GatheringPreview";

const GatheringMapPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // 현재위치 찍기
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  const [map, setMap] = useState(null);

  const [selectedPlace, setSelectedPlace] = useState(null);

  const [markers, setMarkers] = useState([]);
  const [blinking, setBlinking] = useState(true);

  const fetchMarkers = async () => {
    let url = `http://localhost:3004/locations`;
    let res = await fetch(url);
    let data = await res.json();
    setMarkers(data);
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlinking((prevBlinking) => !prevBlinking);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (map && selectedPlace) {
      const center = new window.google.maps.LatLng(
        selectedPlace.lat(),
        selectedPlace.lng()
      );
      map.panTo(center);
    }
  }, [map, selectedPlace]);

  useEffect(() => {
    if (map && currentLocation) {
      const center = new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      );
      map.panTo(center);
    }
  }, [map, currentLocation]);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = async (map) => {
    const bounds = await new window.google.maps.LatLngBounds();
    markers.forEach(({ lat, lon }) =>
      bounds.extend(new window.google.maps.LatLng(lat, lon))
    );
    map.fitBounds(bounds);
    setMap(map);
  };
  return (
    <div>
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "500px", height: "85vh" }}
        zoom={20}
      >
        <Autocomplete
          apiKey={process.env.REACT_APP_MAP_API}
          onPlaceSelected={(place) => {
            setSelectedPlace(place.geometry.location);
          }}
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            placeholder: `search`,
            backgroundColor: `#CCCCCC`,
            placeContent: `Search`,
            width: `350px`,
            height: `50px`,
            padding: `0 12px`,
            borderRadius: `10px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "23%",
            marginLeft: "-40px",
            marginTop: "70px",
            zIndex: "1",
          }}
        ></Autocomplete>
        {currentLocation && (
          <Marker
            center={currentLocation}
            position={currentLocation}
            zoom={20}
            // icon={{
            //     path: "M10 20c5.5 0 10-4.5 10-10S15.5 0 10 0 0 4.5 0 10s4.5 10 10 10z",
            //     strokeWeight: 3,
            //     strokeColor: "#0099FF",
            //     fillColor: blinking ? "#0000ff" : "transparent",
            //     fillOpacity: blinking ? 0.7 : 0,
            //     scale: 0.6,
            // }}
          />
        )}
        {markers.map((gatherList) => (
          <Marker
            key={gatherList.id}
            position={{ lat: gatherList.lat, lng: gatherList.lng }}
            onClick={() => handleActiveMarker(gatherList.id)}
            icon={{
              path: "M10 20c5.5 0 10-4.5 10-10S15.5 0 10 0 0 4.5 0 10s4.5 10 10 10z",
              strokeWeight: 3,
              strokeColor: "#0099FF",
              fillColor: blinking ? "#0000ff" : "transparent",
              fillOpacity: blinking ? 0.7 : 0,
              scale: 0.6,
            }}
          >
            {activeMarker === gatherList.id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <GatheringPreview gatherList={gatherList} />
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default GatheringMapPage;
