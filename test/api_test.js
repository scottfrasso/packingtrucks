const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);
const expect = chai.expect;

describe("see if the api works", () => {
    it("works for the example in the assignment", done => {
        chai.request(server)
            .post("/api/package")
            .send([
                {"id": "ID-1", "weight": 345},
                {"id": "OTHER-ID-2", "weight": 500},
                {"id": "CLIENT-ID-3", "weight": 300},
            ])
            .end((err, res) => {
                expect(err).to.be.null;
                const response = res.body;
                expect(response.trucks).to.have.lengthOf(2);
                expect(response.price).to.equal(10.95);
                done();
            });
    });

    after(async () =>{
       server.stop();
    });
});