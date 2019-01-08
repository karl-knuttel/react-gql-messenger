const { PUBSUB_NEW_MESSAGE } = require('../constants');

const Subscription = {
    newMessage: {
        subscribe: (parent, args, { pubsub }) => {
            return pubsub.asyncIterator(PUBSUB_NEW_MESSAGE);
        }
    }
};

module.exports = Subscription;
