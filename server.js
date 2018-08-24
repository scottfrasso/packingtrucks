const express = require("express");
const bodyParser = require("body-parser");
const truckRouter = require("./src/controllers/trucks");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', truckRouter);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

stop = () => {
    server.close();
};

module.exports = app;
module.exports.stop = stop;