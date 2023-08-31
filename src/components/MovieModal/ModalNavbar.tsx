import { styled } from "styled-components";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface ModalNavbarProps {
  className?: string;
  /**A callback closed, when the modal needs to be closed */
  closeModal: () => void;
}

const ModalNavbar = ({ className, closeModal }: ModalNavbarProps) => {
  return (
    <div className={className}>
      <Button onClick={() => closeModal()} $noBorder>
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
      </Button>
    </div>
  );
};

export default styled(ModalNavbar)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: stretch;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
`;
