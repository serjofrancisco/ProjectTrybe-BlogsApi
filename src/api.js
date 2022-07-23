const express = require('express');

const Login = require('./routes/login');
const User = require('./routes/user');
const Category = require('./routes/category');

const app = express();

app.use(express.json());

app.use('/login', Login);
app.use('/user', User); 
app.use('/categories', Category);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
