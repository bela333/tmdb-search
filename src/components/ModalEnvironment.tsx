import React from "react";
import { css, styled } from "styled-components";
import useKeyDownEvent from "../useKeyDownEvent";

const ModalEnvironment = ({
  className,
  setIsShown,
  isShown,
  children,
}: React.PropsWithChildren<{
  className?: string;
  isShown: boolean;
  setIsShown: (isShown: boolean) => void;
}>) => {
  useKeyDownEvent(() => setIsShown(false), "Escape");

  return isShown ? (
    <div className={className} onClick={() => setIsShown(false)}>
      <div onClick={(ev) => ev.stopPropagation()}>{children}</div>
    </div>
  ) : (
    <div className={className}></div>
  );
};

export default styled(ModalEnvironment)<{ isShown: boolean }>`
  ${(props) => {
    if (props.isShown) {
      return css`
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }}
`;
