import { styled } from "styled-components";
import Spinner from "./Spinner";

const GrowingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Spinner />
    </div>
  );
};

export default styled(GrowingSpinner)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
