import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';

import { transformContent } from '../utils/transformContent';

export default function ChapterLayout({ data }) {
  const { chaptersJson: chapter } = data;

  const { result: body } = transformContent({
    html: chapter.src.fields.html,
    images: chapter.images,
  });

  return (
    <Layout title={chapter.title}>
      <div className="my-8 mx-auto prose">{body}</div>
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
