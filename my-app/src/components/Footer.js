import React, { useState } from "react";

import lgBaguette from "../images/lg_baguette.png";
import icInsta from "../images/ic_insta.png";
import icTwitter from "../images/ic_twitter.png";
import icTelegram from "../images/ic_telegram.png";

const Footer = () => {
  return (
    <div className="box-footer">
      <div className="box-footer-left">
        <img src={lgBaguette} alt="lg-baguette" />
        <div className="box-footer-sns">
          <button>
            <img src={icInsta} alt="ic-insta" />
          </button>
          <button>
            <img src={icTwitter} alt="ic-twitter" />
          </button>
          <button>
            <img src={icTelegram} alt="ic-telegram" />
          </button>
        </div>
      </div>
      <div className="box-footer-right">
        <span>baguettes.io</span>
        <span>contact@baguettes.io</span>
      </div>
    </div>
  );
};

export default Footer;
