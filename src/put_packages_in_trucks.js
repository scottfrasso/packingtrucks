const _ = require('lodash');
const uuid = require('uuid/v4');

const maxWeight = 1000;

class Truck {

    constructor(packages = []) {
        this.id = uuid();
        this.loadedPackages = packages;
    }

    get ID() {
        return this.id;
    }

    addPackage(item) {
        this.loadedPackages.push(item);
    }

    get packages() {
        return this.loadedPackages.slice();
    }

    get weight() {
        return _.sumBy(this.packages, x => x.weight);
    }

    get price() {
        return _.reduce(this.loadedPackages, (sum, item) => {
            if (item.weight <= 400) {
                return sum + (0.01 * item.weight);
            } else {
                return sum + (2 + 0.005 * item.weight);
            }
        }, 0);
    }

    toJSON() {
        return {
            truckID: this.ID,
            load: this.packages
        }
    }
}

putPackagesInTrucks = packages => {
    const trucks = [];
    let sortedPackages = _.orderBy(packages, 'weight', 'desc');
    for (let i = 0; i < sortedPackages.length; i++) {
        // package is a reserved word so I'm using "item" here instead.
        const item = sortedPackages[i];
        // Find an existing truck that fits
        const existingTruckWithSpareWeight = _.find(trucks, truck => truck.weight + item.weight <= maxWeight);
        if (existingTruckWithSpareWeight) {
            existingTruckWithSpareWeight.addPackage(item);
        } else {
            // Stick it in a new truck
            const truck = new Truck([item]);
            trucks.push(truck);
        }
    }
    return trucks;
};

module.exports = putPackagesInTrucks;