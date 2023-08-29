import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = ()=>{
    return (<FontAwesomeIcon icon={faSpinner} size="2xl" spin/>)
}

export default Loading;