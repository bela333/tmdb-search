import { css, styled } from "styled-components";
import { Text } from "./Text";
import Thumbnail from "./Thumbnail";

interface ListItemProps {
  className?: string;
  /** Title of this tile (shown in bold) */
  title: string;
  /** Subtitle of this tile (shown with thin letters) */
  subtitle?: string;
  /** An optional thumbnail shown above the titles */
  thumbnail?: string;
  /** A callback called, when this tile is clicked */
  onClick?: () => void;
  /** Show ellipses if the title is about to be cut off */
  cutoff?: boolean;
}

const ListItem = ({
  className,
  subtitle,
  thumbnail,
  title,
  onClick,
  cutoff,
}: ListItemProps) => {
  return (
    <a
      className={className}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      href="#"
    >
      {thumbnail ? <Thumbnail $width="100%" src={thumbnail} /> : null}
      <Text $cutoff={cutoff}>{title}</Text>
      {subtitle ? (
        <Text $thin $italic>
          {subtitle}
        </Text>
      ) : null}
    </a>
  );
};

/** A single item in `MovieList`. Not necessarily for a movie */
export default styled(ListItem)`
  text-decoration: none;
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
