import * as React from 'react';
import { graphql } from 'gatsby';
import { unified } from 'unified';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import rehypeReact from 'rehype-react';

import Head from '../components/Head';
import Header from '../components/Header';
import Example from '../components/Example';

const renderAst = (ast) => {
  const examples = [];
  visit(ast, { tagName: 'embed-example' }, (node) => {
    examples.push(node);
  });

  const tree = h(
    'div',
    examples.map((node) => {
      node.properties.pauseAtBeginning = true;

      return h(
        'div',
        {
          style: {
            border: '1px dotted black',
            margin: '12px 0',
            padding: '0 16px',
          },
        },
        [
          h(
            'p',
            {
              style: {
                fontWeight: 'bold',
              },
            },
            node.properties.dataExamplePath,
          ),
          node,
          h('img', {
            class: 'border',
            src: `/${node.properties.dataExamplePath}/screenshot.png`,
            alt: 'screenshot',
          }),
        ],
      );
    }),
  );

  const processor = unified().use(rehypeReact, {
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      'embed-example': Example,
    },
  });

  return processor.stringify(tree);
};

export default function ExamplesPage({ data }) {
  return (
    <>
      <Head />

      <Header />

      <div className="py-8 max-w-[676px] prose mx-auto">
        {data.allChaptersJson.edges.map(({ node }) => {
          const { htmlAst } = node.src.fields;

          return (
            <div key={node.src.id}>
              <h3>{node.title}</h3>
              {renderAst(JSON.parse(htmlAst))}
            </div>
          );
        })}
      </div>
    </>
  );
}

export const query = graphql`
  query AllExample {
    allChaptersJson {
      edges {
        node {
          title
          src {
            id
            fields {
              htmlAst
            }
          }
        }
      }
    }
  }
`;
