const solver = require('../src/put_packages_in_trucks');
const expect = require("chai").expect;
const example1 = require('../examples/packages1');
const example2 = require('../examples/packages2');

describe("make sure the items are going into trucks", () => {
   it("examples1.json to have 2 trucks", () => {
       const trucks = solver(example1);
       expect(trucks).to.be.an("array");
       expect(trucks).to.have.lengthOf(2);
   });

    it("examples2.json to have 3 trucks", () => {
        const trucks = solver(example2);
        expect(trucks).to.be.an("array");
        expect(trucks).to.have.lengthOf(3);
    });

});