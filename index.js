const { createServer } = require('http');
const { app } = require('./app.js');

const server = createServer(app);
const port = process.env.PORT || 8080;
server.listen(port);
