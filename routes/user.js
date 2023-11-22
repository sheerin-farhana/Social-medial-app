const express = require('express');
const {
    postData,
    getData,
    postDelete,
    postEdit
} = require('../controllers/userController');
const route = express.Router();


route.post('/insert', postData);

route.get('/getAll', getData);

route.post('/delete/:id', postDelete);

route.post('/edit/:id', postEdit);


module.exports = route;