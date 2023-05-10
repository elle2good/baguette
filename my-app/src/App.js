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
import Web3 from "web3";
import ERC20 from "./abi/ERC20.json"; // ERC20 JSON import
import ERC721 from "./abi/ERC721.json";

class App extends Component {

  //state 객체의 속성 값이 변경되면 render() 메소드가 다시 호출되어 UI가 갱신
  state = {
    web3: null,
    currentAccounts: null,
    //ZKEVM : 0x74fC142f8482c1a9E8092c0D7dfb3a3ddeE3943A
    ERC20contractAddress: "0x74fC142f8482c1a9E8092c0D7dfb3a3ddeE3943A",
    ERC721contractAddress: "0x1f6fE789B06E9696c7944A0c541C0c1E3E983787",
    ERC1155contractAddress: "0x29cd2e75cDbfFC63036f689BBDb78b357c66De1B",
    rewardContractAddress: "0x80859bb7A555a1384753aF5C01028D9187C089d4",
    ethereumBalance: "",
    receiverAddress: "",
    transferValue: "",
    tokenAmount: "",
    sendTo: "",
    sendAmount: "",
    toMintPrice: 0,
    imageUrl: "",
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
      console.log(this.state.currentAccounts)
      const balanceWei = await web3.eth.getBalance(this.state.currentAccounts[0]);
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
      alert("MetaMask is not installed. Please install MetaMask and try again.");
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
  transferToken = async (from, value) => {
  const myAddress = this.state.currentAccounts[0];

  try {
    const web3 = await this.createWeb3Instance();
      window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
              from: myAddress,
              to: from,
              value: web3.utils.toHex(web3.utils.toWei(value)),
          }],
      })
      .then(() => {
          alert("Woot!");
      })
      .catch((e) => {
          alert("Oops!");
      })
  } catch (error) {
      console.error("Error:", error);
  }
  };

  // ERC20 토큰 구매
  buyTokens1 = async (amount) => {
    const web3 = this.state.web3;
    const getInfo = new web3.eth.Contract(ERC20, this.state.ERC20contractAddress);
    const from = this.state.currentAccounts[0];
    const amount1 = web3.utils.toWei(String(amount), "ether");

    // 토큰 구입 함수 호출을 위한 트랜잭션 객체 생성
    const transaction = {
      to: this.state.ERC20contractAddress,
      from: from,
      value: amount1,
      data: getInfo.methods.buyTokens().encodeABI()
    };
    // 트랜잭션 전송
  await web3.eth.sendTransaction(transaction);

  // 토큰 구입 완료 이벤트 출력
  console.log(`Bought ${amount} tokens.`);

  };

  mintByETH = async () => {
    const web3 = this.state.web3;
    const contract = new web3.eth.Contract(ERC721, this.state.ERC721contractAddress);
    const from = this.state.currentAccounts[0];
    const price = 0;
    const valueToSend = web3.utils.toWei(String(price), "ether");
  
    try {
      const data = contract.methods.mintByETH(1).encodeABI();
  
      window.ethereum.request({
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


  checkNFTOwner = async () => {
    if (!this.state.currentAccounts || this.state.currentAccounts.length === 0) {
      console.error("currentAccounts is not initialized");
      return;
    }
  
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(ERC721, this.state.ERC721contractAddress);
    const tokenBalance = await tokenContract.methods.balanceOf(this.state.currentAccounts[0]).call();
    return tokenBalance;
  };

  
  

  transferToken12 = async (to, value) => {
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(ERC20, this.state.ERC20contractAddress);

    try {
        const data = tokenContract.methods.transfer(to, value).encodeABI();

        window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: this.state.currentAccounts[0],
                to: this.state.ERC20contractAddress,  // Use the contract address instead of 'get_token'
                data,
            }],
        })
        .then(() => {
            alert("Woot! Token transfer successful!");
        })
        .catch((e) => {
            alert("Oops! Token transfer failed!");
        })
    } catch (error) {
        console.error("Error:", error);
    }
  };

  fetchImageMetadata = async () => {
    if (!this.state.currentAccounts || this.state.currentAccounts.length === 0) {
      console.error("currentAccounts is not initialized");
      return;
    }
  
    const web3 = this.state.web3;
    const tokenContract = new web3.eth.Contract(ERC721, this.state.ERC721contractAddress);
    const tokenBalance = await this.checkNFTOwner();
  
    if (tokenBalance >= 1) {
      const tokenId = await tokenContract.methods.tokenOfOwner(this.state.currentAccounts[0]).call();
      const metadataUrl = `https://lime-wonderful-skunk-419.mypinata.cloud/ipfs/QmNNwDPUrmYJAMcWVh5sK6VMbargoUKJTFi6qfMTxCeuWu/${tokenId}`;
      console.log(metadataUrl)
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

  render() {
    return (
      <div>
        <h1>MetaMask 연결 및 토큰 전송</h1>
        <p>내 주소: {this.state.currentAccounts}</p>
        <p>잔액: {this.state.ethereumBalance} </p>
        <button onClick={this.connectToMetaMask}>MetaMask에 연결</button>

        <h2>이더 전송</h2>
        <input
          type="text"
          value={this.state.receiverAddress}
          //인풋 될때마다 setState 업데이트 됩니다. 1을 치면 1, 즉, 123을 치면 1,12,123 으로 업데이트 됩니다.
          onChange={(e) => {
            console.log('Input value:', e.target.value);
            this.setState({ receiverAddress: e.target.value });
          }}

          placeholder="받는 주소"
        />
        <input
          type="number"
          value={this.state.transferValue}
          onChange={(e) => this.setState({ transferValue: e.target.value })}
          placeholder="이더 전송량"
        />
        <button onClick={() => this.transferToken(this.state.receiverAddress, this.state.transferValue)}>이더 전송</button>

        <h2>토큰 구매</h2>
        <input
          type="text"
          value={this.state.tokenAmount}
          onChange={(e) => this.setState({ tokenAmount: e.target.value })}
          placeholder="토큰 구매량"
        />
        <button onClick={() => this.buyTokens1(this.state.tokenAmount)}>토큰 구매</button>

        <h2>토큰 전송</h2>
        <input
          type="text"
          value={this.state.sendTo}
          onChange={(e) => this.setState({ sendTo: e.target.value })}
          placeholder="받는 주소"
        />
        <input
          type="text"
          value={this.state.sendAmount}
          onChange={(e) => this.setState({ sendAmount: e.target.value })}
          placeholder="토큰 전송량"
        />
        <button onClick={() => this.transferToken12(this.state.sendTo, this.state.sendAmount)}>토큰 전송</button>


        <h2>프로필 NFT 구매</h2>
        <h3>프로필은 아이디당 단 1번 1개만 구입이 가능합니다. 본인의 아이디를 다른 사람에게 trnasfer 한 뒤에도 구입이 불가합니다.</h3>
        <button onClick={() => this.mintByETH()}>NFT 구매</button>

        <h2>이미지</h2>
        {this.state.imageUrl && <img src={this.state.imageUrl} alt="NFT Image" width="100" height="100" />}

      </div>
    );    

  }
}

export default App;