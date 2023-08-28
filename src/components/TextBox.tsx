import { styled } from "styled-components";

const TextBox = styled.input`
border: none;
border-bottom: 1px solid var(--secondary);
font-size: 2em;
background-color: transparent;
&:focus-visible{
    outline: none;
}
&:focus{
    border-bottom: 1px solid var(--secondary-selected);
    &::placeholder{
        color: transparent;
    }
}
`;

export {TextBox};