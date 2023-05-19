import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const GatheringProfilePage = () => {

    const [gatheringDetail, setGatheringDetail] = useState(null);
    let { id } = useParams();
    const getGatheringDetail = async () => {
        let url = `http://localhost:3004/locations/${id}`;
        let res = await fetch(url);
        let data = await res.json();
        setGatheringDetail(data);
    }

    useEffect(() => {
        getGatheringDetail();
    })
    return (
        <div>
            <div className='profile_details'>
                <div className='header_active'>Gathering Details</div>
                <div>{gatheringDetail?.title}</div>
                <div><img src={gatheringDetail?.img} alt="이미지" /></div>
                <div>{gatheringDetail?.sTime} ~ {gatheringDetail?.eTime}/{gatheringDetail?.sDate} ~ {gatheringDetail?.eDate}</div>
                <div>{gatheringDetail?.location}</div>
                <div>{gatheringDetail?.organization}</div>
                <div>{gatheringDetail?.description}</div>
                <button>start</button>
            </div>
        </div>
    )
}
export default GatheringProfilePage