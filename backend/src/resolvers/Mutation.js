const { PUBSUB_NEW_MESSAGE } = require('../constants');

const Mutation = {
    async createMessage(parent, args, { db, pubsub }, info) {
        // Check if logged in

        const message = await db.mutation.createMessage(
            {
                data: {
                    ...args
                }
            },
            info
        );

        pubsub.publish(PUBSUB_NEW_MESSAGE, {
            newMessage: message
        });

        return message;
    }
};

module.exports = Mutation;
