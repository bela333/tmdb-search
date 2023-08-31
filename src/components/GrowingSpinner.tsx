import { css, styled } from "styled-components";
import Spinner from "./Spinner";

const GrowingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Spinner />
    </div>
  );
};

interface GrowingSpinnerProps {
  /** Grow in the X axis (Main axis, in "row" direction) */
  $growX?: boolean;
  /** Grow in the Y axis (Cross axis, in "row" direction) */
  $growY?: boolean;
}

/**
 * An animated spinner, wrapped in a FlexBox to grow into the size of the parent
 */
export default styled(GrowingSpinner)<GrowingSpinnerProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  ${(props) => {
    if (props.$growX) {
      return css`
        justify-content: center;
      `;
    }
  }}
  ${(props) => {
    if (props.$growY) {
      return css`
        align-items: center;
      `;
    }
  }}
`;
