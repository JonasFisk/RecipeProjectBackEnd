const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { mongoose } = require('./db/mongoose');
const express = require('express');
const app = express();

const { User } = require('./models/user');
const { Ingredient } = require('./models/ingredient');
const { Recipe } = require('./models/recipe');
const { Tag } = require('./models/tag');

app.use(cors());
app.use(bodyParser.json());
app.listen(8080, () => console.log('Listening on port 8080'));

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
  tag.save(function(err) {
    console.log(err);
  });
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
