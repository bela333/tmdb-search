import { styled } from "styled-components";

export default styled.button<{ $noBorder?: boolean; $invisible?: boolean }>`
  background-color: transparent;
  border: ${(props) => (props.$noBorder ? "0px" : "1px")} solid var(--secondary);
  color: black;
  visibility: ${(props) => (props.$invisible ? "hidden" : "unset")};

  &:hover {
    cursor: pointer;
  }
`;
