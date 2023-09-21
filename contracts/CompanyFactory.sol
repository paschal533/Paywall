// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Company.sol";

contract CompanyFactory {
  Company[] private _companies;

  event CompanyCreated(Company indexed company, address indexed owner);

  uint256 constant maxLimit = 20;

  uint256 public currentId;

  function createCompany(
    string memory name
  )
  public
  {
    Company company = new Company(
      currentId,
      name,
      msg.sender
    );
    _companies.push(company);
    currentId += 1;
    emit CompanyCreated(company, msg.sender);
  }

  // Query the number of companied in our smart contract
  function companiesCount() public view returns(uint256) {
    return _companies.length;
  }

  // Query all companies in our smart contract
  function companies() 
    public 
    view
    returns(Company[] memory)
  {
    return  _companies;
  }
}