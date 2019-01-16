const { forwardTo } = require('prisma-binding');

const Query = {
    users        : forwardTo('db'),
    messages     : forwardTo('db'),
    conversations: forwardTo('db'),
    me(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            // If a current user ID doesn't exist, return null
            return null;
        }
        // Otherwise return the user whose ID matches the current user ID
        return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
    }
};

module.exports = Query;
