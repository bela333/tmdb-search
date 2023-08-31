import { useState } from "react";
import { css, styled } from "styled-components";
import loading from "../assets/loading.jpg";

const ThumbnailImage = styled.img<{ $width: string; $hide?: boolean }>`
  width: ${(props) => props.$width};
  height: auto;
  margin-bottom: 1rem;
  ${(props) => {
    if (props.$hide) {
      return css`
        display: none;
      `;
    }
  }}
`;

/**
 * Same parameter as used in the original styled `img` component.
 * Removed fields: `$show`
 */
type ThumbnailImageParam = Omit<Parameters<typeof ThumbnailImage>[0], "$show">;

interface ThumbnailProps extends ThumbnailImageParam {}

const Thumbnail = (props: ThumbnailProps) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <div className={props.className}>
      <ThumbnailImage $width={props.$width} src={loading} $hide={showImage} />
      <ThumbnailImage
        {...props}
        className={undefined}
        $hide={!showImage}
        onLoad={() => setShowImage(true)}
      />
    </div>
  );
};

export default Thumbnail;
