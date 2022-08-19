import React from 'react';
import { graphql } from 'gatsby';
import { unified } from 'unified';
import rehypeReact from 'rehype-react';

import { parseContent } from '../utils/parseContent';

import Layout from '../components/Layout';
import SideBar from '../components/SideBar';
import Image from '../components/Image';
import Example from '../components/Example';

const renderAst = (ast) => {
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
  const { chaptersJson: chapter } = data;

  const { ast, toc } = parseContent({
    html: chapter.src.fields.html,
    images: chapter.images,
  });

  return (
    <Layout title={chapter.title}>
      <div className="mx-auto lg:flex justify-center items-start lg:space-x-8">
        <SideBar toc={toc} activeSlug={chapter.slug} />
        <div className="my-8 mx-auto max-w-3xl prose">{renderAst(ast)}</div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ChapterById($id: String!) {
    chaptersJson(id: { eq: $id }) {
      id
      slug
      title
      src {
        fields {
          html
        }
      }
      images {
        relativePath
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;
