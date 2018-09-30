const cors = require('cors');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({ storage: storage });

const bodyParser = require('body-parser');

const _ = require('lodash');

const mongoose = require('mongoose');
// Require the express module
const express = require('express');
// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));

app.use(cors());

app.use(bodyParser.json());

// Start the web server on port 3000
app.listen(8080, () => console.log('Listening on port 3000'));

// Require the built in file system module
const fs = require('fs');
// Read the json livsmedelsdata into ldata
// (convert it from a JSON-string to JS data)
const ldata = JSON.parse(fs.readFileSync('./json/livsmedelsdata.json'));
// const ldata = require('./json/livsmedelsdata.json');

// Create a route where we'll return
// the first 5 items from ldata as json
app.get('/first-five', (req, res) => {
  res.json(ldata.slice(0, 5));
});

// Tip:
// Using a JSON-formatter plugin in your
// web-browser makes JSON easier to view:
// https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa

const mongoDB = 'mongodb://localhost:27017/RecipeProject';

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

const IngredientSchema = new mongoose.Schema({
  Nummer: {},
  Namn: {},
  ViktGram: {},
  Huvudgrupp: {},
  Naringsvarden: {}
});

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    trim: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

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

const TagSchema = new mongoose.Schema({
  label: {
    type: String
  },
  value: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

const Ingredient = mongoose.model('Ingredients', IngredientSchema);

const Recipe = mongoose.model('Recipes', RecipeSchema);

const Tag = mongoose.model('Tags', TagSchema);
/*
const options = [
  { label: 'Desert', value: 'Dessert' },
  { label: 'Lunch', value: 'Lunch' },
  { label: 'Cake', value: 'Cake' },
  { label: 'Breakfast', value: 'Breakfast' }
];

/*
options.forEach(option => {
  const tag = new Tag({
    label: option.label,
    value: option.value
  });
  tag.save();
});

/*
const newUser = new User({
  username: 'admin',
  password: 'admin'
});

newUser.save();
*/
/*
ldata.forEach(item => {
  const livsmedel = new Ingredient({
    Nummer: item.Nummer,
    Namn: item.Namn,
    ViktGram: item.ViktGram,
    Huvudgrupp: item.Huvudgrupp,
    Naringsvarden: []
  });
  item.Naringsvarden.Naringsvarde.forEach(item => {
    livsmedel.Naringsvarden.push({
      Namn: item.Namn ? item.Namn : undefined,
      Forkortning: item.Forkortning ? item.Forkortning : undefined,
      Varde: item.Varde ? item.Varde : undefined,
      Enhet: item.Enhet ? item.Enhet : undefined,
      SenastAndrad: item.SenastAndrad ? item.SenastAndrad : undefined,
      Vardetyp: item.Vardetyp ? item.Vardetyp : undefined,
      Ursprung: item.Ursprung ? item.Ursprung : undefined,
      Publikation: item.Publikation ? item.Publikation : undefined,
      Metodtyp: item.Metodtyp ? item.Metodtyp : undefined,
      Framtagningsmetod: item.Framtagningsmetod
        ? item.Framtagningsmetod
        : undefined,
      Referenstyp: item.Referenstyp ? item.Referenstyp : undefined
    });
  });
  livsmedel.markModified([
    'Nummer',
    'Namn',
    'ViktGram',
    'Huvudgrupp',
    'Naringsvarden'
  ]);
  livsmedel.save();
});*/

app.get('/tags', (request, response) => {
  Tag.find({}, { _id: 0 })
    .then(tags => {
      response.send({ tags });
    })
    .catch(error => {
      response.status(400).send(error);
    });
});

app.get('/ingredients/:name', (request, response) => {
  const name = request.params.name;
  Ingredient.find({ Namn: new RegExp('^' + name, 'i') }, { Namn: 1 })
    .then(ingredients => {
      response.send({ ingredients });
    })
    .catch(error => {
      response.status(400).send(error);
    });
});

app.get('/ingredient/:name', (request, response) => {
  const name = request.params.name;
  Ingredient.find({
    Namn: name
  })
    .then(ingredients => {
      response.send({ ingredients });
    })
    .catch(error => {
      response.status(400).send(error);
    });
});

app.post('/users/login', (request, response) => {
  const body = _.pick(request.body, ['username', 'password']);
  User.findOne({ username: 'admin' }).then(user => {
    if (user.username === body.username && user.password === body.password) {
      response.status(200).send();
    } else {
      response.status(400).send();
    }
  });
});

app.post('/create', (request, response) => {
  const body = request.body;
  console.log(body);
  const recipe = new Recipe({
    name: body.name,
    description: body.description,
    instructions: body.instructions,
    ingredients: body.ingredients,
    imageURL: body.imageURL,
    tags: body.tags
  });
  recipe.save();
});

app.post('/tags', (request, response) => {
  const body = request.body;
  const tag = new Tag({
    label: body.label,
    value: body.value
  });
  tag.save();
});

app.get('/recipe', (request, response) => {
  Recipe.find({})
    .then(recipes => {
      response.send({
        recipes
      });
    })
    .catch(error => {
      response.status(400).send(error);
    });
});

/*
app.post('/create', upload.single('img'), (request, response) => {
  console.log(request.file);
  console.log(request.body);
  const body = request.body;
  const recipe = new Recipe({
    name: body.name,
    description: body.description,
    values: body.values,
    ingredients: body.ingredients,
    img: request.file
  });
  recipe.save();
});*/
