module.exports = {
  siteMetadata: {
    title: `Nature of Code`,
    siteUrl: `https://natureofcode.com`,
    description: ``,
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
    `gatsby-transformer-json`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
  ],
};
