import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { FiChevronDown, FiExternalLink } from 'react-icons/fi';

const OverlayNav = () => {
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

  const [chapterListOpen, setChapterListOpen] = React.useState(false);

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
    <nav className="fixed bottom-0 left-0 right-0 top-[5em] z-20 overflow-y-auto bg-white px-6 lg:hidden">
      <ul className="my-7 space-y-2">
        {pages.slice(0, introductionPageIndex + 1).map((node) => {
          return (
            <li key={node.slug}>
              <Link
                to={`/${node.slug}/`}
                className="text-lg text-gray-800"
                activeClassName="font-bold"
              >
                {node.title}
              </Link>
            </li>
          );
        })}

        <li key="chapters">
          <button
            className="flex items-center gap-2 text-lg text-gray-800"
            onClick={() => setChapterListOpen(!chapterListOpen)}
          >
            <span>Chapters</span>
            <FiChevronDown
              className="h-5 w-5 transition-transform"
              style={{
                // flip icon vertically when open
                transform: `scaleY(${chapterListOpen ? -1 : 1})`,
              }}
            />
          </button>

          {chapterListOpen && (
            <ul className="space-y-2 py-2 pl-4">
              {chapters.map((node) => {
                const [chapterNumber, chapterTitle] = node.title.split('. ');
                return (
                  <li key={node.slug}>
                    <Link
                      to={`/${node.slug}/`}
                      className="flex items-center text-gray-600"
                      activeClassName="font-bold"
                    >
                      <span className="w-8">{chapterNumber}</span>
                      <span>{chapterTitle}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>

        {pages.slice(introductionPageIndex + 1).map((node) => {
          return (
            <li key={node.slug}>
              <Link
                to={`/${node.slug}/`}
                className="text-lg text-gray-800"
                activeClassName="font-bold"
              >
                {node.title}
              </Link>
            </li>
          );
        })}

        {data.site.siteMetadata.customNavLinks.map(({ slug, title }) => {
          return (
            <li key={slug}>
              <Link
                to={`/${slug}/`}
                className="text-lg text-gray-800"
                activeClassName="font-bold"
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="my-7 space-y-2">
        <li key="support">
          <a
            href="https://github.com/sponsors/CodingTrain"
            className="flex items-center gap-1 text-lg text-gray-800"
          >
            Support
            <FiExternalLink className="w-3.5 text-gray-400" />
          </a>
        </li>
        <li key="github">
          <a
            href="https://github.com/nature-of-code/noc-book-2"
            className="flex items-center gap-1 text-lg text-gray-800"
          >
            GitHub
            <FiExternalLink className="w-3.5 text-gray-400" />
          </a>
        </li>
        <li key="coding-train">
          <a
            href="https://thecodingtrain.com/"
            className="flex items-center gap-1 text-lg text-gray-800"
          >
            Coding Train
            <FiExternalLink className="w-3.5 text-gray-400" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default OverlayNav;
