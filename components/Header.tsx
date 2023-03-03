import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import TopBar from "./TopBar";
import { signOut } from "next-auth/react";

const HeaderWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 6px 16px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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
  const { data: session, status } = useSession();

  const logins: Function = () => {
    if (status !== "authenticated") {
      router.push("/login");
    } else {
      signOut();
    }
  };
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
        <FuncIcons onClick={() => router.push("/AdminEditor")}>
          {/* <svg
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
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            style={{ width: "20px", height: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </FuncIcons>
        <FuncIcons onClick={() => logins()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            style={{
              width: "20px",
              height: "20px",
              color: status === "authenticated" ? "#d7d89f" : "#fff",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </FuncIcons>
      </SomeFuncWrap>
    </HeaderWrap>
  );
};

export default Header;
