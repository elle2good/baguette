import React, { useState, useEffect } from "react";

const VotePage = ({
  state,
  fStartVote,
  fVote,
  fVotes_view,
  currentPage,
  onPageChange,
  fHasVoted,
  connectToMetaMask,
  fSetApprovalForAll,
}) => {
  const [VVoteId, setVVoteId] = useState("");
  const [VVoteIs, setVVoteIs] = useState("");
  const [VVotes_view, setVVotes_view] = useState("");

  const [displayedVoteData, setDisplayedVoteData] = useState([]);
  const [voteStatus, setVoteStatus] = useState([]);

  useEffect(() => {
    connectToMetaMask();
  }, [connectToMetaMask]);

  useEffect(() => {
    if (!state || !state.web3 || !state.currentAccounts) {
      return;
    }
  
    const startIndex = currentPage * 5;
    const endIndex = startIndex + 4;
    const newDisplayedVoteData = [];
    const newVoteStatus = [];
  
    const fetchData = async () => {
      for (let i = startIndex; i <= endIndex; i++) {
        const data = await fVotes_view(i);
        const getProposerNick = data.proposer;
        console.log(getProposerNick)
        newDisplayedVoteData.push(data);
        if (newDisplayedVoteData.length === 5) {
          setDisplayedVoteData(newDisplayedVoteData);
        }
  
        const hasVoted = await fHasVoted(i);
        newVoteStatus.push(hasVoted);
        if (newVoteStatus.length === 5) {
          setVoteStatus(newVoteStatus);
        }
      }
    };
  
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);
  
    return () => {
      clearTimeout(timer);
    };
  }, [currentPage, state]);

  const handleButtonClick = (page) => {
    if (page < 0) return; // Don't go below page 0
    onPageChange(page);
  };
  
  


  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>
      <br/>
        <br/>

      <button onClick={() => fStartVote()} style={{fontSize: '30px'}}>내가 한 활동 검증받기</button>

      <br />
      <br />
      <button onClick={() => fSetApprovalForAll()}>컨트롤러 승인</button>
      <br />

      <input
        type="text"
        value={VVoteId}
        onChange={(e) => {
          console.log("투표 id", e.target.value);
          setVVoteId(e.target.value);
        }}
        placeholder="투표 id"
      />
      <input
        type="text"
        value={VVoteIs}
        onChange={(e) => setVVoteIs(e.target.value)}
        placeholder="true or false"
      />
      <button onClick={() => fVote(VVoteId, VVoteIs)}>이더 전송</button>

      <br />
      <br />
      <br/>
        <br/>

      <input
        type="text"
        value={VVotes_view}
        onChange={(e) => setVVotes_view(e.target.value)}
        placeholder="보팅 데이터 (숫자 0번부터 대입 가능"
      />
      <button onClick={() => fVotes_view(VVotes_view)}>확인</button>
      <br/>
        <br/>
        <br/>
        <br/>

        {displayedVoteData.map((vote, index) => (
  <div key={index}>
    <p>여기에 특정한 4가지 활동에 대한 이미지가 들어가야합니다.</p>
    <p>투표 정보 {index}:</p>
    <pre>{JSON.stringify(vote, null, 2)}</pre>
    <button onClick={() => fVote(index, true)} style={{fontSize: '50px'}}>찬성</button>
    <span style={{ margin: "0 10px" }}></span>
    <button onClick={() => fVote(index, false)} style={{fontSize: '50px'}}>반대</button>
    <br/>
    <br/>
    <p>{index} 번 투표지에 투표를 했나요? </p>
    {voteStatus[index] === true && <p>투표 했음</p>}
    {voteStatus[index] === false && <p>투표 안했음</p>}
    <br/>
    <br/>
  </div>
))}



      <div style={{fontSize: "50px"}}>
        <button onClick={() => handleButtonClick(currentPage - 1)} style={{fontSize: '50px'}}>
          이전
        </button>
        <span style={{ margin: "0 10px" }}></span>
        <span>페이지 {currentPage}</span>
        <span style={{ margin: "0 10px" }}></span>
        <button onClick={() => handleButtonClick(currentPage + 1)} style={{fontSize: '50px'}}>
          다음
        </button>
      </div>
    </div>
  );
};

export default VotePage;
