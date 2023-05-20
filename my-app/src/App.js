//!!READ COPYRIGHT!!
/**
 * 
 * Copyright © 2023 Sueun Cho
    All rights reserved.
    No part of this blockchain code, whether it be the source code, object code, or any derivative works thereof, may be reproduced, distributed, transmitted, displayed, published or broadcast, in whole or part, in any form, electronic or mechanical, photocopying, recording, scanning or any information storage and retrieval system now known or to be invented in future, without the prior written permission of the copyright owner, Sueun Cho.
    Unauthorized use and/or duplication of this material without express and written permission from this code's author and/or owner is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to Sueun Cho with appropriate and specific direction to the original content.
    The blockchain code is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the code or the use or other dealings in the code.
    Information in this blockchain code is subject to change without notice. Other products and companies referred to herein are trademarks or registered trademarks of their respective companies or mark holders.
    For permissions requests, write to the author, at the address below:
    Sueun Cho
    sueun.dev@gmail.com
 */

/**
 * Baguette
 * @leader Elisabeth Kim
 * @developer Sueun Cho, Rok Kwak, Eunbeen Jung
 * @artist Lily
 * @date 2023-05-12
 * @description Baguette Eco Company
 * @version 2.7.0
 * @company baguette
 */

////////////////////
// React and Web3 //
////////////////////
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Web3 from "web3";

////////////////////////
// Smart Contract ABI //
////////////////////////
import ERC20 from "./abi/ERC20.json";
import ERC721 from "./abi/ERC721.json";
import ERC1155 from "./abi/ERC1155.json";
import Reward from "./abi/Reward.json";

/////////////////
// Page import //
/////////////////
import LandingPage from "./pages/LandingPage";
import BreadcrumbTrailPage from "./pages/BreadcrumbTrailPage";
import GatheringsPage from "./pages/GatheringsPage";
import ProfilePage from "./pages/ProfilePage";
import SetProfilePage from "./pages/SetProfilePage";
// 삭제 예정
import VotePage from "./pages/VotePage";
import FTMintPage from "./pages/FTMintPage";
import NFTMintPage from "./pages/NFTMintPage";
import ETHTransferPage from "./pages/ETHTransferPage";
import TokenTransferPage from "./pages/TokenTransferPage";
import ControllerPage from "./pages/admin/ControllerPage";
import ExchangeTokenPage from "./pages/ExchangeTokenPage";
import NFTTeamMintPage from "./pages/admin/NFTTeamMintPage";

//////////////////////
// Component import //
//////////////////////
import Nav from "./components/Nav";
import Footer from "./components/Footer";

/////////
// CSS //
/////////
import "./App.css";

///////////////
// App Class //
///////////////
class App extends Component {
  state = {
    web3: null, //Info of Web3
    currentAccounts: null, //Current accounts
    //Smart contract accounts < change to zkEvm
    ERC20contractAddress: "0x1B8a1215ae41D37d01CcC7E36aB64EA43E9F12B8",
    ERC721contractAddress: "0xA2540ea136f6F91D553bA744Cff9E1585681CC16",
    ERC1155contractAddress: "0x675fC7622953961E45F4Ff17d82680A0Aad6C6A9",
    rewardContractAddress: "0xc3329E0B0099A6C29957e5bE5C39FfD199C7aE1C",
    ethereumBalance: "", //Ethereum balance
    receiverAddress: "", // Address to receive Ethereum
    transferValue: "", //Transfer amounts of Ethereum
    sendTo: "",
    sendAmount: "",
    toMintPrice: 0,
    imageUrl: "", //Image Url
    VAddController: "", //Add controller
    VRemoveController: "", //Remove controller
    VMintByETH_FT: "",
    VBalanceOf: "",
    VCheckAndClaimGoodToken: "",
    VExchangeEther: "",
    VExchangeTokens: "",
    VStartVote: "",
    VVoteId: "",
    VVoteIs: "",
    VVotes_view: "",
    voteData: [],
    currentPage: 0, //Vote page
  };

  //web3
  getWeb3 = () => {
    return this.state.web3;
  };

  //컨트랙트의 기본요소를 가져옵니다.
  getTokenContract = (ABI, contractAddress) => {
    const web3 = this.getWeb3();
    return new web3.eth.Contract(ABI, contractAddress);
  };

