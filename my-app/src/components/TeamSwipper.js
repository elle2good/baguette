import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";

// import images
import teamBImg from "../images/img_team_b.png";
import teamEImg from "../images/img_team_e.png";
import teamLImg from "../images/img_team_l.png";
import teamRImg from "../images/img_team_r.png";
import teamSImg from "../images/img_team_s.png";

const TeamSwipper = () => {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="swiper-team"
      >
        <SwiperSlide>
          <img src={teamEImg} alt="team-img" />
          <p className="txt-team-name">Elisabeth Kim</p>
          <p className="txt-team-description">
            Founder, Project Manager
            <br />
            Keytalk AI, Volunteer Korea (NGO)
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={teamSImg} alt="team-img" />
          <p className="txt-team-name">Sueun Cho</p>
          <p className="txt-team-description">
            Tech Lead, Full-Stack Developer
            <br />
            Student at University of Maryland, Gomz Club (NFT Donation Project),
            B&G Systems Co. LTD
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={teamBImg} alt="team-img" />
          <p className="txt-team-name">Eunbeen Jung</p>
          <p className="txt-team-description">
            Full-Stack Developer
            <br />
            3+ years of UX/UI Design
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={teamRImg} alt="team-img" />
          <p className="txt-team-name">Kyeongrok Kwak</p>
          <p className="txt-team-description">
            Back-end Developer
            <br />
            Four Seasons, Shilla Hotel & Resorts
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={teamLImg} alt="team-img" />
          <p className="txt-team-name">Lily Kim</p>
          <p className="txt-team-description">
            Designer
            <br />
            5+ years experience, SojuDAO
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={teamLImg} alt="team-img" />
          <p className="txt-team-name">Prince Akpeki</p>
          <p className="txt-team-description">
            Friend, Support, Advisor
            <br />
            SojuDAO
          </p>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default TeamSwipper;
