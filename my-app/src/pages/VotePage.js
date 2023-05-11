import React from "react";

const VotePage = ({ state, fStartVote, fVote, fVotes_view }) => {
  return (
    <div>
      <p>내 주소: {state.currentAccounts}</p>
      <button onClick={() => fStartVote()}>투표 시작</button>

      <br />
      <br />
      <br />

      <input
        type="text"
        value={state.VVoteId}
        onChange={(e) => {
          console.log("투표 id", e.target.value);
          this.setState({ VVoteId: e.target.value });
        }}
        placeholder="투표 id"
      />
      <input
        type="text"
        value={state.VVoteIs}
        onChange={(e) => this.setState({ VVoteIs: e.target.value })}
        placeholder="true or false"
      />
      <button onClick={() => fVote(state.VVoteId, state.VVoteIs)}>
        이더 전송
      </button>

      <br />
      <br />

      <input
        type="text"
        value={state.VVotes_view}
        onChange={(e) => this.setState({ VVotes_view: e.target.value })}
        placeholder="보팅 데이터 (숫자 0번부터 대입 가능"
      />
      <button onClick={() => fVotes_view(state.VVotes_view)}>확인</button>
    </div>
  );
};

export default VotePage;
