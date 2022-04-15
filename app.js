const {
  getTodo,
  postTodo,
  editTodo,
  deleteOneTodo,
  deleteAllTodo,
} = require('./controller/todoController.js');

const app = async (req, res, next) => {
  const { url, method } = req;

  if (url === '/post' && method === 'GET') getTodo(req, res);
  else if (url === '/post' && method === 'POST') postTodo(req, res);
  else if (url.startsWith('/post/') && method == 'PATCH') editTodo(req, res);
  else if (url.startsWith('/post/') && method == 'DELETE')
    deleteOneTodo(req, res);
  else if (url === '/post' && method === 'DELETE') deleteAllTodo(req, res);
  else if (method === 'OPTIONS') {
    res.writeHeader(200, headers);
    res.end();
  } else {
    res.writeHeader(404, headers);
    res.write('查無此路由');
    res.end();
  }
};
module.exports = { app };
