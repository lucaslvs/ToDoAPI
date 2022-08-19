const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    id: uuidv4(),
    name: "Lucas Varlesse",
    username: "lucaslvs",
    todos: []
  }
];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find(user => user.username === username);

  if (!user) {
    return response.status(401).send();
  } else {
    request.user = user;

    return next();
  }
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;
  const user = { id: uuidv4(), name, username, todos: [] };

  users.push(user);

  return response.json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  return response.json(request.user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const todo = {
    id: uuidv4(),
    title,
    deadline: new Date(deadline),
    done: false,
    created_at: new Date(),
  }

  const { user } = request;

  user.todos.push(todo);

  return response.json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
