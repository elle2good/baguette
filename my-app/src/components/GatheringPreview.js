import React from "react";
import { useNavigate } from "react-router-dom";

const GatheringPreview = ({ gatherList }) => {
  const navigate = useNavigate();
  const goToGathering = () => {
    navigate(`/gatherings/${gatherList.id}`);
    console.log(gatherList);
  };

  return (
    <div>
      <div>{gatherList.title}</div>
      <div>
        {gatherList.sDate} ~ {gatherList.eDate}
      </div>
      <div>
        <button onClick={goToGathering}>Details</button>
      </div>
    </div>
  );
};

export default GatheringPreview;
