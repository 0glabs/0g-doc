import React from 'react';

interface CenteredImageProps {
  src: string;
  alt: string;
  maxWidth?: string;
}

const CenteredImage: React.FC<CenteredImageProps> = ({ src, alt, maxWidth = '100%' }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        display: 'block',
        margin: 'auto',
        maxWidth: maxWidth,
      }}
    />
  );
};

export default CenteredImage;