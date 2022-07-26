module.exports = {
  siteMetadata: {
    title: `Nature of Code`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-postcss`,
  ],
};
