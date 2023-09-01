import { styled } from "styled-components";

export default styled.button<{ $noBorder?: boolean }>`
  background-color: transparent;
  border: ${(props) => (props.$noBorder ? "0px" : "1px")} solid var(--secondary);
  color: black;

  &:hover {
    cursor: pointer;
  }
`;
