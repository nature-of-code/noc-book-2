import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import useActiveId from '../hooks/useActiveId';

const TableOfContent = ({ toc }) => {
  const activeId = useActiveId(
    toc
      .filter(({ level }) => level === 'h1' || level === 'h2')
      .map(({ id }) => id),
  );

  return (
    <ul className="space-y-3 my-4 ml-2 border-l-2">
      {toc
        .filter(({ level }) => level === 'h2')
        .map(({ id, title }) => {
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-sm text-gray-500 hover:underline pl-3 -ml-0.5 border-l-2 ${
                  activeId === id &&
                  'border-noc-400 text-gray-800 font-semibold'
                }`}
              >
                {title}
              </a>
            </li>
          );
        })}
    </ul>
  );
};

const SideBar = ({ activeSlug, toc }) => {
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
    <aside className="sticky max-w-[14em] w-full top-1 hidden lg:block">
      <ul className="my-4 space-y-2">
        {data.allChaptersJson.edges.map(({ node }) => {
          return (
            <li key={node.slug}>
              <Link
                to={`/${node.slug}/`}
                className="block font-semibold hover:underline"
              >
                {node.title}
              </Link>
              {activeSlug === node.slug && <TableOfContent toc={toc} />}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;
