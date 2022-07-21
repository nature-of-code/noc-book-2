module.exports = {
  siteMetadata: {
    title: `Nature of Code`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        gatsbyRemarkPlugins: ['gatsby-remark-prismjs'],
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
