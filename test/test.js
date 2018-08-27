var should = require("should");
var expect = require("chai").expect;
var baseUrl = "http://localhost:8080";
var util = require("util");
var router=require('../BackEnd/api/routes/walletRoutes');


describe('tltc', function() {
    it('returns wallet', function(done) {
        this.timeout(20000);
        router.get(`${baseUrl}/wallet?id=${process.env.TEST_TLTC_ID}&coin=tltc`,
            function(error, response, body) 
            {
                    console.log(error);
                    expect(response.statusCode).to.exist();
                    console.log(body);
                    done();
            });
            console.log("Zelim da umrem");
            
    });
});