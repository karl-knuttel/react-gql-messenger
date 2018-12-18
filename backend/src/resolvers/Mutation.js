const Mutation = {
    async createMessage(parent, args, ctx, info) {
        // Check if logged in

        const message = await ctx.db.mutation.createMessage(
            {
                data: {
                    ...args
                }
            },
            info
        );

        return message;
    }
};

module.exports = Mutation;
