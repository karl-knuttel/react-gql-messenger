const { PUBSUB_NEW_MESSAGE } = require('../constants');
const { forwardTo }  = require('prisma-binding');
const { withFilter } = require('graphql-yoga');

// const PUBSUB_NEW_MESSAGE = 'PUBSUB_NEW_MESSAGE';

const Subscription = {
    // newMessage: {
    //     subscribe: (parent, args, { pubsub }) => {
    //         console.log('listening: ', args);
    //         return pubsub.asyncIterator(PUBSUB_NEW_MESSAGE);
    //     }
    // }

    // newMessage: {
    //     subscribe: async (parent, args, ctx, info) => {
    //         const subscription = await ctx.db.subscription.link({}, info);

    //         const filteredSubscription = withFilter(
    //             ()                   => subscription,
    //             (payload, variables) => {
    //                 return true;
    //             }
    //         );

    //         return filteredSubscription(parent, args, ctx, info);
    //     }
    // }

    newMessage: {
        subscribe: async (parent, args, ctx, info) => {
            return await ctx.db.subscription.message(
                {
                    where: {
                        node: {
                            conversation: {
                                id: args.conversationId
                            }
                        }
                    }
                },
                info
            );
        }
    }
};

module.exports = Subscription;
