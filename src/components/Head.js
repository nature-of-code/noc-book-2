import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';

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
      previewImage: file(relativePath: { eq: "cover.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1200
            height: 630
            transformOptions: { cropFocus: CENTER }
          )
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
  const previewImageSrc = `${siteUrl}${getSrc(data.previewImage)}`;

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
      <meta property="og:image" content={previewImageSrc} />
      <meta property="og:title" content={title ?? defaultTitle} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ?? defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={previewImageSrc} />
    </Helmet>
  );
};

export default React.memo(Head);
