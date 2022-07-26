import React from 'react';
import { graphql } from 'gatsby';

import { useRehypeProcessor } from '../hooks/useRehypeProcessor';

export default function ChapterLayout({ data }) {
  const { chaptersJson } = data;
  const body = useRehypeProcessor(chaptersJson.src.fields.html);

  return (
    <div className="px-4">
      <div className="my-8 mx-auto w-[640px] prose">{body}</div>
    </div>
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
