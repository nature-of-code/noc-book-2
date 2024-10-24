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

const SideNav = (props) => {
  const { activeChapter = null, toc } = props;
  const data = useStaticQuery(graphql`
    query QueryChaptersLink {
      site {
        siteMetadata {
          customNavLinks {
            slug
            title
          }
        }
      }
      allBookSection(filter: { fields: { isPreserved: { eq: false } } }) {
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

  const pages = data.allBookSection.edges
    .filter(({ node }) => node.type === 'page')
    .map(({ node }) => node);

  const introductionPageIndex = pages.findIndex(
    (node) => node.title === 'Introduction',
  );

  const chapters = data.allBookSection.edges
    .filter(({ node }) => node.type === 'chapter')
    .map(({ node }) => node);

  return (
    <nav className="rounded-3xl border border-noc-200">
      <ul className="divide-y divide-noc-200">
        {pages.slice(0, introductionPageIndex + 1).map((node) => {
          return (
            <PageItem
              key={node.slug}
              slug={node.slug}
              title={node.title}
              type={node.type}
            />
          );
        })}

        {chapters.map((node) => {
          const [chapterNumber] = node.title.split('. ');

          return (
            <PageItem
              key={node.slug}
              slug={node.slug}
              title={node.title}
              type={node.type}
            >
              {node.type === 'chapter' && chapterNumber === activeChapter && (
                <TableOfContents toc={JSON.parse(toc)} />
              )}
            </PageItem>
          );
        })}

        {pages.slice(introductionPageIndex + 1).map((node) => {
          return (
            <PageItem
              key={node.slug}
              slug={node.slug}
              title={node.title}
              type={node.type}
            />
          );
        })}

        {data.site.siteMetadata.customNavLinks.map(({ slug, title }) => {
          return <PageItem key={slug} slug={slug} title={title} />;
        })}
      </ul>
    </nav>
  );
};

export default SideNav;
