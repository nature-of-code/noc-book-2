import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import Example from '../components/Example';

export default function PostLayout({ data }) {
  const { body } = data.mdx;
  return (
    <div className="px-4">
      <MDXProvider components={{ Example }}>
        <div className="my-8 mx-auto w-[640px] prose">
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </MDXProvider>
    </div>
  );
}

export const query = graphql`
  query PostBySlug($id: String!) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`;
