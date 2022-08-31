import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const ChapterNav = () => {
  const data = useStaticQuery(graphql`
    query QueryChaptersLink {
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
  `);

  return (
    <nav className="py-6">
      <ul className="space-y-1">
        {data.allChaptersJson.edges.map(({ node }) => {
          return (
            <li key={node.slug}>
              <Link
                to={`/${node.slug}/`}
                className="block font-semibold px-3 py-1 hover:underline"
                activeClassName="bg-gray-100 rounded-l"
              >
                {node.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ChapterNav;
