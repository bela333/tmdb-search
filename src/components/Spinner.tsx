import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** An animated spinner */
const Spinner = ({ className }: { className?: string }) => {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      size="2xl"
      spin
      className={className}
      title="Spinner"
    />
  );
};

export default Spinner;
