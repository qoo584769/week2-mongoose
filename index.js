const { createServer } = require('http');
const { app } = require('./app.js');

const server = createServer(app);
const port = 8080;
server.listen(process.env.PORT || port);
