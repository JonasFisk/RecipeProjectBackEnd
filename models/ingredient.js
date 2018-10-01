const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  Nummer: {},
  Namn: {},
  ViktGram: {},
  Huvudgrupp: {},
  Naringsvarden: {}
});

const Ingredient = mongoose.model('Ingredients', IngredientSchema);

module.exports = {
  Ingredient
};
