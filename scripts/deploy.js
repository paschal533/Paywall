const hre = require("hardhat");

async function main() {
   // Fetch contract to deploy
   const CompanyFactory = await ethers.getContractFactory("CompanyFactory")

   // Deploy contracts
   const companyFactory = await CompanyFactory.deploy();
   await companyFactory.deployed();

   console.log(`companyFactory Deployed to: ${companyFactory.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
