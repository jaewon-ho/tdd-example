const express = require('express');
const app = express();

const PORT = 4000;

app.use(express.json());

const routers = require('./router');
Object.keys(routers).forEach((base) => {
    app.use(`/${base}`, routers[base]);
})


app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});
