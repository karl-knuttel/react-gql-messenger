const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db           = require('./db');
const jwt          = require('jsonwebtoken');

const server = createServer();

// JWT
server.express.use(cookieParser());

// Populate current user
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
              req.userId = userId;
    }
    next();
});

// Start the server with CORS (so not just anyone can access our DB)
server.start(
    {
        cors: {
            credentials: true,
            origin     : process.env.FRONTEND_URL
        }
    },
    deets => {
        console.log(`Server is now running on http://localhost:${deets.port}`);
    }
);
