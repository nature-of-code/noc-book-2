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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: 'BookSection',
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
  ],
};
