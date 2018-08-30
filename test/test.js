require("dotenv").config();
const bitgo = require("../BackEnd/api/authentication");
const id = process.env.ID;
const coin = process.env.COIN;
const base_url = "http://localhost:8080/wallet";
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const should = chai.should();

function getwallet() {
  return bitgo
    .coin("tltc")
    .wallets()
    .get({ id: id });
}

chai.use(chaiHttp);

describe("Is Bitgo up?", () => {
  it("Should check if BitGO is up", async () => {
    const wallet = await getwallet();
    expect(wallet).to.exist;
  });
});

describe("Testing BitGo Functions", () => {
  describe("Make Wallet", () => {
    it("Should make a wallet", done => {
      let telo = {
        coin: coin,
        label: "Dont put money in me, im fragile"
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
        amount: 100000,
        address: process.env.walletAddress,
        walletId: id,
        coin: coin
      };
      chai
        .request(base_url)
        .post(`/send`)
        .send(telo)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
