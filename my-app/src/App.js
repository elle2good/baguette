/* eslint-disable jsx-a11y/img-redundant-alt */
//실행 주기
/*
애플리케이션이 처음 로드될 때:
componentDidMount() 함수가 호출되어 MetaMask 연결을 설정합니다.
여기서 connectToMetaMask() 함수를 호출하며, 계정 변경 이벤트 및 
네트워크 변경 이벤트를 처리하기 위한 리스너를 설정합니다.

MetaMask에 연결 버튼 클릭 시:
connectToMetaMask() 함수가 실행되어 사용자가 MetaMask에 연결을 요청하고, 
Web3 인스턴스를 생성합니다. 그리고 연결된 계정을 가져오고, 해당 계정의 
이더리움 잔액을 가져옵니다.
*/

// eslint-disable-next-line
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Web3 from "web3";
import ERC20 from "./abi/ERC20.json"; // ERC20 JSON import
import ERC721 from "./abi/ERC721.json";
import ERC1155 from "./abi/ERC1155.json";
import Reward from "./abi/Reward.json";

// 페이지 import
import LandingPage from "./pages/LandingPage";
import ETHTransferPage from "./pages/ETHTransferPage";
import TokenTransferPage from "./pages/TokenTransferPage";
import NFTMintPage from "./pages/NFTMintPage";

import "./App.css";
import ControllerPage from "./pages/admin/ControllerPage";
import NFTTeamMintPage from "./pages/admin/NFTTeamMintPage";
import FTMintPage from "./pages/FTMintPage";
import ExchangeTokenPage from "./pages/ExchangeTokenPage";
import VotePage from "./pages/VotePage";

class App extends Component {
  //state 객체의 속성 값이 변경되면 render() 메소드가 다시 호출되어 UI가 갱신
  state = {
    web3: null,
    currentAccounts: null,
    //ZKEVM : 0x74fC142f8482c1a9E8092c0D7dfb3a3ddeE3943A
    ERC20contractAddress: "0xcC3B025701782316764296c4D23399A099D257b4",
    ERC721contractAddress: "0x2491527DD8eD8c7F40f09c56b814C1f6eDDD6875",
    ERC1155contractAddress: "0xdA4107E898782fDa3931069BFafa4a34d332a790",
    rewardContractAddress: "0x00f6aC1d75dE1587dF37E172650c840e46D4B86E",
    ethereumBalance: "",
    receiverAddress: "",
    transferValue: "",
    tokenAmount: "",
    sendTo: "",
    sendAmount: "",
    toMintPrice: 0,
    imageUrl: "",
    VAddController: "",
    VRemoveController: "",
    VMintByETH_FT: "",
    VBalanceOf: "",
    VCheckAndClaimGoodToken: "",
    VExchangeEther: "",
    VExchangeTokens: "",
    VStartVote: "",
    VVoteId: "",
    VVoteIs: "",
    VVotes_view: "",
  };

  async componentDidMount() {
    await this.connectToMetaMask();
    this.setupAccountsChangedEventListener();
    this.setupNetworkChangedEventListener();
    this.fetchImageMetadata();
  }

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
  getBalance = async (web3) => {
    const currentAccounts = await web3.eth.getBalance();
    this.setState({ currentAccounts });
    return currentAccounts;
  };

  // 현재 연결된 계정의 이더리움 잔액 가져오기
  getEthBalance = async (web3) => {
    if (this.state.currentAccounts && this.state.currentAccounts[0]) {
      console.log(this.state.currentAccounts);
      const balanceWei = await web3.eth.getBalance(
        this.state.currentAccounts[0]
      );
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      this.setState({ ethereumBalance: balanceEth });
      return balanceEth;
    }
    return null;
  };

  //MetaMask 계정 변경 이벤트 핸들링
  handleAccountChanged = async () => {
    const web3 = await this.createWeb3Instance();
    const accounts = await this.getAccounts(web3);
    // Reset the balance before fetching the new balance
    this.setState({ ethereumBalance: 0 });
    const balance = await this.getEthBalance(web3);
    this.setState({ currentAccounts: accounts, ethereumBalance: balance });
  };

