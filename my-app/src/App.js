//!!READ COPYRIGHT!!
/**
 * Baguette
 * @leader Elisabeth Kim, Sueun Cho
 * @developer Sueun Cho, Rok, 은빈
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
import AboutPage from "./pages/AboutPage";
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
    //Smart contract accounts
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

  getWeb3 = () => {
    return this.state.web3;
  };

  getTokenContract = (ABI, contractAddress) => {
    const web3 = this.getWeb3();
    return new web3.eth.Contract(ABI, contractAddress);
  };

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

  setupAccountsChangedEventListener = () => {
    window.ethereum.on("accountsChanged", async () => {
      await this.handleAccountChanged();
    });
  };

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

  //Check MetaMask install
  checkMetaMaskInstallation = async () => {
    if (typeof window.ethereum === "undefined") {
      alert(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
      return false;
    }
    return true;
  };

  //Connect MetaMask
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

  addTokenToMetaMask = async () => {
    const tokenAddress = this.state.ERC20contractAddress;
    const tokenSymbol = "CRB"; // 토큰 심볼을 적어주세요.
    const tokenDecimals = 18; // 토큰의 소수점 자릿수를 적어주세요.
    const tokenImage =
      "https://lime-wonderful-skunk-419.mypinata.cloud/ipfs/Qmbkf8wJzuMUQEFWGDq6sYb6qjcejQTC9CNf7jj8v98pME/1.png"; // 토큰 이미지 URL을 적어주세요.

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

  fMintByETH = async () => {
    const web3 = this.getWeb3();
    const contract = this.getTokenContract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const price = web3.utils.toWei("0", "wei");
    try {
      const data = contract.methods.mintByETH(1, "FE").encodeABI();

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
        console.log("good");
        const metadataUrl = `https://lime-wonderful-skunk-419.mypinata.cloud/ipfs/QmNNwDPUrmYJAMcWVh5sK6VMbargoUKJTFi6qfMTxCeuWu/${tokenId}`;

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

  /////////////////
  //   ERC1155   //
  /////////////////

  /* 수정사항 필요 < id 값을 받아와야함 */
  fMintByETH_FT = async (id) => {
    const web3 = this.getWeb3();
    const contract = this.getTokenContract(
      ERC1155,
      this.state.ERC1155contractAddress
    );
    const price = web3.utils.toWei("1", "wei"); // 수정된 코드
    console.log(price);
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

  fBalanceOf = async (id) => {
    const tokenContract = this.getTokenContract(
      ERC1155,
      this.state.ERC1155contractAddress
    );
    const tokenId = await tokenContract.methods
      .balanceOf(this.state.currentAccounts[0], id)
      .call();
    console.log(tokenId);
    return tokenId;
  };

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

    console.log(proposerId);
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

    console.log(filteredData);
    return filteredData;
  };

  fHasVoted = async (id) => {
    const contract = this.getTokenContract(
      Reward,
      this.state.rewardContractAddress
    );

    const data = await contract.methods
      .hasVoted(this.state.currentAccounts[0], id)
      .call();

    console.log(data);
    return data;
  };

  render() {
    return (
      <div>
        <Nav />
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
              />
            }
          />
          {/* Menu */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/breadcrumb" element={<BreadcrumbTrailPage />} />
          <Route path="/gatherings" element={<GatheringsPage />} />
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
      </div>
    );
  }
}

export default App;
