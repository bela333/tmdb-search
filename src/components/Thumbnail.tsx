import { styled } from "styled-components";

const Thumbnail = styled.img<{ $width: string }>`
  width: ${(props) => props.$width};
  height: auto;
  margin-bottom: 1rem;
`;

export default Thumbnail;