  handleNetworkChanged = async () => {
    const web3 = await this.createWeb3Instance();
    const accounts = await this.getAccounts(web3);
    // Reset the balance before fetching the new balance
    this.setState({ ethereumBalance: 0 });
    const balance = await this.getEthBalance(web3);
    this.setState({ currentAccounts: accounts, ethereumBalance: balance });
  };

  // MetaMask 설치 여부 확인
  checkMetaMaskInstallation = async () => {
    if (typeof window.ethereum === "undefined") {
      alert(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
      return false;
    }
    return true;
  };

  // MetaMask 연결
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

  // 이더리움 전송
  transferETH = async (from, value) => {
    const myAddress = this.state.currentAccounts[0];

    try {
      const web3 = await this.createWeb3Instance();
      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: myAddress,
              to: from,
              value: web3.utils.toHex(web3.utils.toWei(value)),
            },
          ],
        })
        .then(() => {
          alert("Woot!");
        })
        .catch((e) => {
          alert("Oops!");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ERC20 토큰 구매
  //buyTokens1 = async (amount) => {
  //  const web3 = this.state.web3;
  //  const getInfo = new web3.eth.Contract(ERC20, this.state.ERC20contractAddress);
  //  const from = this.state.currentAccounts[0];
  //  const amount1 = web3.utils.toWei(String(amount), "ether");
  //
  //  // 토큰 구입 함수 호출을 위한 트랜잭션 객체 생성
  //  const transaction = {
  //    to: this.state.ERC20contractAddress,
  //    from: from,
  //    value: amount1,
  //    data: getInfo.methods.buyTokens().encodeABI()
  //  };
  //  // 트랜잭션 전송
  //await web3.eth.sendTransaction(transaction);
  //
  //// 토큰 구입 완료 이벤트 출력
  //console.log(`Bought ${amount} tokens.`);
  //
  //};

  checkNFTOwner = async () => {
    if (
      !this.state.currentAccounts ||
      this.state.currentAccounts.length === 0
    ) {
      console.error("currentAccounts is not initialized");
      return;
    }

    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const tokenBalance = await tokenContract.methods
      .balanceOf(this.state.currentAccounts[0])
      .call();
    return tokenBalance;
  };

  transferToken = async (to, value) => {
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      ERC20,
      this.state.ERC20contractAddress
    );

    try {
      const data = tokenContract.methods.transfer(to, value).encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.state.currentAccounts[0],
              to: this.state.ERC20contractAddress, // Use the contract address instead of 'get_token'
              data,
            },
          ],
        })
        .then(() => {
          alert("Woot! Token transfer successful!");
        })
        .catch((e) => {
          alert("Oops! Token transfer failed!");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fAddController = async (to) => {
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      ERC20,
      this.state.ERC20contractAddress
    );

    try {
      const data = tokenContract.methods.addController(to).encodeABI(); // 'to' 인자를 함수에 전달

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.state.currentAccounts[0],
              to: this.state.ERC20contractAddress, // Use the contract address instead of 'get_token'
              data,
            },
          ],
        })
        .then(() => {
          alert("Woot! Controller added successfully!");
        })
        .catch((e) => {
          alert("Oops! Adding controller failed!");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fRemoveController = async (to) => {
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      ERC20,
      this.state.ERC20contractAddress
    );

    try {
      const data = tokenContract.methods.removeController(to).encodeABI(); // 'to' 인자를 함수에 전달

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.state.currentAccounts[0],
              to: this.state.ERC20contractAddress, // Use the contract address instead of 'get_token'
              data,
            },
          ],
        })
        .then(() => {
          alert("Woot! Controller added successfully!");
        })
        .catch((e) => {
          alert("Oops! Adding controller failed!");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /////////////
  //   NFT   //
  /////////////

  fSetSale = async () => {
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      ERC721,
      this.state.ERC721contractAddress
    );

    try {
      const data = tokenContract.methods.setSale().encodeABI(); // 'to' 인자를 함수에 전달

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.state.currentAccounts[0],
              to: this.state.ERC721contractAddress, // Use the contract address instead of 'get_token'
              data,
            },
          ],
        })
        .then(() => {
          alert("Woot! Controller added successfully!");
        })
        .catch((e) => {
          alert("Oops! Adding controller failed!");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fMintByETH = async () => {
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const from = this.state.currentAccounts[0];
    const price = 0;
    const valueToSend = web3.utils.toWei(String(price), "ether");

    try {
      const data = contract.methods.mintByETH(1).encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: from,
              to: this.state.ERC721contractAddress,
              value: valueToSend,
              data,
            },
          ],
        })
        .then(() => {
          console.log(`Successfully minted 1 NFT.`);
        })
        .catch((e) => {
          console.error("Error minting tokens:", e);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fTeamMint = async () => {
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const from = this.state.currentAccounts[0];
    const price = 0;
    const valueToSend = web3.utils.toWei(String(price), "ether");

    try {
      const data = contract.methods.teamMint(1).encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: from,
              to: this.state.ERC721contractAddress,
              value: valueToSend,
              data,
            },
          ],
        })
        .then(() => {
          console.log(`Successfully minted 1 NFT.`);
        })
        .catch((e) => {
          console.error("Error minting tokens:", e);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchImageMetadata = async () => {
    if (
      !this.state.currentAccounts ||
      this.state.currentAccounts.length === 0
    ) {
      console.error("currentAccounts is not initialized");
      return;
    }

    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      ERC721,
      this.state.ERC721contractAddress
    );
    const tokenBalance = await this.checkNFTOwner();

    if (tokenBalance >= 1) {
      const tokenId = await tokenContract.methods
        .tokenOfOwner(this.state.currentAccounts[0])
        .call();
      const metadataUrl = `https://lime-wonderful-skunk-419.mypinata.cloud/ipfs/QmNNwDPUrmYJAMcWVh5sK6VMbargoUKJTFi6qfMTxCeuWu/${tokenId}`;
      console.log(metadataUrl);
      try {
        //try catch 추가
        const response = await fetch(metadataUrl);
        const metadata = await response.json();
        const imageUrl = metadata.image;
        this.setState({ imageUrl });
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    }
  };

  /////////////////
  //   ERC1155   //
  /////////////////

  /* 수정사항 필요 < id 값을 받아와야함 */
  fMintByETH_FT = async (id) => {
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(
      ERC1155,
      this.state.ERC1155contractAddress
    );
    const from = this.state.currentAccounts[0];
    const price = web3.utils.toWei("1", "wei"); // 수정된 코드
    //id는 받아오는걸로 수정해야함
    try {
      const data = contract.methods
        .mint(from, id, this.state.rewardContractAddress)
        .encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: from,
              to: this.state.ERC1155contractAddress,
              value: web3.utils.toHex(web3.utils.toWei(price)),
              data,
            },
          ],
        })
        .then(() => {
          console.log(`Successfully minted 1 NFT.`);
        })
        .catch((e) => {
          console.error("Error minting tokens:", e);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fBalanceOf = async (id) => {
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      ERC1155,
      this.state.ERC1155contractAddress
    );
    const tokenId = await tokenContract.methods
      .balanceOf(this.state.currentAccounts[0], id)
      .call();
    console.log(tokenId);
  };

  //////////////
  //  REWARD  //
  //////////////

  fCheckAndClaimGoodToken = async (vote) => {
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      Reward,
      this.state.rewardContractAddress
    );
    //vote 또한 인자로 가져와야함
    try {
      const data = tokenContract.methods
        .checkAndClaimGoodToken(vote)
        .encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.state.currentAccounts[0],
              to: this.state.rewardContractAddress,
              data,
            },
          ],
        })
        .then(() => {
          alert("Woot! Controller added successfully!");
        })
        .catch((e) => {
          alert("Oops! Adding controller failed!");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fExchangeEther = async (getPrice) => {
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(
      Reward,
      this.state.rewardContractAddress
    );
    const from = this.state.currentAccounts[0];
    //id는 받아오는걸로 수정해야함
    try {
      const data = contract.methods.exchangeEther(getPrice).encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: from,
              to: this.state.rewardContractAddress,
              data,
            },
          ],
        })
        .then(() => {
          console.log(`Successfully exchange ether`);
        })
        .catch((e) => {
          console.error("Error minting tokens:", e);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fExchangeTokens = async (getPrice) => {
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(
      Reward,
      this.state.rewardContractAddress
    );
    const from = this.state.currentAccounts[0];
    const valueToSend = web3.utils.toWei(String(getPrice), "ether");
    //id는 받아오는걸로 수정해야함
    try {
      const data = contract.methods.exchangeTokens(valueToSend).encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: from,
              to: this.state.rewardContractAddress,
              value: valueToSend,
              data,
            },
          ],
        })
        .then(() => {
          console.log(`Successfully minted 1 NFT.`);
        })
        .catch((e) => {
          console.error("Error minting tokens:", e);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fStartVote = async () => {
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(
      Reward,
      this.state.rewardContractAddress
    );
    const from = this.state.currentAccounts[0];
    const valueToSend = web3.utils.toWei(String(2), "wei");
    //id는 받아오는걸로 수정해야함
    try {
      const data = contract.methods.startVote().encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: from,
              to: this.state.rewardContractAddress,
              value: web3.utils.toHex(web3.utils.toWei(valueToSend)),
              data,
            },
          ],
        })
        .then(() => {
          console.log(`Successfully minted 1 NFT.`);
        })
        .catch((e) => {
          console.error("Error minting tokens:", e);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fVote = async (id, is) => {
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(
      Reward,
      this.state.rewardContractAddress
    );
    const from = this.state.currentAccounts[0];
    //id는 받아오는걸로 수정해야함

    try {
      const data = contract.methods.vote(id, is).encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: from,
              to: this.state.rewardContractAddress,
              data,
            },
          ],
        })
        .then(() => {
          console.log(`Successfully exchange ether`);
        })
        .catch((e) => {
          console.error("Error minting tokens:", e);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fVotes_view = async (id) => {
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(
      Reward,
      this.state.rewardContractAddress
    );
    //id는 받아오는걸로 수정해야함

    //promise는 await로 가져오면 됌
    // const data = await contract.methods.votes(id).call();
    // console.log(data.proposer);
    const data = contract.methods.votes(id).call();
    console.log(data);
  };

  render() {
    return (
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                state={this.state}
                connectToMetaMask={this.connectToMetaMask}
              />
            }
          />
          <Route
            path="/eth_transfer"
            element={
              <ETHTransferPage
                state={this.state}
                transferETH={this.transferETH}
              />
            }
          />
          <Route
            path="/token_transfer"
            element={
              <TokenTransferPage
                state={this.state}
                transferToken={this.transferToken}
              />
            }
          />
          <Route
            path="/nft_mint"
            element={
              <NFTMintPage state={this.state} fMintByETH={this.fMintByETH} />
            }
          />
          <Route
            path="/admin/controller"
            element={
              <ControllerPage
                state={this.state}
                fAddController={this.fAddController}
                fRemoveController={this.fRemoveController}
                fSetSale={this.fSetSale}
              />
            }
          />
          <Route
            path="/admin/team_mint"
            element={<NFTTeamMintPage fTeamMint={this.fTeamMint} />}
          />
          <Route
            path="/ft_mint"
            element={
              <FTMintPage
                state={this.state}
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
                fExchangeTokens={this.fExchangeTokens}
              />
            }
          />
          <Route
            path="/vote"
            element={
              <VotePage
                state={this.state}
                fStartVote={this.fStartVote}
                fVote={this.fVote}
                fVotes_view={this.fVotes_view}
              />
            }
          />
        </Routes>
        {/*  <h2>토큰 구매</h2>
        <input
          type="text"
          value={this.state.tokenAmount}
          onChange={(e) => this.setState({ tokenAmount: e.target.value })}
          placeholder="토큰 구매량"
        />
        <button onClick={() => this.buyTokens1(this.state.tokenAmount)}>토큰 구매</button> */}
      </div>
    );
  }
}

export default App;
