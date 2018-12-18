const { forwardTo } = require('prisma-binding');

const Query = {
    messages: forwardTo('db')
};

module.exports = Query;
