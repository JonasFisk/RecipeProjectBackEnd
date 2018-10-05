const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  instructions: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Recipe = mongoose.model('Recipes', RecipeSchema);

module.exports = {
  Recipe
};
