import React from 'react';
import { graphql } from 'gatsby';
import { unified } from 'unified';
import rehypeReact from 'rehype-react';

import { parseContent } from '../utils/parseContent';

import Head from '../components/Head';
import Header from '../components/Header';
import ChapterNav from '../components/ChapterNav';
import TableOfContents from '../components/TableOfContents';
import PrevNextButtons from '../components/PrevNextButtons';
import Image from '../components/Image';
import Example from '../components/Example';

const renderAst = (ast) => {
  const processor = unified().use(rehypeReact, {
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      'gatsby-image': Image,
      'embed-example': Example,
    },
  });

  return processor.stringify(ast);
};

export default function ChapterLayout({ data }) {
  const { chapter, previous, next } = data;

  const { ast, toc } = parseContent({
    html: chapter.src.fields.html,
    images: chapter.images,
  });

  return (
    <>
      <Head title={chapter.title} />

      <Header />

      <div className="max-w-7xl mx-auto">
        <aside className="fixed z-10 top-[5em] bottom-0 left-[max(1.5em,calc(50%-40rem))] overflow-y-auto hidden lg:block max-w-[14.25em] w-full border-r -ml-3">
          <ChapterNav />
        </aside>

        <div className="lg:pl-[15em]">
          <main className="max-w-3xl xl:mr-[17em] prose mx-auto overflow-hidden py-8 px-6">
            {renderAst(ast)}

            <hr />

            <PrevNextButtons previous={previous} next={next} />
          </main>

          <aside className="fixed z-10 top-[5em] bottom-0 right-[max(1.5em,calc(50%-40rem))] overflow-y-auto hidden xl:block max-w-[15.5em] w-full">
            <TableOfContents toc={toc} />
          </aside>
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query ChapterById($id: String!, $previousId: String, $nextId: String) {
    chapter: chaptersJson(id: { eq: $id }) {
      id
      slug
      title
      src {
        fields {
          html
        }
      }
      images {
        relativePath
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    previous: chaptersJson(id: { eq: $previousId }) {
      slug
      title
    }
    next: chaptersJson(id: { eq: $nextId }) {
      slug
      title
    }
  }
`;
