import React from 'react';
import { graphql } from 'gatsby';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import rehypeReact from 'rehype-react';

import Head from '../components/Head';
import Header from '../components/Header';
import ChapterNav from '../components/ChapterNav';
import TableOfContents from '../components/TableOfContents';
import PrevNextButtons from '../components/PrevNextButtons';
import Image from '../components/Image';
import Example from '../components/Example';

const renderAst = ({ ast, images }) => {
  visit(ast, { tagName: 'img' }, (node) => {
    const relativePath = node.properties.src;
    // If the image src exist as a local file
    // use Gatsby Image to handle
    const imageSharp = images.find(
      (image) => image.relativePath === relativePath,
    );
    if (imageSharp) {
      node.tagName = 'gatsby-image';
      node.properties.image = imageSharp;
    }
  });

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

  const { htmlAst, toc } = chapter.src.fields;

  return (
    <>
      <Head title={chapter.title} />

      <Header />

      <div className="px-6">
        <div className="max-w-7xl mx-auto">
          <aside className="fixed z-10 top-[5em] bottom-0 left-[max(1.5em,calc(50%-40rem))] overflow-y-auto hidden lg:block max-w-[13.75em] w-full border-r -ml-3">
            <ChapterNav />
          </aside>

          <div className="lg:pl-[15em] lg:pr-2 xl:pr-0">
            <main className="max-w-[48em] xl:mr-[17em] prose mx-auto overflow-hidden py-8">
              {renderAst({
                ast: JSON.parse(htmlAst),
                images: chapter.images,
              })}
              <hr />

              <PrevNextButtons previous={previous} next={next} />
            </main>

            <aside className="fixed z-10 top-[5em] bottom-0 right-[max(1.5em,calc(50%-40rem))] overflow-y-auto hidden xl:block max-w-[15em] w-full">
              <TableOfContents toc={JSON.parse(toc)} />
            </aside>
          </div>
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
          htmlAst
          toc
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
