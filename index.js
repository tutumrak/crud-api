const { Pool } = require('pg');
const express = require('express');
const helmet = require("helmet");
const db = require('./queries');
const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({
    extended: true
}));


app.get('/users', db.getUsers);
app.get('/user/:id', db.getUserById);
app.post('/user', db.postNewUser);
app.post('/adduser/:id', db.putNewUser);
app.delete('/deluser/:id', db.deleteUser);
app.listen(port, () => {
    console.log(`running on port ${port}`);
});
