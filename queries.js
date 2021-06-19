const config = require('./config.json');
const { Pool } = require('pg');
const { response } = require('express');
// const pool = new Pool({
//     host: 'localhost',
//     user: 'tutumrak',
//     password: 'zxc',
//     database: 'api',
//     port: 5432,
// });
const pool = new Pool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
});
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, result) => {
       if (err) {
           throw err;
       } 
       res.status(200).json(result.rows);
    });
};
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
};
const postNewUser = (req, res) => {
    const { name, email } =  req.body;
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (err, result) => {
        if (err){
            throw err;
        }
        res.status(201).send(`user with ${result.insert.id} has been added`);
    });

};
const putNewUser = ( req, res ) => {
    const id = parseInt(req.params.id);
    const {name, email} = req.body;
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id],
    (err, result) => {
        if (err) {
            throw err;
        }
        response.status(200).send(`User with id: ${id} has been modified.`);
    });
};
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`user deleted with ID of: ${id}`);
    });
};

module.exports= {
    getUsers,
    getUserById,
    postNewUser,
    putNewUser,
    deleteUser
};