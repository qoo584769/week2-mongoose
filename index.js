const { createServer } = require('http');
const { app } = require('./app.js');
require('dotenv').config();

const server = createServer(app);
const port = process.env.PORT || 8080;
server.listen(port);