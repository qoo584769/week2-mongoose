const { Schema, model } = require('mongoose');
const {
  getDB,
  postDB,
  patchDB,
  deleteOneDB,
  deleteAllDB,
} = require('../repository/postRepl.js');

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '貼文姓名需填寫'],
    },
    tags: {
      type: String,
      required: [true, '貼文標籤需填寫'],
    },
    type: {
      type: String,
      // enum是指如果輸入enum陣列以外的東西就會出錯
      enum: ['group', 'person'],
      required: [true, '貼文類型需填寫'],
    },
    image: {
      type: String,
      default: '',
    },
    createAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    content: {
      type: String,
      required: [true, '貼文內容須填寫'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

const postModel = model('week2post', postSchema);

const modelOperator = async (methodType, reqData = {}) => {
  const modelData = {
    name: reqData.name,
    content: reqData.content,
    tags: reqData.tags,
    type: reqData.type,
  };
  if (methodType === 'GET') {
    const result = await getDB(postModel);
    return result;
  } else if (methodType === 'POST') {
    try {
      const result = await postDB(postModel, modelData);
      return result;
    } catch (error) {
      return error;
    }
  } else if (methodType === 'PATCH') {
    try {
      const result = await patchDB(postModel, reqData);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else if (methodType === 'DELETE' && reqData !== '刪除全部') {
    const result = await deleteOneDB(postModel, reqData);
    return result;
  } else if (methodType === 'DELETE' && reqData === '刪除全部') {
    const result = await deleteAllDB(postModel);
    return result;
  }
};

module.exports = { modelOperator };
