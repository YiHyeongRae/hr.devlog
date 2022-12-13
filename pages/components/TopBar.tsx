import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import GithubIcon from "../../public/assets/img/GitHub-Mark-Light-120px-plus.png";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const TopContent = styled.p`
  display: block;
  font-size: 16px;
  line-height: 46.5px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
  }
`;

function Nav() {
  const [hidden, setHidden] = useState<number>(0);

  const { status } = useSession();
  const [clickLog, setClickLog] = useState<number>(0);
  // useEffect(() => {}, []);
  const EasterEgg: Function = () => {
    if (status === "authenticated") {
      signOut();
    } else {
      setClickLog(clickLog >= 5 ? 0 : clickLog + 1);
    }
  };

  useEffect(() => {
    if (clickLog === 5) {
      setHidden(hidden + 1);
    }

    if (hidden > 2) {
      setHidden(0);
    }
  }, [clickLog]);
  console.log("hidden?", hidden);
  return (
    <TopBar>
      <TopContent style={{ marginRight: 25 }}>
        <input
          type="text"
          style={clickLog === 5 ? { width: "100px" } : { width: 0 }}
        />
        <span style={{ marginLeft: 10 }} onClick={() => EasterEgg()}>
          {status === "authenticated" ? "!" : "?"}
        </span>
      </TopContent>
      <TopContent style={{ marginRight: 25 }}>
        개발 기록을 남기는 공간
      </TopContent>
      <TopContent style={{ display: "flex", alignItems: "center" }}>
        <Link href="https://github.com/YiHyeongRae">
          <Image width={25} height={25} src={GithubIcon} alt="github-icon" />
        </Link>
      </TopContent>
      <style jsx>
        {`
          input {
            padding: 0;
            border: 0;
            transition: all 0.3s linear;
          }
        `}
      </style>
    </TopBar>
  );
}

export default Nav;
