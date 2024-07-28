module.exports = {
  siteMetadata: {
    title: `Nature of Code`,
    siteUrl: `https://natureofcode.com`,
    description: `Simulating Natural Systems with JavaScript`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: 'BookSection',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nature of Code`,
        start_url: `/`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: [
          'SHOPIFY_DOMAIN',
          'SHOPIFY_ACCESS_TOKEN',
          'SHOPIFY_PRODUCT_ID',
        ],
      },
    },
  ],
};
