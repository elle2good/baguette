/**
 * Baguette
 * @leader Elisabeth Kim, Sueun Cho
 * @developer Sueun Cho, 경록, 은빈 (Change your name korean to english)
 * @artist Add your name
 * @advisor Add your name
 * @date 2023-05-12
 * @description Other developer add some functions and thne add author(Your name).
 * @version 2.4.1
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
import VotePage from "./pages/VotePage";
import FTMintPage from "./pages/FTMintPage";
import LandingPage from "./pages/LandingPage";
import NFTMintPage from "./pages/NFTMintPage";
import ETHTransferPage from "./pages/ETHTransferPage";
import TokenTransferPage from "./pages/TokenTransferPage";
import ControllerPage from "./pages/admin/ControllerPage";
import ExchangeTokenPage from "./pages/ExchangeTokenPage";
import NFTTeamMintPage from "./pages/admin/NFTTeamMintPage";

/////////
// CSS //
/////////
import "./App.css";

///////////////
// App Class //
///////////////
class App extends Component {
  //state 객체의 속성 값이 변경되면 render() 메소드가 다시 호출되어 UI가 갱신
  state = {
    web3: null, //Info of Web3
    currentAccounts: null,  //Current accounts
    //Smart contract accounts
    ERC20contractAddress: "0xcC3B025701782316764296c4D23399A099D257b4",
    ERC721contractAddress: "0x2491527DD8eD8c7F40f09c56b814C1f6eDDD6875",
    ERC1155contractAddress: "0xdA4107E898782fDa3931069BFafa4a34d332a790",
    rewardContractAddress: "0x00f6aC1d75dE1587dF37E172650c840e46D4B86E",
    ethereumBalance: "",  //Ethereum balance
    receiverAddress: "",  // Address to receive Ethereum
    transferValue: "",  //Transfer amounts of Ethereum
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

  async componentDidMount() {
    await this.connectToMetaMask();
    this.setupAccountsChangedEventListener();
    this.setupNetworkChangedEventListener();
    this.fetchImageMetadata();
  }

  //handlePageChange는 VotePage.js에서 투표 페이지를 보여줌
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    console.log(page)
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
  getBalance = async (web3) => {
    const currentAccountsBalance = await web3.eth.getBalance();
    this.setState({ currentAccountsBalance });

    return currentAccountsBalance;
  };

  // 현재 연결된 계정의 이더리움 잔액 가져오기
  getEthBalance = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    const balanceWei = await web3.eth.getBalance(accounts[0]);
    const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

    return balanceEther;
  };

  //MetaMask 계정 변경 이벤트 핸들링
  handleAccountChanged = async () => {
    const web3 = await this.createWeb3Instance();
    const accounts = await this.getAccounts(web3);
    // Reset the balance before fetching the new balance
    this.setState({ ethereumBalance: 0 });
    const balance = await this.getEthBalance(web3);
    console.log(balance)
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
        .catch((e) => {
          alert("Oops!");
        });
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

  ///////////////
  //   Token   //
  ///////////////

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
    const tokenContract = new web3.eth.Contract(ERC20, this.state.ERC20contractAddress);

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

  fTokenBalanceOf = async () => {
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(ERC20, this.state.ERC20contractAddress);
    const tokenBalanceOf = await tokenContract.methods.balanceOf(this.state.currentAccounts[0]).call();
    return tokenBalanceOf;
  };

  addTokenToMetaMask = async () => {
    const tokenAddress = this.state.ERC20contractAddress;
    const tokenSymbol = "CRB"; // 토큰 심볼을 적어주세요.
    const tokenDecimals = 18; // 토큰의 소수점 자릿수를 적어주세요.
    const tokenImage = "https://lime-wonderful-skunk-419.mypinata.cloud/ipfs/Qmbkf8wJzuMUQEFWGDq6sYb6qjcejQTC9CNf7jj8v98pME/1.png"; // 토큰 이미지 URL을 적어주세요.
  
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
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(
      ERC721,
      this.state.ERC721contractAddress
    );

    try {
      const data = tokenContract.methods.setSale().encodeABI();

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.state.currentAccounts[0],
              to: this.state.ERC721contractAddress,
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
      //const metadataUrl = `https://lime-wonderful-skunk-419.mypinata.cloud/ipfs/QmNNwDPUrmYJAMcWVh5sK6VMbargoUKJTFi6qfMTxCeuWu/1`;
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
    const data = await contract.methods.votes(id).call();
    
    // 필요한 정보만 선택
    const filteredData = {
      id: data.id,
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
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(
      Reward,
      this.state.rewardContractAddress
    );
    const from = this.state.currentAccounts[0];

    const data = await contract.methods.hasVoted(from, id).call();
    
    console.log(data);
    return data;
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
                fetchImageMetadata={this.fetchImageMetadata}
                fTokenBalanceOf={this.fTokenBalanceOf}
                addTokenToMetaMask={this.addTokenToMetaMask}
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
          />f
          <Route
            path="/vote"
            element={
              <VotePage
                state={this.state}
                fStartVote={this.fStartVote}
                fVote={this.fVote}
                fVotes_view={this.fVotes_view}
                voteData={this.state.voteData}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange} // Pass handlePageChange to VotePage
                fHasVoted={this.fHasVoted}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;