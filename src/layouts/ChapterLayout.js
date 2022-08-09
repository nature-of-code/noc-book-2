import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SideBar from '../components/SideBar';

import { transformContent } from '../utils/transformContent';

export default function ChapterLayout({ data }) {
  const { chaptersJson: chapter } = data;

  const { result: body } = transformContent({
    html: chapter.src.fields.html,
    images: chapter.images,
  });

  return (
    <Layout title={chapter.title}>
      <div className="mx-auto md:flex justify-center items-start md:space-x-8">
        <SideBar />
        <div className="my-8 prose">{body}</div>
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
