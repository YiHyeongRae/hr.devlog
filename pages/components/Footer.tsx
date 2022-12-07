import styled from "styled-components";

const FooterWrap = styled.div`
  padding: 30px;
  border-top: 1px solid #333;
  font-size: 16px;
  text-align: center;
`;

function Footer() {
  return (
    <FooterWrap>
      &copy; Copyright 2022. YiHyeongRae all rights reserved.
    </FooterWrap>
  );
}

export default Footer;
