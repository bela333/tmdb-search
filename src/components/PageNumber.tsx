import { styled } from "styled-components";
import { Text } from "./Text";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { SearchMovieResult } from "../api/searchMovie";
import { SuspensifiedPromise } from "../suspensify";

export interface PageNumberProps {
  className?: string;
  results: SuspensifiedPromise<SearchMovieResult>;
  changePage: (page: number) => void;
}

const PageNumber = ({ className, results, changePage }: PageNumberProps) => {
  let result: SearchMovieResult;
  // Read movie list from suspense. Return early, if an error occured
  try {
    result = results.read();
  } catch (error: any) {
    if (error.then) {
      // Duck typing. Is it a promise? If it is, we should follow Suspense behaviour and raise it up.
      throw error;
    }
    return <div className={className} data-testid="pagenumber-no-show"></div>;
  }
  return (
    <div className={className}>
      <Button
        onClick={() => {
          if (result.page - 1 >= 1) {
            changePage(result.page - 1);
          }
        }}
        $invisible={result.page - 1 < 1}
        $noBorder
        data-testid="pagenumber-left"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
      </Button>
      <Text>
        {result.page}/{result.total_pages}
      </Text>
      <Button
        onClick={() => {
          if (result.page + 1 <= result.total_pages) {
            changePage(result.page + 1);
          }
        }}
        $invisible={result.page + 1 > result.total_pages}
        $noBorder
        data-testid="pagenumber-right"
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
