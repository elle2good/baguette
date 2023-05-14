import React, { useState, useEffect } from "react";

const ControllerPage = ({
  state,
  connectToMetaMask,
  fAddController,
  fRemoveController,
  fSetSale,
}) => {
  const [addController, setAddController] = useState("");
  const [removeController, setRemoveController] = useState("");

  useEffect(() => {
    connectToMetaMask();
  }, [connectToMetaMask]);

  return (
    <div>
      <input
        type="text"
        value={addController}
        onChange={(e) => setAddController(e.target.value)}
        placeholder="이건 add 컨트롤러입니다. 오너만 사용 가능합니다. 오너페이지에 들어갈께"
      />
      <button onClick={() => fAddController(addController)}>
        이건 add 컨트롤러입니다. 오너만 사용 가능합니다. 오너페이지에 들어갈께
      </button>

      <br />
      <br />
      <br />

      <input
        type="text"
        value={removeController}
        onChange={(e) => setRemoveController(e.target.value)}
        placeholder="이건 remove 컨트롤러입니다. 오너만 사용 가능합니다. 오너페이지에 들어갈께"
      />
      <button onClick={() => fRemoveController(removeController)}>
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
