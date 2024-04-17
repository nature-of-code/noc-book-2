import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import p5jsLogo from '../images/p5js_logo.svg';
import SideNavLayout from '../layouts/SideNavLayout';

export default function ExamplesPage({ data }) {
  return (
    <SideNavLayout title="Examples">
      {data.allBookSection.edges.map(({ node: chapter }) => {
        return (
          <section key={chapter.id}>
            <h2 className="mt-0">Chapter {chapter.title}</h2>

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
    </SideNavLayout>
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
