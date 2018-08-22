const Promise = require("bluebird");
const Sequelize = require("sequelize");
const uuid = require('uuid/v4');
const path = require("path");
const sequelize = new Sequelize("mainDB", null, null, {
    dialect: "sqlite",
    storage: path.resolve("./db/orders.db")
});

const Order = sequelize.define('orders', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    price: Sequelize.DECIMAL(10, 2)
});

const Truck = sequelize.define('trucks', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    order_id: Sequelize.UUID
});

const Package = sequelize.define('packages', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    truck_id: Sequelize.UUID,
    customer_package_id: Sequelize.TEXT,
    weight: Sequelize.INTEGER
});

class OrderRepository {

    constructor() {
        sequelize
            .authenticate()
            .then(err => {
                console.error(err);
            });
    }

    async createDatabase() {
        await sequelize.sync({force: true});
    }

    async createOrder(customerOrder) {

        await Order.create({
            id: customerOrder.order_id,
            price: customerOrder.price
        });
        await Promise.map(customerOrder.trucks, async truck => {
            await Truck.create({
                id: truck.truckID,
                order_id: customerOrder.order_id
            });

            await Promise.map(truck.load, async item => {
                await Package.create({
                    id: uuid(),
                    truck_id: truck.truckID,
                    customer_package_id: item.id,
                    weight: item.weight
                });
            });
        });
    }
}

module.exports = OrderRepository;