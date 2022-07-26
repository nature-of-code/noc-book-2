import * as React from 'react';
import { graphql, Link } from 'gatsby';

export default function IndexPage({ data }) {
  return (
    <div className="px-4">
      <div className="my-8 mx-auto w-[640px] prose">
        <h1>Nature of Code</h1>
        <ul>
          {data.allChaptersJson.edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <Link to={`/${node.slug}`}>{node.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
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
