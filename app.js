const express = require('express');

const app = express();
const database = require('./dataBase');
const { userRouter, carRouter } = require('./Routes');

database.getInstance().setModels();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/cars', carRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.code)
        .json({
            message: err.message
        });
});
app.listen(5000, () => {});
