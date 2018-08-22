const express = require("express");
const bodyParser = require("body-parser");
const putPackagesInTrucks = require('./src/put_packages_in_trucks');
const _ = require('lodash');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const router = express.Router();

router.post('/', (req, res) => {
    const packages = req.body;
    const trucks = putPackagesInTrucks(packages);
    const trucksJSON = _.map(trucks, x => x.toJSON());

    res.json({
        price: _.sumBy(trucks, x => x.price),
        trucks: trucksJSON
    })
});

app.use('/api', router);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

stop = () =>{
    server.close();
};

module.exports = app;
module.exports.stop = stop;