import React from "react";
import styled from "styled-components";

const SideTagNavWrap = styled.ul`
  position: fixed;
  left: 0;
  top: 147.5px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SideTagNavItem = styled.li`
  width: 100%;
  list-style-type: none;
`;

const TagChildNavWrap = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 15px;
  width: 100%;
  padding-left: 20px;
  padding-top: 20px;
`;

const TagChildNavItem = styled.li`
  width: 100%;
  cursor: pointer;
  list-style: circle;
`;
function SideTagNav() {
  return (
    <>
      <SideTagNavWrap>
        <SideTagNavItem>
          [ Front-End ]
          <TagChildNavWrap>
            <TagChildNavItem>React</TagChildNavItem>
            <TagChildNavItem>NextJs</TagChildNavItem>
          </TagChildNavWrap>
        </SideTagNavItem>
        <SideTagNavItem>
          [ Back-End ]
          <TagChildNavWrap>
            <TagChildNavItem>Mysql</TagChildNavItem>
            <TagChildNavItem>S3</TagChildNavItem>
            <TagChildNavItem>RDS</TagChildNavItem>
          </TagChildNavWrap>
        </SideTagNavItem>
      </SideTagNavWrap>
    </>
  );
}

export default SideTagNav;
