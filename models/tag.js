const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const TagSchema = new mongoose.Schema({
  label: {
    type: String,
    unique: true
  },
  value: {
    type: String,
    unique: true
  }
});

TagSchema.plugin(uniqueValidator);

const Tag = mongoose.model('Tags', TagSchema);

module.exports = {
  Tag
};
