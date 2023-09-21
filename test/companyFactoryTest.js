const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("companyFactory test", () => {
    let companyFactory, deployer, receiver;

    beforeEach(async () => {
       const CompanyFactory = await ethers.getContractFactory("CompanyFactory")
       companyFactory = await CompanyFactory.deploy();
       accounts = await ethers.getSigners();
       deployer = accounts[0];
       receiver = accounts[1];
    })

    describe("create a company", () => {
        it("creates a company", async () => {
            await companyFactory.createCompany("Netflix");
            const currentCompaniesCount = await companyFactory.companiesCount();
      
            expect(currentCompaniesCount).to.equal(1);
        });

        it("emits the companyCreated event", async () => {
            const transferTx = await companyFactory.createCompany("Netflix");
            const expertedEvent = deployer.address;
            const result = await transferTx.wait();
        
            expect(result.events[1].args.owner).to.equal(expertedEvent);
          });
    });

    describe("Query all companies", () => {
        it("returns an empty collection", async () => {
            const currentCompaniesCount = await companyFactory.companiesCount();
      
            expect(currentCompaniesCount).to.equal(0);
          });
        it("Quieries company total count", async () => {
            for (let i = 0; i < 5; i++) {
              await companyFactory.createCompany(`netflix ${i}`);
            }
            const currentCompaniesCount = await companyFactory.companiesCount();
      
            expect(currentCompaniesCount).to.equal(5);
        });

        it("Quieries all the companies", async () => {
            for (let i = 0; i < 5; i++) {
              await companyFactory.createCompany(`netflix ${i}`);
            }
            const companies = await companyFactory.companies();
      
            expect(companies.length).to.equal(5);
        });

    });
});