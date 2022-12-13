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
  const [hidden, setHidden] = useState<string[]>([]);

  const { status } = useSession();

  // useEffect(() => {}, []);
  const EasterEgg: Function = () => {
    if (status === "authenticated") {
      signOut();
    } else {
      Router.push("/login");
    }
  };
  return (
    <TopBar>
      <TopContent style={{ marginRight: 25 }}>
        <span onClick={() => EasterEgg()}>
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
    </TopBar>
  );
}

export default Nav;
