const {
  getPost,
  postPost,
  editPost,
  deleteOnePost,
  deleteAllPost,
  options,
  noRoute,
} = require('./controller/postController.js');

const app = async (req, res, next) => {
  const { url, method } = req;

  if (url === '/post' && method === 'GET') getPost(req, res);
  else if (url === '/post' && method === 'POST') postPost(req, res);
  else if (url.startsWith('/post/') && method == 'PATCH') editPost(req, res);
  else if (url.startsWith('/post/') && method == 'DELETE')
    deleteOnePost(req, res);
  else if (url === '/post' && method === 'DELETE') deleteAllPost(req, res);
  else if (method === 'OPTIONS') options(req, res);
  else noRoute(req, res);
};
module.exports = { app };
