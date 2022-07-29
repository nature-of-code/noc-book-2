import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Image = (props) => {
  const image = getImage(props.image);
  return <GatsbyImage image={image} alt={props.alt} />;
};

export default Image;
