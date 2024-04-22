import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Head = ({ title, description }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
    }
  `);

  const {
    site: {
      siteMetadata: {
        title: defaultTitle,
        siteUrl,
        description: defaultDescription,
      },
    },
  } = data;

  const metaDescription = description || defaultDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
      defaultTitle={defaultTitle}
      titleTemplate={`%s / ${defaultTitle}`}
    >
      <title>{title}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title ?? defaultTitle} />
      <meta property="og:description" content={metaDescription} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={title ?? defaultTitle} />
      <meta property="twitter:description" content={metaDescription} />
    </Helmet>
  );
};

export default React.memo(Head);
