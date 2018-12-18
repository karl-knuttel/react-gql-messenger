require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db           = require('./db');

const server = createServer();

// JWT

// Populate current user

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
