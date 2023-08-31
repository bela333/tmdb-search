import { styled } from "styled-components";
import { Link, Text } from "./Text";

interface WelcomeProps {
  className?: string;
}

const Welcome = ({ className }: WelcomeProps) => {
  return (
    <div className={className}>
      <Text $fontSize="1.5em" $bottomMargin="1em">
        Welcome to this{" "}
        <Link
          as="a"
          href="https://www.themoviedb.org/"
          target="_blank"
          $underlined
        >
          TheMovieDB
        </Link>{" "}
        search engine!
      </Text>
      <Text>
        Made using{" "}
        <Link
          as="a"
          href="https://fontawesome.com/"
          target="_blank"
          $underlined
        >
          Font Awesome
        </Link>
      </Text>
      <Text>
        Made by{" "}
        <Link
          as="a"
          href="https://github.com/bela333"
          target="_blank"
          $underlined
        >
          Marton Zoltán
        </Link>
      </Text>
    </div>
  );
};

export default styled(Welcome)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