  //시작함수
  async componentDidMount() {
    //await this.connectToMetaMask();
    this.setupAccountsChangedEventListener();
    this.setupNetworkChangedEventListener();
    this.fetchImageMetadata();
  }

  //handlePageChange는 VotePage.js에서 투표 페이지를 보여줌
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    console.log(page);
  };

  //account가 변경되었을때 작동합니다.
  setupAccountsChangedEventListener = () => {
    window.ethereum.on("accountsChanged", async () => {
      await this.handleAccountChanged();
    });
  };

  //network가 변경되었을때 작동합니다.
  setupNetworkChangedEventListener = () => {
    window.ethereum.on("networkChanged", async () => {
      await this.handleNetworkChanged();
    });
  };

  // MetaMask 계정 연결 요청
  requestAccounts = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  // Web3 인스턴스 생성
  createWeb3Instance = async () => {
    const web3 = new Web3(window.ethereum);
    this.setState({ web3 });
    return web3;
  };

  // 현재 MetaMask 연결된 계정 가져오기
  getAccounts = async (web3) => {
    const currentAccounts = await web3.eth.getAccounts();
    this.setState({ currentAccounts });

    return currentAccounts;
  };

  // 현재 MetaMask 연결된 계정 가져오기
  getEthBalance = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    const balanceWei = await web3.eth.getBalance(accounts[0]);
    const balanceEther = web3.utils.fromWei(balanceWei, "ether");

    this.setState({ currentAccountsBalance: balanceEther });

    return balanceEther;
  };

  //MetaMask 계정 변경 이벤트 핸들링
  handleAccountChanged = async () => {
    const web3 = await this.createWeb3Instance();
    const accounts = await this.getAccounts(web3);

    this.setState({ ethereumBalance: 0 });
    const balance = await this.getEthBalance(web3);

    this.setState({ currentAccounts: accounts, ethereumBalance: balance });
  };

  handleNetworkChanged = async () => {
    await this.handleAccountChanged();
  };

  //Check MetaMask install 메타마스크가 연결할수 있는 조건인지 확인
  checkMetaMaskInstallation = async () => {
    if (typeof window.ethereum === "undefined") {
      alert(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
      return false;
    }
    return true;
  };

  //Connect MetaMask 커넥트 메타마스크 버튼을 눌러서 작동되는 함수
  connectToMetaMask = async () => {
    if (await this.checkMetaMaskInstallation()) {
      try {
        this.setState({ currentAccounts: null });

        await this.requestAccounts();
        await this.createWeb3Instance();
        await this.handleAccountChanged();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  //Send Transcation -> 쉽게 생각해서 메타마스크 화면 여는거 (이더 보낼꺼냐 아니면 스마트 컨트랙트 작동 시킬꺼냐)
  sendTransaction = async (from, to, data, value) => {
    const web3 = this.getWeb3();
    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from,
            to,
            data,
            value: value
              ? web3.utils.toHex(web3.utils.toWei(value))
              : undefined,
          },
          console.log(value),
        ],
      });
      console.log(value);
      alert("Transaction successful!");
    } catch (e) {
      alert("Oops! Transaction failed!");
    }
  };

  //이더리움 전송 ()매개변수에는 to - 보낼사람, value - 양 (wei, eth)
  transferETH = async (to, value) => {
    try {
      await this.sendTransaction(
        this.state.currentAccounts[0],
        to,
        undefined,
        value
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //NFT 오너 체크 -> 실행주기 -> 현재지갑을 확인하고 그 다음 getTokenContract로 접근해서 balanceOf 확인
  checkNFTOwner = async () => {
    if (
      !this.state.currentAccounts ||
      this.state.currentAccounts.length === 0
    ) {
      console.error("currentAccounts is not initialized");
      return;
    }

    const tokenContract = this.getTokenContract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const tokenBalance = await tokenContract.methods
      .balanceOf(this.state.currentAccounts[0])
      .call();
    return tokenBalance;
  };

  ///////////////
  //   Token   //
  ///////////////

  //간단히 말해서 token transfer
  transferToken = async (to, value) => {
    const tokenContract = this.getTokenContract(
      ERC20,
      this.state.ERC20contractAddress
    );
    try {
      const data = tokenContract.methods.transfer(to, value).encodeABI();
      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.ERC20contractAddress,
        data,
        undefined
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //컨트롤러 추가
  fAddController = async (to) => {
    const tokenContract = this.getTokenContract(
      ERC20,
      this.state.ERC20contractAddress
    );
    try {
      const data = tokenContract.methods.addController(to).encodeABI(); // 'to' 인자를 함수에 전달

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.ERC20contractAddress,
        data,
        undefined
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //컨트롤러 제거
  fRemoveController = async (to) => {
    const tokenContract = this.getTokenContract(
      ERC20,
      this.state.ERC20contractAddress
    );
    try {
      const data = tokenContract.methods.removeController(to).encodeABI(); // 'to' 인자를 함수에 전달

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.ERC20contractAddress,
        data,
        undefined
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //토큰의 밸런스
  fTokenBalanceOf = async () => {
    const web3 = this.getWeb3();
    const tokenContract = this.getTokenContract(
      ERC20,
      this.state.ERC20contractAddress
    );
    const tokenBalanceOfWei = await tokenContract.methods
      .balanceOf(this.state.currentAccounts[0])
      .call();
    const tokenBalanceOfEther = web3.utils.fromWei(tokenBalanceOfWei, "ether");
    const tokenBalanceOfTruncated =
      Math.floor(parseFloat(tokenBalanceOfEther) * 10000) / 10000;
    console.log(tokenBalanceOfEther);
    return tokenBalanceOfTruncated;
  };

  //총 발행된 토큰의 양
  fTokenTotalSupply = async () => {
    const tokenContract = this.getTokenContract(
      ERC20,
      this.state.ERC20contractAddress
    );
    const VTokenTotalSupply = await tokenContract.methods.totalSupply().call();

    return VTokenTotalSupply;
  };

  //토큰을 add 합니다.
  addTokenToMetaMask = async () => {
    const tokenAddress = this.state.ERC20contractAddress;
    const tokenSymbol = "CRB"; // 토큰 심볼을 적어주세요.
    const tokenDecimals = 18; // 토큰의 소수점 자릿수를 적어주세요.
    const tokenImage = "https://ibb.co/djK7BFC"; // 토큰 이미지 URL을 적어주세요.

    try {
      // MetaMask에 토큰을 추가하는 메서드를 사용합니다.
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      console.error("Error adding token to MetaMask:", error);
    }
  };

  /////////////
  //   NFT   //
  /////////////

  //NFT 판매를 시작합니다.
  fSetSale = async () => {
    const tokenContract = this.getTokenContract(
      ERC721,
      this.state.ERC721contractAddress
    );
    try {
      const data = tokenContract.methods.setSale().encodeABI();

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.ERC721contractAddress,
        data,
        undefined
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //MintByETH 함수를 실행시킵니다.
  fMintByETH = async (nickname) => {
    // 매개변수 nickname 추가
    const web3 = this.getWeb3();
    const contract = this.getTokenContract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const price = web3.utils.toWei("0", "wei");
    console.log(nickname);
    try {
      const data = contract.methods.mintByETH(1, nickname).encodeABI(); // "FE" 대신 nickname 사용

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.ERC721contractAddress,
        data,
        price
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //team이 민팅할수있는 함수 입니다.
  fTeamMint = async () => {
    const web3 = this.getWeb3();
    const contract = this.getTokenContract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const price = web3.utils.toWei("0", "wei");
    try {
      const data = contract.methods.teamMint(1).encodeABI();

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.ERC721contractAddress,
        data,
        price
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //image를 fetch하는 함수입니다.
  fetchImageMetadata = async () => {
    if (
      !this.state.currentAccounts ||
      this.state.currentAccounts.length === 0
    ) {
      return;
    }

    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      ERC721,
      this.state.ERC721contractAddress
    );

    // 총 토큰 수를 조회합니다.
    const totalSupply = await tokenContract.methods.totalSupply().call();

    // 총 토큰 수만큼 반복하여, 각 토큰의 소유자를 확인합니다.
    for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
      const owner = await tokenContract.methods.ownerOf(tokenId).call();

      // 만약 토큰의 소유자가 사용자와 일치한다면, 해당 토큰 ID를 처리합니다.
      if (owner === this.state.currentAccounts[0]) {
        const metadataUrl = `https://lime-wonderful-skunk-419.mypinata.cloud/ipfs/QmPJHgfcuSffRa9ZmAWoQsMZDMe8KMyP2G4dNddJBZutSi/${tokenId}`;
        try {
          const response = await fetch(metadataUrl);
          const metadata = await response.json();
          const imageUrl = metadata.image;
          this.setState({ imageUrl });
          // 본인의 토큰을 찾았으므로 반복문을 종료합니다.
          break;
        } catch (error) {
          console.error("Error fetching metadata:", error);
        }
      }
    }
  };

  //닉네임 함수입니다.
  fNickname = async (id) => {
    const tokenContract = this.getTokenContract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const myNickname = await tokenContract.methods
      .getNickname(this.state.currentAccounts[0])
      .call();

    return myNickname;
  };

  //TokenApprove를 통해서 크럼블을 폴리곤으로 바꾸기 전에 실행해야하는 함수입니다.
  fTokenApprove = async (getCrumb) => {
    const tokenContract = new this.getTokenContract(
      ERC20,
      this.state.ERC20contractAddress
    );
    //vote 또한 인자로 가져와야함
    try {
      const data = tokenContract.methods
        .approve(this.state.rewardContractAddress, getCrumb)
        .encodeABI();

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.ERC20contractAddress,
        data,
        undefined
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //현재까지 팔린 NFT를 보여줍니다.
  fTotalSupply = async () => {
    const tokenContract = this.getTokenContract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const VTotalSupply = await tokenContract.methods.totalSupply().call();

    return VTotalSupply;
  };

  /////////////////
  //   ERC1155   //
  /////////////////

  /* 수정사항 필요 < id 값을 받아와야함 */
  //FT를 민팅하는 함수 입니다.
  fMintByETH_FT = async (id) => {
    const web3 = this.getWeb3();
    const contract = this.getTokenContract(
      ERC1155,
      this.state.ERC1155contractAddress
    );
    const price = web3.utils.toWei("1", "wei"); // 수정된 코드
    if (price === 1) {
      console.log("true");
    }
    //id는 받아오는걸로 수정해야함
    try {
      const data = contract.methods
        .mint(
          this.state.currentAccounts[0],
          id,
          this.state.rewardContractAddress
        )
        .encodeABI();

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.ERC1155contractAddress,
        data,
        price
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Balance를 확인하는 함수 입니다.
  fBalanceOf = async (id) => {
    const tokenContract = this.getTokenContract(
      ERC1155,
      this.state.ERC1155contractAddress
    );
    const tokenId = await tokenContract.methods
      .balanceOf(this.state.currentAccounts[0], id)
      .call();
    return tokenId;
  };

  //setApprovalForAll을 통해 컨트랙트 접근을 허용하는 함수입니다.
  fSetApprovalForAll = async () => {
    const tokenContract = this.getTokenContract(
      ERC1155,
      this.state.ERC1155contractAddress
    );
    //vote 또한 인자로 가져와야함
    try {
      const data = tokenContract.methods
        .setApprovalForAll(this.state.rewardContractAddress, true)
        .encodeABI();

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.ERC1155contractAddress,
        data,
        undefined
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //////////////
  //  REWARD  //
  //////////////

  //클레임 함수입니다. 솔리디티코드에서 자세히 확인 가능합니다.
  fCheckAndClaimGoodToken = async (vote) => {
    const tokenContract = this.getTokenContract(
      Reward,
      this.state.rewardContractAddress
    );
    //vote 또한 인자로 가져와야함
    try {
      const data = tokenContract.methods
        .checkAndClaimGoodToken(vote)
        .encodeABI();

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.rewardContractAddress,
        data,
        undefined
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //크럼블을 폴리곤으로 교환하는 함수입니다.
  fExchangeEther = async (getPrice) => {
    const web3 = this.getWeb3();
    const contract = this.getTokenContract(
      Reward,
      this.state.rewardContractAddress
    );

    const crumbToSend = web3.utils.toWei(String(getPrice), "wei");
    await this.fTokenApprove(crumbToSend);

    try {
      const data = contract.methods.exchangeEther(crumbToSend).encodeABI();

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.rewardContractAddress,
        data,
        crumbToSend
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //vote를 시작하는 함수입니다. (vote를 열 수 있습니다.)
  fStartVote = async () => {
    const web3 = this.getWeb3();
    const contract = this.getTokenContract(
      Reward,
      this.state.rewardContractAddress
    );

    const value = web3.utils.toWei(String(1), "wei");
    //id는 받아오는걸로 수정해야함
    try {
      const data = contract.methods.startVote().encodeABI();

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.rewardContractAddress,
        data,
        value
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //투표하는 함수 입니다.
  fVote = async (id, is) => {
    const contract = this.getTokenContract(
      Reward,
      this.state.rewardContractAddress
    );
    //id는 받아오는걸로 수정해야함
    try {
      const data = contract.methods.vote(id, is).encodeABI();

      await this.sendTransaction(
        this.state.currentAccounts[0],
        this.state.rewardContractAddress,
        data,
        undefined
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //투표의 상황을 모두 보는 함수입니다.
  fVotes_view = async (id) => {
    const contract = this.getTokenContract(
      Reward,
      this.state.rewardContractAddress
    );
    const data = await contract.methods.votes(id).call();

    const contract_nft = await this.getTokenContract(
      ERC721,
      this.state.ERC721contractAddress
    );

    const proposerId = await contract_nft.methods
      .getNickname(data.proposer)
      .call();

    // 필요한 정보만 선택
    const filteredData = {
      id: proposerId,
      proposer: data.proposer,
      startTime: data.startTime,
      endTime: data.endTime,
      positiveVotes: data.positiveVotes,
      negativeVotes: data.negativeVotes,
      executed: data.executed,
      rewardClaimed: data.rewardClaimed,
    };

    return filteredData;
  };

  //투표를 했는지 안했는지 확인하는 함수입니다.
  fHasVoted = async (id) => {
    const contract = this.getTokenContract(
      Reward,
      this.state.rewardContractAddress
    );

    const data = await contract.methods
      .hasVoted(this.state.currentAccounts[0], id)
      .call();

    return data;
  };

  constructor(props) {
    super(props);
    this.aboutRef = React.createRef();
    this.howItWorksRef = React.createRef();
  }

  render() {
    return (
      <div>
        <Nav aboutRef={this.aboutRef} howItWorksRef={this.howItWorksRef} />
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                fetchImageMetadata={this.fetchImageMetadata}
                fTokenBalanceOf={this.fTokenBalanceOf}
                addTokenToMetaMask={this.addTokenToMetaMask}
                fNickname={this.fNickname}
                aboutRef={this.aboutRef}
                howItWorksRef={this.howItWorksRef}
              />
            }
          />
          {/* Menu */}
          <Route path="/breadcrumb" element={<BreadcrumbTrailPage />} />
          <Route path="/gatherings/*" element={<GatheringsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Set Profile */}
          <Route
            path="/set_profile"
            element={
              <SetProfilePage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                fetchImageMetadata={this.fetchImageMetadata}
                fMintByETH={this.fMintByETH}
              />
            }
          />

          {/* 임시 페이지 (삭제 예정) */}
          <Route
            path="/eth_transfer"
            element={
              <ETHTransferPage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                transferETH={this.transferETH}
              />
            }
          />
          <Route
            path="/token_transfer"
            element={
              <TokenTransferPage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                transferToken={this.transferToken}
              />
            }
          />
          <Route
            path="/nft_mint"
            element={
              <NFTMintPage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                fMintByETH={this.fMintByETH}
              />
            }
          />
          <Route
            path="/ft_mint"
            element={
              <FTMintPage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                fMintByETH_FT={this.fMintByETH_FT}
                fBalanceOf={this.fBalanceOf}
                fCheckAndClaimGoodToken={this.fCheckAndClaimGoodToken}
              />
            }
          />
          <Route
            path="/exchange_token"
            element={
              <ExchangeTokenPage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                fExchangeEther={this.fExchangeEther}
              />
            }
          />
          <Route
            path="/vote"
            element={
              <VotePage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                fStartVote={this.fStartVote}
                fVote={this.fVote}
                fVotes_view={this.fVotes_view}
                voteData={this.state.voteData}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange} // Pass handlePageChange to VotePage
                fHasVoted={this.fHasVoted}
                fSetApprovalForAll={this.fSetApprovalForAll}
              />
            }
          />
          <Route
            path="/admin/controller"
            element={
              <ControllerPage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                fAddController={this.fAddController}
                fRemoveController={this.fRemoveController}
                fSetSale={this.fSetSale}
              />
            }
          />
          <Route
            path="/admin/team_mint"
            element={
              <NFTTeamMintPage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
                fTeamMint={this.fTeamMint}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
