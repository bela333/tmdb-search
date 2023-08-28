import { styled } from "styled-components";
import { Button } from "./Button";
import { TextBox } from "./TextBox";

type SearchBarProps = {
    className?: string
}

const SearchBar = ({className}: SearchBarProps):JSX.Element=>{
    return (<div className={className}>
        <TextBox />
        <Button>Search</Button>
    </div>);
}

const StyledSearchBar = styled(SearchBar)`
display: flex;
flex-direction: row;
`;

export {StyledSearchBar as SearchBar}