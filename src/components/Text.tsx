import { css, styled } from "styled-components";

const Text = styled.div<{
  $bottomMargin?: string;
  $topMargin?: string;
  $thin?: boolean;
  $italic?: boolean;
  $justified?: boolean;
}>`
  margin: 0;
  margin-bottom: ${(props) => (props.$bottomMargin ? props.$bottomMargin : "0")};
  margin-top: ${(props) => (props.$topMargin ? props.$topMargin : "0")};
  font-weight: normal;

  /* Thin text */
  ${(props) => {
    if (props.$thin) {
      return css`
        font-weight: 100;
      `;
    }
  }}

  /* Italic text */
  ${(props) => {
    if (props.$italic) {
      return css`
        font-style: italic;
      `;
    }
  }}

  /* Justified alignment */
  ${(props) => {
    if (props.$justified) {
      return css`
        text-align: justify;
      `;
    }
  }}
`;

export { Text };
