import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const SideBar = () => {
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
    <aside className="sticky top-1 hidden md:block">
      <ul className="my-4 space-y-2 border-l-2">
        {data.allChaptersJson.edges.map(({ node }) => {
          return (
            <li key={node.slug}>
              <Link
                to={`/${node.slug}/`}
                className="block font-semibold text-sm hover:underline pl-3 -ml-0.5 border-l-2"
                activeClassName="border-noc-400"
              >
                {node.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;
