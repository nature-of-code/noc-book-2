import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { useRehypeProcessor } from '../hooks/useRehypeProcessor';

export default function ChapterLayout({ data }) {
  const { chaptersJson } = data;
  const body = useRehypeProcessor(chaptersJson.src.fields.html);

  return (
    <Layout title={chaptersJson.title}>
      <div className="my-8 mx-auto w-[640px] prose">{body}</div>
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
    }
  }
`;
