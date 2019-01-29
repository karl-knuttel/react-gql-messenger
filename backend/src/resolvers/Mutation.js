const { PUBSUB_NEW_MESSAGE } = require('../constants');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

const Mutation = {
    async createMessage(parent, args, { db, request, pubsub }, info) {
        console.log(args);
        const message = await db.mutation.createMessage(
            {
                data: {
                    user: {
                        connect: {
                            id : request.userId
                        }
                    },
                    conversation: {
                        connect: {
                            id : args.conversation
                        }
                    },
                    text : args.text
                }
            },
            info
        );

        return message;
    },
    async createConversation(parent, { users }, ctx, info) {
        const conversation = await ctx.db.mutation.createConversation(
            {
                data: {
                    users: {
                        connect : [...users.map(id => ({ id }))]
                    }
                }
            },
            info
        );

        console.log(conversation);

        return conversation;
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
            httpOnly : true,
            maxAge   : 1000 * 60 * 60 * 24 * 365  // 1 year cookie
        });
        // return user to the browser
        return user;
    },
    async signin(parent, { email, password }, ctx, info) {
        // Check if user with that email exists
        const user = await ctx.db.query.user({ where: { email } });
        if (!user) {
            throw new Error(`No such user found for email ${email}`);
        }
        // check if their p/w is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password!');
        }
        // generate a JWT token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        //set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly : true,
            maxAge   : 1000 * 60 * 60 * 24 * 365
        });
        // return the user
        return user;
    },
    async updateUserActivity(parent, { id, lastActivity }, ctx, info) {
        const updatedUser = await ctx.db.mutation.updateUser({
            where: {
                id
            },
            data: {
                lastActivity
            },
            info
        });

        console.log(updatedUser);

        return updatedUser;
    }
};

module.exports = Mutation;
