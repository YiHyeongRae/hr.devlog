import React from "react";
import styled from "styled-components";

const TerminalWrap = styled.div`
  display: flex;
  width: 100%;
  border-top: 2px solid #414141;
  flex-direction: column;
`;

const TapWrap = styled.ul`
  display: flex;
  gap: 8px;
  border-top: 1px solid #919191;
  padding-left: 10px;
`;
const Tap = styled.li`
  list-style: none;
  font-family: "MapleLight";
  font-size: 13px;
  padding: 5px;
  cursor: pointer;
`;
function AdsTerminal() {
  return (
    <TerminalWrap>
      <TapWrap>
        <Tap>문제</Tap>
        <Tap style={{ borderBottom: "1px solid #fff" }}>출력</Tap>
        <Tap>디버그 콘솔</Tap>
        <Tap>터미널</Tap>
        <Tap>GITLENS</Tap>
      </TapWrap>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <p>광고 영역</p>
      </div>
    </TerminalWrap>
  );
}

export default AdsTerminal;
