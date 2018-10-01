const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  label: {
    type: String
  },
  value: {
    type: String
  }
});

const Tag = mongoose.model('Tags', TagSchema);

module.exports = {
  Tag
};
