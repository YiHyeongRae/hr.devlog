import styled from "styled-components";

const SmallSpinner = styled.p`
  display: inline-block;
  margin: 14px 0;
  width: 50px;
  height: 50px;
  border: 4px solid rgba(232, 235, 237, 0.5);
  border-top: 4px solid #0066b8;
  border-radius: 50%;

  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerWrap = styled.div`
  height: calc(100vh - 42px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <SpinnerWrap>
      <SmallSpinner />
    </SpinnerWrap>
  );
}
