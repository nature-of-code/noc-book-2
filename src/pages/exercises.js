import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FaBookOpen } from 'react-icons/fa';

import p5jsLogo from '../images/p5js_logo.svg';
import SideNavLayout from '../layouts/SideNavLayout';

export default function ExercisesPage({ data }) {
  return (
    <SideNavLayout title="Exercises">
      {data.allBookSection.edges.map(({ node: chapter }, index) => {
        if (chapter.src.childrenExercise.length === 0) return null;

        return (
          <section key={chapter.id}>
            <h2 className={`${index === 0 && 'mt-0'}`}>
              Chapter {chapter.title}
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {chapter.src.childrenExercise.map((exercise) => {
                const screenshot = getImage(exercise.screenshot);

                const [exerciseNumber, exerciseName] =
                  exercise.title.split(': ');

                return (
                  <div key={exercise.id} className="not-prose">
                    <Link
                      to={`/${chapter.slug}/#${exercise.slug}`}
                      className="group"
                    >
                      <GatsbyImage
                        image={screenshot}
                        className="aspect-[8/3] rounded-3xl border object-cover"
                        alt="p5.js sketch screenshot"
                      />
                      <div className="px-2 pt-2 text-sm font-semibold group-hover:underline">
                        {exerciseNumber}
                      </div>
                    </Link>

                    <div className="mt-0.5 px-2">
                      <div className="text-sm">{exerciseName}</div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/${chapter.slug}/#${exercise.slug}`}
                          aria-label="link to chapter"
                        >
                          <FaBookOpen className="h-8 w-5 py-2 text-noc-200" />
                        </Link>

                        <a
                          href={exercise.webEditorURL}
                          aria-label="link to p5 editor"
                        >
                          <img
                            src={p5jsLogo}
                            alt=""
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
  query QueryChaptersExercise {
    allBookSection(filter: { type: { eq: "chapter" } }) {
      edges {
        node {
          id
          title
          slug
          src {
            childrenExercise {
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
