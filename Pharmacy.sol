// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;




//register

//getMedicineDetails

//UpdateMedicineDetails

//checkExpiry

//purchaseRequest




contract Pharmacy{

struct medicineDetails{

    uint batchID;
    string medName;
    string manufactName;
    uint expiry; //date - epoch time
    uint quantity;
    uint price;
    uint dosage;
}

struct purchaseRequest{
    uint purchaseID;
    uint batchID;
    uint reqQuantity;
    address purchaser;
}


mapping(uint => medicineDetails) public medMap;
mapping(uint => purchaseRequest) public purchaseMap;

/*
    * registerMedicine function
    
*/

function register(
    uint _bid,
    string memory _medName,
    string memory _manufactName,
    uint _expiry,
    uint _quantity,
    uint _price,
    uint _dosage
) public returns(bool){

    medMap[_bid].batchID = _bid;
    medMap[_bid].medName = _medName;
    medMap[_bid].manufactName = _manufactName;
    medMap[_bid].expiry = _expiry;
    medMap[_bid].quantity = _quantity;
    medMap[_bid].price = _price;
    medMap[_bid].dosage = _dosage;

    return true;

}

function getMedicineDetails(uint _batchId) public view 
    returns
    (uint,
    string memory,
    string memory,
    uint,
    uint,
    uint,
    uint){

        return(
            medMap[_batchId].batchID,
            medMap[_batchId].medName,
            medMap[_batchId].manufactName,
            medMap[_batchId].expiry,
            medMap[_batchId].quantity,
            medMap[_batchId].price,
            medMap[_batchId].dosage
        );

    }

    function getTime() public view returns(uint256){
        return block.timestamp;
    }

    function UpdateMedicineDetails(uint256 _batchId,uint256 _price) public{
        
        medMap[_batchId].price = _price;
    }

    function checkExpiry(uint256 _batchId) public view returns(bool){

        require(medMap[_batchId].expiry > block.timestamp, "product expired");
        return false;
    }

    function purchaseReq(uint _purchaseID,uint256 _batchID,uint256 _quantity) public{


        purchaseMap[_purchaseID].purchaseID = _purchaseID;
        purchaseMap[_purchaseID].batchID = _batchID;
        purchaseMap[_purchaseID].reqQuantity = _quantity;
        purchaseMap[_purchaseID].purchaser = msg.sender;
        

    }

    function getPurchaseReq(uint _purchaseID)  public view returns(uint,uint256,uint256,address){

     return(

         purchaseMap[_purchaseID].purchaseID,
         purchaseMap[_purchaseID].batchID,
         purchaseMap[_purchaseID].reqQuantity,
         purchaseMap[_purchaseID].purchaser
     );

    }

}