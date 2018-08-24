const express = require("express");
const router = express.Router();
const OrderRepository = require('../order_repository');
const orderRepository = new OrderRepository();
const putPackagesInTrucks = require('../put_packages_in_trucks');
const _ = require('lodash');
const uuid = require('uuid/v4');

router.post('/package', (req, res) => {
    const packages = req.body;
    const trucks = putPackagesInTrucks(packages);
    const trucksJSON = _.map(trucks, x => x.toJSON());

    const orderJSON = {
        order_id: uuid(),
        price: _.sumBy(trucks, x => x.price),
        trucks: trucksJSON
    };

    orderRepository.createOrder(orderJSON)
        .then(() => {
            res.json(orderJSON);
        })
        .catch(err=>{
            console.error(`Error while creating order${err}`);
            res.status(500);
        });
});

module.exports = router;