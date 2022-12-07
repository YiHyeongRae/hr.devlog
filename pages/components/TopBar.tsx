import React from "react";
import styled from "styled-components";
import Image from "next/image";
import GithubIcon from "../../public/assets/img/GitHub-Mark-Light-120px-plus.png";
import Link from "next/link";

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
  return (
    <TopBar>
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
