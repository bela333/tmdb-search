import React from "react";
import { css, styled } from "styled-components";
import useKeyDownEvent from "../useKeyDownEvent";

interface ModalEnvironmentProps {
  className?: string;
  /** Boolean for hiding or revealing the environment */
  isShown: boolean;
  /** Callback called, when the modal needs to be closed */
  closeModal: () => void;
}

const ModalEnvironment = ({
  className,
  closeModal,
  isShown,
  children,
}: React.PropsWithChildren<ModalEnvironmentProps>) => {
  useKeyDownEvent(() => closeModal(), "Escape");

  return isShown ? (
    <div className={className} onClick={() => closeModal()}>
      <div onClick={(ev) => ev.stopPropagation()}>{children}</div>
    </div>
  ) : (
    <div className={className}></div>
  );
};

/** Component for housing Modals */
export default styled(ModalEnvironment)`
  ${(props) => {
    if (props.isShown) {
      return css`
        width: 100dvw;
        height: 100dvh;
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
