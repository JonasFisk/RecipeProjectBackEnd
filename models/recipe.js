const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  ingredients: {
    type: Array
  },
  imageURL: {
    type: String
  },
  tags: {
    type: Array
  },
  instructions: {
    type: Array
  },
  description: {
    type: String
  }
});

const Recipe = mongoose.model('Recipes', RecipeSchema);

module.exports = {
  Recipe
};
