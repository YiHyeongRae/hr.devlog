import styled from "styled-components";

const NavWrap = styled.nav`
  position: fixed;
  display: flex;
  left: 30px;
  top: 200px;
`;

const NavUl = styled.ul`
  display: flex;
  flex-direction: column;
`;
const NavLi = styled.li`
  width: 100%;
`;

function Nav() {
  return (
    <NavWrap>
      <NavUl>
        <NavLi>zz</NavLi>
        <NavLi>zz</NavLi>
        <NavLi>zz</NavLi>
        <NavLi>zz</NavLi>
      </NavUl>
    </NavWrap>
  );
}

export default Nav;
