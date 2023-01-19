import Image, { ImageProps } from "next/image";
import styled from "styled-components";

const AutoHeightImageWrapper = styled.div`
  width: 100%;
  & > span {
    position: unset !important;
    img {
      height: auto !important;
      position: relative !important;
    }
  }
`;

const AutoHeightImage = ({ ...props }: ImageProps) => {
  <AutoHeightImageWrapper>
    <Image layout="fill" {...props} />
  </AutoHeightImageWrapper>;
};

export default AutoHeightImage;
