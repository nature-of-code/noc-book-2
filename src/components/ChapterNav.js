import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import TableOfContents from './TableOfContents';

const PageItem = (props) => {
  const { slug, title, type = 'page', children } = props;

  if (type === 'chapter') {
    const [chapterNumber, chapterTitle] = title.split('. ');
    return (
      <li>
        <Link
          to={`/${slug}/`}
          className="group relative flex items-center px-3 py-2 text-sm"
          activeClassName="font-bold"
        >
          <span className="w-8">{chapterNumber}</span>
          <span className="group-hover:underline">{chapterTitle}</span>
        </Link>

        {children}
      </li>
    );
  }

  return (
    <li>
      <Link
        to={`/${slug}/`}
        className="relative block px-3 py-2 text-sm hover:underline"
        activeClassName="font-bold"
      >
        {title}
      </Link>
    </li>
  );
};

const ChapterNav = (props) => {
  const { activeChapter = null, toc } = props;
  const data = useStaticQuery(graphql`
    query QueryChaptersLink {
      allBookSection {
        edges {
          node {
            id
            title
            type
            slug
          }
        }
      }
    }
  `);

  return (
    <nav className="rounded-3xl border border-noc-400">
      <ul className="divide-y divide-noc-400">
        {data.allBookSection.edges.map(({ node }) => {
          if (
            node.type === 'chapter' &&
            node.title.split('. ')[0] === activeChapter
          ) {
            return (
              <PageItem
                key={node.slug}
                slug={node.slug}
                title={node.title}
                type={node.type}
              >
                {node.type === 'chapter' &&
                  node.title.split('. ')[0] === activeChapter && (
                    <TableOfContents toc={JSON.parse(toc)} />
                  )}
              </PageItem>
            );
          }
          return (
            <PageItem
              key={node.slug}
              slug={node.slug}
              title={node.title}
              type={node.type}
            />
          );
        })}

        <PageItem key="example" slug="examples" title="Examples" />
      </ul>
    </nav>
  );
};

export default ChapterNav;
