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
          {data.allChaptersJson.edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <Link to={`/${node.slug}/`}>{node.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export const query = graphql`
  query QueryChapters {
    allChaptersJson {
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
