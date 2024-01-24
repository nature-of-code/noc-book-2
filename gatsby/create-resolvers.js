module.exports = ({ createResolvers }) => {
  // Add images field
  const resolvers = {
    BookSection: {
      images: {
        type: ['File'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                relativeDirectory: {
                  eq: `images/${/[^/]*(?=.html)/.exec(source.src)[0]}`,
                },
                internal: { mediaType: { regex: '/^(image)/' } },
              },
            },
            type: 'File',
          });
          return entries;
        },
      },
    },
  };
  createResolvers(resolvers);
};
