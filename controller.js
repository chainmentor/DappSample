const Web3 = require('web3');
const express = require('express');
const app = express();
app.use(express.json());
const web3 = new Web3('http://localhost:8545');

async function get() {
	const account = await web3.eth.getAccounts()
	console.log(account);
	return account[0];

}

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_purchaseID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_batchID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			}
		],
		"name": "purchaseReq",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_bid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_medName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_manufactName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_expiry",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_dosage",
				"type": "uint256"
			}
		],
		"name": "register",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batchId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "UpdateMedicineDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batchId",
				"type": "uint256"
			}
		],
		"name": "checkExpiry",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batchId",
				"type": "uint256"
			}
		],
		"name": "getMedicineDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_purchaseID",
				"type": "uint256"
			}
		],
		"name": "getPurchaseReq",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "medMap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "batchID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "medName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "manufactName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "expiry",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dosage",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "purchaseMap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "purchaseID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batchID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reqQuantity",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "purchaser",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const deployedAddress = "0x320Ce2e9b033c4825DDb69cdD267690eb05d2a05";

const instance = new web3.eth.Contract(abi, deployedAddress);

app.post('/register', async (req, res) => {

	let batchID = req.body.batchID;
	let medName = req.body.medName;
	let manufactName = req.body.manufactName;
	let expiry = req.body.expiry;
	let quantity = req.body.quantity;
	let price = req.body.price;
	let dosage = req.body.dosage;

	const gasAmount = await instance.methods.register(batchID, medName, manufactName, expiry, quantity, price, dosage).estimateGas({ from: await get() });

	const txn = await instance.methods.register(batchID, medName, manufactName, expiry, quantity, price, dosage).send({ from: await get(), gas: gasAmount })

	res.json({ "txn": txn });

})

app.post('/getMedicineDetails', async (req, res) => {
	let batchID = req.body.batchID;

	const txn = await instance.methods.getMedicineDetails(batchID).call();
	const obj = {
		"batchID": txn[0],
		"medName": txn[1],
		"manufactName": txn[2],
		"expiry": txn[3],
		"quantity": txn[4],
		"price": txn[5],
		"dosage": txn[6]

	}
	res.json({ "txn": obj });

})






get();
app.listen(3000, () => {
	console.log("listening on 3000");
})