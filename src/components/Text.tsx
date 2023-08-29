import { css, styled } from "styled-components";

const Text = styled.div<{
  $bottomMargin?: string;
  $topMargin?: string;
  $thin?: boolean;
  $italic?: boolean;
  $bold?: boolean;
  $justified?: boolean;
  $fontSize?: string;
  $underlined?: boolean;
}>`
  text-decoration: none;
  margin: 0;
  margin-bottom: ${(props) =>
    props.$bottomMargin ? props.$bottomMargin : "0"};
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

  /* Bold text */
  ${(props) => {
    if (props.$bold) {
      return css`
        font-weight: bold;
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

  /* Underline */
  ${(props) => {
    if (props.$underlined) {
      return css`
        text-decoration: underline;
      `;
    }
  }}

  /* Font size */
  font-size: ${props=>props.$fontSize?props.$fontSize:"revert"};
`;

const Link = styled(Text)`
  color: black;
`

export { Text, Link};
