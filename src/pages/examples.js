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
        <div className="max-w-7xl mx-auto lg:grid xl:grid-cols-[minmax(0,14em)_minmax(48em,1fr)_minmax(0,14em)] lg:grid-cols-[minmax(0,14em)_minmax(48em,1fr)] lg:gap-6">
          <aside className="sticky z-10 top-[5em] max-h-[calc(100vh-5em)] overflow-y-auto hidden lg:block border-r -ml-3">
            <ChapterNav />
          </aside>

          <main className="lg:max-w-[48em] xl:max-w-[63.5em] prose w-full mx-auto overflow-hidden py-8 xl:col-span-2">
            <h1>Chapter Examples</h1>
            {data.allBookSection.edges.map(({ node: chapter }) => {
              return (
                <section key={chapter.id}>
                  <h2>Chapter {chapter.title}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6">
                    {chapter.src.childrenExample.map((example) => {
                      const screenshot = getImage(example.screenshot);

                      return (
                        <div key={example.id}>
                          <GatsbyImage
                            image={screenshot}
                            className="border rounded aspect-[8/3] object-cover"
                            alt="p5.js sketch screenshot"
                          />
                          <div className="py-2 not-prose">
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
                                className="w-8 h-10 inline-block"
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
