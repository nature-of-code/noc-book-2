import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import p5jsLogo from '../images/p5js_logo.svg';

import Head from '../components/Head';
import Header from '../components/Header';
import ChapterNav from '../components/ChapterNav';

export default function ExamplesPage({ data }) {
  return (
    <>
      <Head title="Examples" />

      <Header />

      <div className="px-6">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[minmax(0,14em)_minmax(48em,1fr)] lg:gap-6 xl:grid-cols-[minmax(0,14em)_minmax(48em,1fr)_minmax(0,14em)]">
          <aside className="sticky top-[5em] z-10 -ml-3 hidden max-h-[calc(100vh-5em)] overflow-y-auto border-r lg:block">
            <ChapterNav />
          </aside>

          <main className="prose mx-auto w-full overflow-hidden py-8 lg:max-w-[48em] xl:col-span-2 xl:max-w-[63.5em]">
            <h1>Chapter Examples</h1>
            {data.allBookSection.edges.map(({ node: chapter }) => {
              return (
                <section key={chapter.id}>
                  <h2>Chapter {chapter.title}</h2>

                  <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
                    {chapter.src.childrenExample.map((example) => {
                      const screenshot = getImage(example.screenshot);

                      return (
                        <div key={example.id}>
                          <GatsbyImage
                            image={screenshot}
                            className="aspect-[8/3] rounded border object-cover"
                            alt="p5.js sketch screenshot"
                          />
                          <div className="not-prose py-2">
                            <Link
                              to={`/${chapter.slug}/#${example.slug}`}
                              className="hover:underline"
                            >
                              <span className="font-bold">{example.title}</span>
                            </Link>
                            <br></br>

                            <a href={example.webEditorURL}>
                              <img
                                src={p5jsLogo}
                                alt="p5.js icon"
                                className="inline-block h-10 w-8"
                              ></img>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </main>
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query QueryChaptersExample {
    allBookSection(filter: { type: { eq: "chapter" } }) {
      edges {
        node {
          id
          title
          slug
          src {
            childrenExample {
              id
              title
              slug
              relativeDirectory
              webEditorURL
              screenshot {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  }
`;
