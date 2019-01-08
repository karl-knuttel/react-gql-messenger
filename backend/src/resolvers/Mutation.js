const { PUBSUB_NEW_MESSAGE } = require('../constants');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

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
    },
    async signup(parent, args, ctx, info) {
        // lowercase their email
        args.email = args.email.toLowerCase();
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create user in DB
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    ...args,
                    password
                }
            },
            info
        );
        // create jwt token for user
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge  : 1000 * 60 * 60 * 24 * 365  // 1 year cookie
        });
        // return user to the browser
        return user;
    }
};

module.exports = Mutation;
