import { css, styled } from "styled-components";

export default styled.button<{ $noBorder?: boolean }>`
  background-color: transparent;
  border: ${(props) => (props.$noBorder ? "0px" : "1px")} solid var(--secondary);

  &:hover {
    cursor: pointer;
  }
`;
