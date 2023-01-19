import { useRouter } from "next/router";
import styled from "styled-components";
import TopBar from "./TopBar";

const HeaderWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 6px 16px;
  flex-direction: row;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 12px;
  line-height: 20px;
  cursor: pointer;
  font-family: "MapleLight";
`;

const TrafficLightWrap = styled.ul`
  display: flex;
  justify-content: space-around;
  gap: 8px;
  align-items: center;
`;

const TrafficLight = styled.li`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  list-style-type: none;
  cursor: pointer;
`;

const SomeFuncWrap = styled.ul`
  display: flex;
  justify-content: space-around;
  gap: 8px;
  align-items: center;
`;
const FuncIcons = styled.li`
  width: 20px;
  height: 20px;
  list-style-type: none;

  cursor: pointer;
`;

const Header = () => {
  const router = useRouter();
  return (
    <HeaderWrap>
      <TrafficLightWrap>
        <TrafficLight color="#ff5f57" />
        <TrafficLight color="#febc2d" />
        <TrafficLight color="#29c83f" />
      </TrafficLightWrap>
      <Logo onClick={() => router.push("/")}>hr.devlog</Logo>
      {/* <TopBar /> */}
      <SomeFuncWrap>
        <FuncIcons>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px", height: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </FuncIcons>
        <FuncIcons>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px", height: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </FuncIcons>
        <FuncIcons>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px", height: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
        </FuncIcons>
      </SomeFuncWrap>
    </HeaderWrap>
  );
};

export default Header;
