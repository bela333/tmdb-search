import { styled } from "styled-components";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ModalNavbar = ({
  className,
  setIsShown,
}: {
  className?: string;
  setIsShown: (isShown: boolean) => void;
}) => {
  return (
    <div className={className}>
      <Button onClick={() => setIsShown(false)} $noBorder>
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
