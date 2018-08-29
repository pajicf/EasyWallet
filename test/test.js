const chai = require("chai");
require("dotenv").config();
const chaiHttp = require("chai-http");
const should = chai.should();
const id = process.env.ID;
const coin = process.env.COIN;
const base_url = "http://localhost:8080/wallet";

chai.use(chaiHttp);
describe("Wallet Routes", () => {
  describe("Get Wallet", () => {
    it("Should get a wallet", done => {
      chai
        .request(base_url)
        .get(`?id=${id}&coin=${coin}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(id);
          done();
        });
    });
  });
});
