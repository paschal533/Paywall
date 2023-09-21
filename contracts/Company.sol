// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./SafeMath.sol";

contract Company is Ownable {
  using SafeMath for uint256; 

  uint256 public currentId;  

  struct employeeInfo {
    uint256 employeeId;
    string employeeName;
    string employeeRank;
    address payable employeeAddress;
    uint256 payment;
  }

  mapping(uint256 => employeeInfo) employee;
  uint256[] public employeeIds;

  event employeeCreated(string employeeName, string employeeRank, address employeeAddress, uint256 payment);
  event employeeInfoModified(string employeeName, string employeeRank, address employeeAddress, uint256 payment);
  event employeesPaid(string companyName, uint256 payment);
  
  uint256 public id;
  string public name;
  address public companyOwner;

  constructor(
    uint256 _id,
    string memory _name,
    address _owner
  )
  {
    id = _id;
    name = _name;
    companyOwner = _owner;
  }

  // add an employee
  function registerEmployee(string memory _employeeName, string memory _employeeRank , address payable _employeeAddress, uint256 _payment ) public {
      require(msg.sender == companyOwner, "only the owner can call this function");
      employeeInfo storage newEmployee = employee[currentId];
      newEmployee.employeeId = currentId;
      newEmployee.employeeName = _employeeName;
      newEmployee.employeeRank = _employeeRank;
      newEmployee.employeeAddress = _employeeAddress;
      newEmployee.payment = _payment;
      employeeIds.push(currentId);
      currentId += 1;
      emit employeeCreated(_employeeName, _employeeRank, _employeeAddress, _payment);
  }

  //Edit employee
  function editEmployee(string memory _employeeName, string memory _employeeRank , address payable _employeeAddress, uint256 _payment, uint256 _id ) public {
      require(msg.sender == companyOwner, "only the owner can call this function");
      employeeInfo storage modifyEmployee = employee[_id];
      modifyEmployee.employeeName = _employeeName;
      modifyEmployee.employeeRank = _employeeRank;
      modifyEmployee.employeeAddress = _employeeAddress;
      modifyEmployee.payment = _payment;
      emit employeeInfoModified(_employeeName, _employeeRank, _employeeAddress, _payment);
  }

  //query all employess
  function getAllEmployee() public view returns (string[] memory employeeNames, string[] memory employeeRanks, address[] memory employeeAddresses, uint256[] memory payments, uint256[] memory ids){
    uint256 count = currentId;
    employeeNames = new string[](count);
    employeeRanks = new string[](count);
    employeeAddresses = new address[](count);
    payments = new uint256[](count);
    ids = new uint256[](count);

    for (uint256 i = 0; i < count; i++) {
      employeeInfo storage allEmployee = employee[i];
      employeeNames[i] = allEmployee.employeeName;
      employeeRanks[i] = allEmployee.employeeRank;
      employeeAddresses[i] = allEmployee.employeeAddress;
      payments[i] = allEmployee.payment;
      ids[i] = allEmployee.employeeId;
    }

    return (employeeNames, employeeRanks, employeeAddresses, payments, ids);
  }

  // pay employees
  function payEmployee(uint256 exchangeRate) public payable {
      uint256 count = currentId;

      for (uint256 i = 0; i < count; i++) {
        employeeInfo storage allEmployee = employee[i]; 
        address payable employeeAddress = allEmployee.employeeAddress;
        uint256 amount = ((allEmployee.payment * 1000000000000000000000000000) / exchangeRate);
        employeeAddress.transfer(amount);
      }

      emit employeesPaid(name, msg.value);
  }
   
}
