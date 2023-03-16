import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ErrorWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 42px);
`;

const ErrorText = styled.div`
  margin: 10px 0;
`;

function Error404() {
  const router = useRouter();
  const [timer, setTimer] = useState<number>(3);
  useEffect(() => {
    const dec = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(dec);
      router.replace("/");
    }
  }, [timer]);
  return (
    <ErrorWrap>
      <ErrorText>Posts deleted or addresses are not valid</ErrorText>
      <ErrorText>
        Routing Home In <span style={{ fontSize: "25px" }}>{timer}</span>{" "}
        Seconds
      </ErrorText>
    </ErrorWrap>
  );
}

export default Error404;
