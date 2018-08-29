const chai = require("chai");
require("dotenv").config();
const chaiHttp = require("chai-http");
const should = chai.should();
const id = process.env.ID;
const coin = process.env.COIN;
const base_url = "http://localhost:8080/wallet";
const address = process.env.walletAddress;

chai.use(chaiHttp);
describe("Wallet Routes", () => {
  describe("Make Wallet", () => {
    it("Should make a wallet", done => {
      let telo = {
        coin: coin,
        label: "npm run test"
      };
      chai
        .request(base_url)
        .post(``)
        .send(telo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
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
    it("Should get wallet transactions", done => {
      chai
        .request(base_url)
        .get(`/trans?id=${id}&coin=${coin}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("coin").eql("tltc");
          done();
        });
    });
  });
  describe("Send Money", () => {
    it("Should send money", done => {
      let telo = {
        amount: 1,
        address: address,
        walletId: id,
        coin: coin
      };
      chai
        .request(base_url)
        .post(`/send`)
        .send(telo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
