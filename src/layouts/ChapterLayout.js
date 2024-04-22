import React from 'react';
import { graphql } from 'gatsby';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import rehypeReact from 'rehype-react';

import SideNavLayout from './SideNavLayout';
import PrevNextButtons from '../components/PrevNextButtons';
import Image from '../components/Image';
import Example from '../components/Example';

const renderAst = ({ ast, images }) => {
  visit(ast, { tagName: 'img' }, (node) => {
    const relativePath = node.properties.src;
    // If the image src exist as a local file
    // use Gatsby Image to handle
    const imageSharp = images.find(
      (image) => image.relativePath === relativePath,
    );
    if (imageSharp) {
      node.tagName = 'gatsby-image';
      node.properties.image = imageSharp;
    }
  });

  const processor = unified().use(rehypeReact, {
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      'gatsby-image': Image,
      'embed-example': Example,
    },
  });

  return processor.stringify(ast);
};

export default function ChapterLayout({ data }) {
  const { chapter, previous, next } = data;

  const { htmlAst, toc, description } = chapter.src.fields;

  return (
    <SideNavLayout title={chapter.title} toc={toc} description={description}>
      {renderAst({
        ast: JSON.parse(htmlAst),
        images: chapter.images,
      })}
      <hr />

      <PrevNextButtons previous={previous} next={next} />
    </SideNavLayout>
  );
}

export const query = graphql`
  query ChapterById($id: String!, $previousId: String, $nextId: String) {
    chapter: bookSection(id: { eq: $id }) {
      id
      slug
      title
      src {
        fields {
          htmlAst
          toc
          description
        }
      }
      images {
        relativePath
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    previous: bookSection(id: { eq: $previousId }) {
      slug
      title
    }
    next: bookSection(id: { eq: $nextId }) {
      slug
      title
    }
  }
`;
