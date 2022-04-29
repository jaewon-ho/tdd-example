const express = require('express');
const app = express();

global.conf = require('./config');

const mongoose = require('mongoose');
mongoose.connect(
    global.config.mongodb.url, 
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


app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});
