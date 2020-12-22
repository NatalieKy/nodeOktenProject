require('dotenv').config();
const fileuploader = require('express-fileupload');
const express = require('express');
const path = require('path');

const database = require('./dataBase');
const { authRouter, carRouter, studentRouter } = require('./Routes');

const app = express();

database.getInstance().setModels();

app.use(fileuploader());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/students', studentRouter);
app.use('/cars', carRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.code || 500)
        .json({
            message: err.message
        });
});
app.listen(5000, () => {});
