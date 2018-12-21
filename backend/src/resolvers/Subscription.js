const { forwardTo } = require('prisma-binding');
const { PUBSUB_NEW_MESSAGE } = require('../constants');

// const pubsub = new PubSub();

// const Subscription = {
//     message: {
//         subscribe: forwardTo('db')
//     }
// };

const Subscription = {
    newMessage: {
        subscribe: (parent, args, { pubsub }) => {
            return pubsub.asyncIterator(PUBSUB_NEW_MESSAGE);
        }
    }
};

module.exports = Subscription;
