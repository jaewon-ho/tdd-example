const express = require('express');
const app = express();

global.conf = require('./config');

const mongoose = require('mongoose');
mongoose.connect(
    global.conf.mongodb.url, 
    {dbName: global.conf.mongodb.dbName},
    (err) => {
        if(err) {
            console.error('mongoDB connection ERROR');
            console.errpr(err);
        } else {
            console.log('mongoDB connection created')
        }
    }
);

const PORT = 4000;

app.use(express.json());

const routers = require('./router');
Object.keys(routers).forEach((base) => {
    app.use(`/${base}`, routers[base]);
})

app.use((err, req, res, next) => {
    if(err) {
        if(!res.statusCode) res.status(500).json({message: err.message})
        else res.status(res.statusCode).json(err);
    }
})

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});

module.exports = app;
