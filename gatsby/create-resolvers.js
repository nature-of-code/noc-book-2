// Add images field to each ChaptersJson node
module.exports = ({ createResolvers }) => {
  const resolvers = {
    ChaptersJson: {
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
