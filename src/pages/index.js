import * as React from 'react';
import { graphql, Link } from 'gatsby';

import Head from '../components/Head';
import Header from '../components/Header';

export default function IndexPage({ data }) {
  return (
    <>
      <Head />

      <Header />

      <div className="py-8 px-6 mx-auto prose">
        <ul>
          {data.allBookSection.edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <Link to={`/${node.slug}/`}>{node.title}</Link>
              </li>
            );
          })}
          <li key="examples">
            <Link to={`/examples/`}>Examples</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export const query = graphql`
  query QueryChapters {
    allBookSection {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`;
