const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./util/database');

const routes = require('./routes/blogs');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/posts', routes);

sequelize
    .sync()
    .then(result => {
        app.listen(process.env.PORT);
        console.log("app is running");
    })
    .catch(err => console.log(err))