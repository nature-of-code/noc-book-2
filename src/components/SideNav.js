import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import TableOfContents from './TableOfContents';

const customTableOfContents = {
  'Additional Resources': [
    {
      id: 'ports-of-code-examples-to-other-languages',
      title: 'Code Ports',
    },
    {
      id: 'further-reading',
      title: 'Further Reading',
    },
  ],
};

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

      {children}
    </li>
  );
};

const SideNav = (props) => {
  const { activeChapter = null, toc } = props;

  // Only show the h2 headings as sub menus
  const tableOfContent = toc
    ? JSON.parse(toc).filter((heading) => heading.level === 'h2')
    : [];

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

  const pages = data.allBookSection.edges.map(({ node }) => node);

  return (
    <nav className="rounded-3xl border border-noc-200">
      <ul className="divide-y divide-noc-200">
        {pages.map((node) => {
          // Override the sub menu
          if (customTableOfContents[activeChapter]) {
            return (
              <PageItem
                key={node.slug}
                slug={node.slug}
                title={node.title}
                type={node.type}
              >
                {node.title === activeChapter && (
                  <TableOfContents
                    toc={customTableOfContents[activeChapter]}
                    highlight={false}
                  />
                )}
              </PageItem>
            );
          }

          if (node.type === 'chapter') {
            // Chapters match their number
            const [chapterNumber] = node.title.split('. ');

            return (
              <PageItem
                key={node.slug}
                slug={node.slug}
                title={node.title}
                type={node.type}
              >
                {chapterNumber === activeChapter && (
                  <TableOfContents toc={tableOfContent} />
                )}
              </PageItem>
            );
          }

          // Pages match their na
          return (
            <PageItem
              key={node.slug}
              slug={node.slug}
              title={node.title}
              type={node.type}
            >
              {node.title === activeChapter && tableOfContent.length > 0 && (
                <TableOfContents toc={tableOfContent} highlight={false} />
              )}
            </PageItem>
          );
        })}

        {/* Custom Pages: Examples / Exercises */}
        <PageItem key="example" slug="examples" title="Examples" />
        <PageItem key="exercise" slug="exercises" title="Exercises" />
      </ul>
    </nav>
  );
};

export default SideNav;
