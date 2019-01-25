const { PUBSUB_NEW_MESSAGE } = require('../constants');
const { forwardTo }  = require('prisma-binding');
const { withFilter } = require('graphql-yoga');

// const PUBSUB_NEW_MESSAGE = 'PUBSUB_NEW_MESSAGE';

const Subscription = {
    newMessage: {
        subscribe: async (parent, args, ctx, info) => {
            return await ctx.db.subscription.message(
                {
                    where: {
                        node: {
                            conversation: {
                                id : args.conversationId
                            }
                        }
                    }
                },
                info
            );
            // return null;
        }
    },
    newConversation: {
        subscribe: async (parent, args, ctx, info) => {
            return await ctx.db.subscription.conversation(
                {
                    where: {
                        AND: [
                            { mutation_in: ['CREATED'] },
                            {
                                node: {
                                    users_some: {
                                        id : args.userId
                                    }
                                }
                            }
                        ]
                    }
                },
                info
            );
        }
    }
};

module.exports = Subscription;
