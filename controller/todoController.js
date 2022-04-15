const { HttpMethod } = require('../HttpFun.js');
const { modelOperator } = require('../model/postModel.js');

const buffParse = async (req) => {
  let buffer = [];
  for await (const chunk of req) {
    buffer.push(chunk);
  }
  const parseddata = JSON.parse(Buffer.concat(buffer).toString());
  return parseddata;
};

const getTodo = async (req, res) => {
  try {
    const result = await modelOperator(req.method);
    HttpMethod(res, 200, 'success', result, '資料查詢成功');
  } catch (error) {
    HttpMethod(res, 404, 'false', error, '資料查詢失敗');
    console.log('查詢失敗');
  }
};
const postTodo = async (req, res) => {
  try {
    const data = await buffParse(req);
    const result = await modelOperator(req.method, data);
    console.log(result);
    if (result.errors !== undefined) {
      HttpMethod(res, 404, 'false', result.errors.type.properties.message, '資料新增失敗');
      return;
    }
    HttpMethod(res, 200, 'success', result, '資料新增成功');
  } catch (error) {
    HttpMethod(res, 404, 'false', error, '資料格式錯誤');
  }
};
const editTodo = async (req, res) => {
  try {
    let data = await buffParse(req);
    const id = req.url.split('/').pop();
    data.id = id;
    const result = await modelOperator(req.method, data);
    HttpMethod(res, 200, 'success', result, '資料更新成功');
  } catch (error) {
    console.log(error);
    HttpMethod(res, 404, 'false', error, '資料格式錯誤');
  }
};
const deleteOneTodo = async (req, res) => {
  try {
    const id = req.url.split('/').pop();
    const result = await modelOperator(req.method, id);
    if(result.message){
      HttpMethod(res, 404, 'false', '資料ID錯誤', '刪除單筆資料失敗');
      return
    }
    HttpMethod(res, 200, 'success', result, '刪除單筆資料成功');
  } catch (error) {
    HttpMethod(res, 404, 'false', error, '資料不存在');
  }
};
const deleteAllTodo = async (req, res) => {
  try {
    const result = await modelOperator(req.method, '刪除全部');
    HttpMethod(res, 200, 'success', result, '刪除多筆資料成功');
  } catch (error) {
    console.log(error);
    HttpMethod(res, 404, 'false', error, '刪除多筆資料失敗');
  }
};

module.exports = { getTodo, postTodo, editTodo, deleteOneTodo, deleteAllTodo };
