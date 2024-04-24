import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FaBookOpen } from 'react-icons/fa';

import p5jsLogo from '../images/p5js_logo.svg';
import SideNavLayout from '../layouts/SideNavLayout';

export default function ExamplesPage({ data }) {
  return (
    <SideNavLayout title="Examples">
      {data.allBookSection.edges.map(({ node: chapter }, index) => {
        return (
          <section key={chapter.id}>
            <h2 className={`${index === 0 && 'mt-0'}`}>
              Chapter {chapter.title}
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {chapter.src.childrenExample.map((example) => {
                const screenshot = getImage(example.screenshot);

                const [exampleNumber, exampleName] = example.title.split(': ');

                return (
                  <div key={example.id} className="not-prose">
                    <Link
                      to={`/${chapter.slug}/#${example.slug}`}
                      className="group"
                    >
                      <GatsbyImage
                        image={screenshot}
                        className="aspect-[8/3] rounded-3xl border object-cover"
                        alt="p5.js sketch screenshot"
                      />
                      <div className="px-2 pt-2 text-sm font-semibold group-hover:underline">
                        {exampleNumber}
                      </div>
                    </Link>

                    <div className="mt-0.5 px-2">
                      <div className="text-sm">{exampleName}</div>

                      <div className="flex items-center gap-2">
                        <Link to={`/${chapter.slug}/#${example.slug}`}>
                          <FaBookOpen className="text-noc-200 h-8 w-5 py-2" />
                        </Link>

                        <a href={example.webEditorURL}>
                          <img
                            src={p5jsLogo}
                            alt="p5.js icon"
                            className="inline-block w-8 py-2"
                          ></img>
                        </a>
                      </div>
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
