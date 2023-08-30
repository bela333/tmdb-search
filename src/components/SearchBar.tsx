import { styled } from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SearchButton = styled(Button)`
  border: none;
  font-size: 1.5rem;
`;

const SearchBox = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  &:focus-visible {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
  @media screen and (min-width: 425px) {
    font-size: 2rem;
  }
  font-size: 1.5rem;
`;

type SearchBarProps = {
  className?: string;
  setText?: (text: string) => void;
};

const SearchBar = ({
  className,
  setText: exportText,
}: SearchBarProps): JSX.Element => {
  const [text, setText] = useState("");

  const onSubmit = () => {
    if (exportText) {
      exportText(text);
    }
  };

  return (
    <form
      className={className}
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit();
      }}
    >
      <SearchBox
        placeholder="Search..."
        title="Search box"
        onChange={(ev) => setText(ev.target.value)}
        value={text}
        name="moviename"
        autoFocus
      />
      <SearchButton title="Search button" type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </SearchButton>
    </form>
  );
};

export default styled(SearchBar)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid var(--secondary);
  &:focus-within {
    border-bottom-color: var(--secondary-selected);
  }
  background-color: var(--background-secondary);
  padding: 0.5rem;
  transition: border-bottom-color 0.3s;
`;
