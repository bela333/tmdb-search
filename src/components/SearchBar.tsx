import { styled } from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type SearchBarProps = {
    className?: string
}

const SearchButton = styled(Button)`
    aspect-ratio: 1/1;
    border: none;
    font-size: 1.5rem;
`;

const SearchBox = styled.input`
    background-color: transparent;
    border: none;
    font-size: 2rem;
    width: 100%;
    &:focus-visible{
        outline: none;
    }
    &:focus::placeholder{
        color: transparent;
    }
`

const SearchBar = ({className}: SearchBarProps):JSX.Element=>{
    return (<div className={className}>
        <SearchBox placeholder="Search..." title="Search box" />
        <SearchButton title="Search button"><FontAwesomeIcon icon={faSearch} /></SearchButton>
    </div>);
}

export default styled(SearchBar)`
display: flex;
flex-direction: row;
justify-content: center;
border-bottom: 1px solid var(--secondary);
&:focus-within{
    border-bottom-color: var(--secondary-selected);
}
background-color: white;
padding: 0.5rem;
`;