import styled from "styled-components";

const FooterWrap = styled.div`
  background-color: #0076c8;
  font-size: 10px;
  text-align: center;
  min-width: 375px;
  width: 100%;
`;

function Footer() {
  return (
    <FooterWrap>
      &copy; Copyright 2022. YiHyeongRae all rights reserved.
    </FooterWrap>
  );
}

export default Footer;
