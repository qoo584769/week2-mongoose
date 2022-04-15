const {
  getTodo,
  postTodo,
  editTodo,
  deleteOneTodo,
  deleteAllTodo,
  options,
  noRoute,
} = require('./controller/todoController.js');

const app = async (req, res, next) => {
  const { url, method } = req;

  if (url === '/post' && method === 'GET') getTodo(req, res);
  else if (url === '/post' && method === 'POST') postTodo(req, res);
  else if (url.startsWith('/post/') && method == 'PATCH') editTodo(req, res);
  else if (url.startsWith('/post/') && method == 'DELETE')
    deleteOneTodo(req, res);
  else if (url === '/post' && method === 'DELETE') deleteAllTodo(req, res);
  else if (method === 'OPTIONS') options(req, res);
  else noRoute(req, res);
};
module.exports = { app };
