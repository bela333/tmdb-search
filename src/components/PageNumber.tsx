import { styled } from "styled-components";
import { Text } from "./Text";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export interface PageNumberProps {
  className?: string;
  pageNumber: number;
  totalPages: number;
  changePage: (page: number) => void;
}

const PageNumber = ({
  className,
  pageNumber,
  totalPages,
  changePage,
}: PageNumberProps) => {
  return (
    <div className={className}>
      <Button
        onClick={() => changePage(pageNumber - 1)}
        $invisible={pageNumber - 1 < 1}
        $noBorder
      >
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
      </Button>
      <Text>
        {pageNumber}/{totalPages}
      </Text>
      <Button
        onClick={() => changePage(pageNumber + 1)}
        $invisible={pageNumber + 1 > totalPages}
        $noBorder
      >
        <FontAwesomeIcon icon={faChevronRight} size="2xl" />
      </Button>
    </div>
  );
};

export default styled(PageNumber)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
