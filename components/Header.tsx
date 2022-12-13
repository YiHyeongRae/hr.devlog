import { useRouter } from "next/router";
import styled from "styled-components";
import TopBar from "./TopBar";

const HeaderWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #333;
  line-height: 46.5px;
`;

const Logo = styled.h1`
  font-size: 40px;
  font-style: italic;
  cursor: pointer;
`;

const Header = () => {
  const router = useRouter();
  return (
    <HeaderWrap>
      <Logo onClick={() => router.push("/")}>hr.devlog : : : :</Logo>
      <TopBar />
    </HeaderWrap>
  );
};

export default Header;
