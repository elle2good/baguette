import React, { useEffect, useState } from "react";

// import Img
import baguetteImg from "../images/img_baguette.png";
import Fox from "../images/lg_metamask.png";
import baguetteCharImg from "../images/img_baguette_character.png";
import breadCrumbTrailImg from "../images/img_breadcrumb_trail.png";
import levelCroutonsImg from "../images/img_level_croutons.png";
import levelBaguetteImg from "../images/img_level_baguette.png";
import levelGarlicBreadImg from "../images/img_level_garlic_bread.png";
import levelBruschettaImg from "../images/img_level_bruschetta.png";
import levelSandwichesImg from "../images/img_level_sandwiches.png";
import levelCanapesImg from "../images/img_level_canapes.png";

const LandingPage = ({
  state,
  connectToMetaMask,
  fetchImageMetadata,
  fTokenBalanceOf,
  addTokenToMetaMask,
  fNickname,
}) => {
  const [tokenBalance, setTokenBalance] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (state.currentAccounts && state.currentAccounts.length > 0) {
      fetchImageMetadata();
      fTokenBalanceOf().then((balance) => setTokenBalance(balance));

      const fetchNickname = async () => {
        const nickname = await fNickname();
        setNickname(nickname);
      };

      fetchNickname();
    }
  }, [state.currentAccounts]);

  const handleNicknameClick = () => {
    alert(`Hello, ${nickname}!`);
  };

  return (
    <div className="box-landing">
      {/* <p>내 주소: {state.currentAccounts}</p> */}
      <div id="boxMain" className="box-main">
        <p>
          Amplify your impact.
          <br />
          Earn Rewards.
        </p>
        <p className="txt-main">Make a Difference.</p>
        <img src={baguetteImg} alt="baguette image" />
        <p className="txt-main-sub">
          By connecting communities and impact leaders closely and transparently
          with blockchain, Baguette aims to streamline community trust and
          funding for individuals and and small organizations that want to make
          a difference.
        </p>
      </div>
      <button className="btn-signin" onClick={connectToMetaMask}>
        Sign in with MetaMask
        <img src={Fox} alt="metamask logo" />
      </button>
      <div className="box-about">
        <p className="txt-about-title">Our vision:</p>
        <p className="txt-about-sub">
          We dream of a world where stepping up for social impact is as easy and
          fun as a get-together with friends. Where anyone, anytime, can become
          a leader creating ripples of positive change through accessible,
          rewarding, and enjoyable community involvement.
        </p>
        <p className="txt-about-title">What is Baguette?</p>
        <p className="txt-about-sub">
          Baguette is a rewards-based SocialFi app to streamline impact
          activities for individuals and small organizations.
        </p>
        <ul className="txt-about-list">
          <li>• Rewards based on community votes</li>
          <li>• Visibility and funding for new climate leaders</li>
          <li>• Fortifying communities with offline activities</li>
          <li>• Permanent proof of kindness and care</li>
        </ul>
        <p className="txt-about-sub">
          Baguette literally rewards individuals and organization for engaging
          in third-sector activities and provides permanent proof of work.
          Received rewards can be used to build more social impact, or simply to
          have fun in online and offline recreations. Donations can be accepted
          in small amounts with low transaction fees as means for individuals or
          small organizations to bootstrap impact. Permanent proof of work on a
          blockchain enables more trust towards yet-established organizations
          and provides easier access to records for volunteers.
        </p>
      </div>
      <div className="box-works">
        <img src={baguetteCharImg} alt="baguette Character" />
        <p className="txt-works-title">How it works:</p>
        <p className="txt-works-subtitle">Gatherings</p>
        <p className="txt-works-sub">
          Environmentally and social impact activities where communities come
          together. Lead by users of Baguette. Gatherings include, but are not
          restricted to;
        </p>
        <ul className="txt-works-list">
          <li>• Volunteerism</li>
          <li>• Circular economy</li>
          <li>• Philanthropy</li>
          <li>• Climate positivity</li>
        </ul>
        <p className="txt-works-sub">
          All Sandwiches and the list of attendants are posted on a Blockchain
          for transparent and secure storage.
        </p>
        <img
          className="img-breadcrumb"
          src={breadCrumbTrailImg}
          alt="breadcrumb trail image"
        />
        <p className="txt-works-subtitle">Breadcrumb Trail</p>
        <p className="txt-works-sub">
          Post media about the impact you’ve made on the Breadcrumb Trail to
          receive Crumbs. The post goes through a community voting system, and
          the highest ranked posts will receive rewards.
        </p>
        <p className="txt-works-subtitle">Crumbs</p>
        <p className="txt-works-sub">
          Tokens in the Baguette ecosystem. Crumbs are not just a
          cryptocurrency, but it is a symbol of commitment to the well-being of
          our society and environment.
        </p>
        <ul className="txt-works-list">
          <li>• Crumbs are rewarded to the leaders of a Gathering by their,</li>
          <li className="txt-works-list-2nd">
            • Community impact (eg. number of participants that successfully
            completed the gathering)
          </li>
          <li className="txt-works-list-2nd">
            • Social impact (eg. number of users that support the cause)
          </li>
          <li className="txt-works-list-2nd">
            • Environmental impact (achieved carbon reduction from the
            gathering)
          </li>
          <li>
            • Crumbs are rewarded to any user if their posts on the Breadcrumb
            Trail is voted and ranked as recognizable impact by other users.
          </li>
        </ul>
        <p className="txt-works-sub">
          Crumbs can be sent and received as donations in between users that
          support the same cause.
        </p>
        <p className="txt-works-subtitle">Bakeshop (Coming soon)</p>
        <p className="txt-works-sub">
          An NFT Marketplace that sells Art & Utility NFT with proceeds going to
          a social or environmental cause.
        </p>
        <div className="box-level">
          <p className="txt-level-title">Levels</p>
          <div className="box-level-description box-level-sky">
            <img
              className="img-level-croutons"
              src={levelCroutonsImg}
              alt="img-level-croutons"
            />
            <div>
              <p>Croutons:</p>
              <p>Comming Soon</p>
            </div>
          </div>
          <div className="box-level-description box-level-brown-line">
            <img
              className="img-level-baguette"
              src={levelBaguetteImg}
              alt="img-level-baguette"
            />
            <div>
              <p>Baguette:</p>
              <p>Comming Soon</p>
            </div>
          </div>
          <div className="box-level-description box-level-brown">
            <img
              className="img-level-garlic-bread"
              src={levelGarlicBreadImg}
              alt="img-level-garlic-bread"
            />
            <div>
              <p>Garlic Bread:</p>
              <p>Comming Soon</p>
            </div>
          </div>
          <div className="box-level-description box-level-pink">
            <img
              className="img-level-bruschetta"
              src={levelBruschettaImg}
              alt="img-level-bruschetta"
            />
            <div>
              <p>Bruschetta:</p>
              <p>Comming Soon</p>
            </div>
          </div>
          <div className="box-level-description box-level-sky">
            <img
              className="img-level-sandwiches"
              src={levelSandwichesImg}
              alt="img-level-sandwiches"
            />
            <div>
              <p>Sandwiches:</p>
              <p>Comming Soon</p>
            </div>
          </div>
          <div className="box-level-description box-level-brown-line">
            <img
              className="img-level-canapes"
              src={levelCanapesImg}
              alt="img-level-canapes"
            />
            <div>
              <p>Canapes:</p>
              <p>Comming Soon</p>
            </div>
          </div>
        </div>
        <button className="btn-works-more">Learn more</button>
      </div>
      {/* <p>잔액: {parseFloat(state.ethereumBalance).toFixed(4)} ETH</p>
      <p>토큰 잔액 ≈ {tokenBalance} CRB</p>
      <p onClick={handleNicknameClick}>닉네임: {nickname}</p>
      <button onClick={addTokenToMetaMask}>토큰 추가</button>
      {state.imageUrl && (
        <div>
          <p>이미지:</p>
          <img src={state.imageUrl} alt="NFT 이미지" />
        </div>
      )} */}
    </div>
  );
};

export default LandingPage;
