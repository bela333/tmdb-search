import { useState } from "react";
import { css, styled } from "styled-components";
import loading from "../assets/loading.jpg";

interface ThumbnailImageProps {
  /** Width of the image */
  $width: string;
  /** Should the image be hidden (for placeholder purposes) */
  $hide?: boolean;
}

const ThumbnailImage = styled.img<ThumbnailImageProps>`
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

type ThumbnailImageExtractedProps = Parameters<typeof ThumbnailImage>[0];

interface ThumbnailProps extends Omit<ThumbnailImageExtractedProps, "$hide"> {}

/** A thumbnail image with support for showing a placeholder "loading" image. */
const Thumbnail = (props: ThumbnailProps) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <div className={props.className}>
      {!showImage ? (
        <ThumbnailImage $width={props.$width} src={loading} $hide={showImage} />
      ) : null}
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
