const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost:27017/RecipeProject';

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

module.exports = {
  mongoose
};
