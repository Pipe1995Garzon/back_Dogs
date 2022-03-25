const express = require('express');
const route = express.Router();
const pool = require('../database');
route.get('/', async(req, res) => {
    res.send('Dogs')
});


module.exports = route;