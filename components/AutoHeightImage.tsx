import Image from "next/image";
import styled from "styled-components";

const Img = styled(Image)`
  height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 15px;
`;

const AutoHeightImage = ({ src, alt }: { src: string; alt: string }) => {
  return <Img src={src} layout="fill" alt={alt} />;
};

export default AutoHeightImage;
