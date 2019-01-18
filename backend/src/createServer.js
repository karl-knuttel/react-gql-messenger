const { GraphQLServer, withFilter, PubSub } = require('graphql-yoga');
const Mutation     = require('./resolvers/Mutation');
const Query        = require('./resolvers/Query');
const Subscription = require('./resolvers/Subscription');
const db           = require('./db');

const pubsub = new PubSub();

// Create GraphQL Yoga Server
function createServer() {
    return new GraphQLServer({
        typeDefs : 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query,
            Subscription
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context: req => ({ ...req, db, pubsub })
        // context: req => ({ ...req, db })
    });
}

module.exports = createServer;
