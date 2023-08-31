import { css, styled } from "styled-components";

interface TextProps {
  /** Margin to be added to the bottom of this text */
  $bottomMargin?: string;
  /** Margin to be added to the top of this text */
  $topMargin?: string;
  /** Make text thin */
  $thin?: boolean;
  /** Make text italic */
  $italic?: boolean;
  /** Make text bold */
  $bold?: boolean;
  /** Make text alignment justified */
  $justified?: boolean;
  /** Change font size */
  $fontSize?: string;
  /** Underline text */
  $underlined?: boolean;
  /** Change text color */
  $color?: string;
  /** Show ellipses if the text is about to be cut off */
  $cutoff?: boolean;
}

const Text = styled.div<TextProps>`
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

  /* Underline */
  ${(props) => {
    if (props.$cutoff) {
      return css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `;
    }
  }}

  /* Font size */
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : "revert")};

  /* Text color */
  color: ${(props) => (props.$color ? props.$color : "black")};
`;

/** A generic component for formatted links. Same as `Text`, but with a forced "black" color. */
const Link = styled(Text)`
  color: black;
`;

/** A generic component for formatted text */
export { Text, Link };
