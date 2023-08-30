import { css, styled } from "styled-components";
import { Movie } from "../schemas/movie";
import { Text } from "./Text";

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const ListItem = ({
  className,
  subtitle,
  thumbnail,
  title,
  onClick,
}: {
  className?: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  onClick?: () => void;
}) => {
  return (
    <a
      className={className}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {thumbnail ? <Thumbnail src={thumbnail} /> : null}
      <Text $cutoff>{title}</Text>
      {subtitle ? (
        <Text $thin $italic>
          {subtitle}
        </Text>
      ) : null}
    </a>
  );
};

export default styled(ListItem)`
  border: 1px solid var(--secondary);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 1rem;
  display: block;
  ${(props) => {
    if (props.onClick) {
      return css`
        cursor: pointer;
        &:hover {
          box-shadow: 5px 5px 5px gray;
        }
      `;
    }
  }}
  text-align: center;
  scroll-snap-align: center;
  background-color: var(--background-secondary);
  border-radius: 0.5rem;
  transition: box-shadow 0.15s;
  box-shadow: 2px 2px 5px gray;
  min-width: 80vw;
  @media screen and (min-width: 425px) {
    min-width: 10rem;
    max-width: 10rem;
    height: 20rem;
    margin-bottom: 1rem;
  }
`;
