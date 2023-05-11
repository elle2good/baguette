import React from "react";

const ControllerPage = ({
  state,
  fAddController,
  fRemoveController,
  fSetSale,
}) => {
  return (
    <div>
      <input
        type="text"
        value={state.VAddController}
        onChange={(e) => this.setState({ VAddController: e.target.value })}
        placeholder="이건 add 컨트롤러입니다. 오너만 사용 가능합니다. 오너페이지에 들어갈께"
      />
      <button onClick={() => fAddController(state.VAddController)}>
        이건 add 컨트롤러입니다. 오너만 사용 가능합니다. 오너페이지에 들어갈께
      </button>

      <br />
      <br />
      <br />

      <input
        type="text"
        value={state.VRemoveController}
        onChange={(e) => this.setState({ VRemoveController: e.target.value })}
        placeholder="이건 remove 컨트롤러입니다. 오너만 사용 가능합니다. 오너페이지에 들어갈께"
      />
      <button onClick={() => fRemoveController(state.VRemoveController)}>
        이건 remove 컨트롤러입니다. 오너만 사용 가능합니다. 오너페이지에
        들어갈께
      </button>

      <br />
      <br />
      <br />
      <button onClick={() => fSetSale()}>
        NFT 셋 세일 버튼. 누르면 NFT 판매 시작됌
      </button>

      <br />
      <br />
    </div>
  );
};

export default ControllerPage;
