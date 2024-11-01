import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleStorageContract from './SimpleStorage.json'; // Ensure to include the ABI file

const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138w'; // Replace with your deployed contract address

const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "initialMessage",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "decreaseNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumber",
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
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "increaseNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newMessage",
				"type": "string"
			}
		],
		"name": "updateMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}

];
const SimpleStorageApp = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [number, setNumber] = useState(0);
    const [message, setMessage] = useState('');
    const [inputNumber, setInputNumber] = useState(0);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const initWeb3 = async () => {
            const web3Instance = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const contractInstance = new web3Instance.eth.Contract(SimpleStorageContract.abi, contractAddress);

            setWeb3(web3Instance);
            setContract(contractInstance);
            loadData(contractInstance);
        };

        initWeb3();
    }, []);

    const loadData = async (contractInstance) => {
        const initialNumber = await contractInstance.methods.getNumber().call();
        const initialMessage = await contractInstance.methods.getMessage().call();

        setNumber(initialNumber);
        setMessage(initialMessage);
    };

    const increaseNumber = async () => {
        await contract.methods.increaseNumber(inputNumber).send({ from: window.ethereum.selectedAddress });
        loadData(contract);
    };

    const decreaseNumber = async () => {
        await contract.methods.decreaseNumber(inputNumber).send({ from: window.ethereum.selectedAddress });
        loadData(contract);
    };

    const updateMessage = async () => {
        await contract.methods.updateMessage(inputMessage).send({ from: window.ethereum.selectedAddress });
        loadData(contract);
    };

    return (
        <div>
            <h1>Simple Storage DApp</h1>
            <div>
                <h2>Number: {number}</h2>
                <h2>Message: {message}</h2>
            </div>
            <input
                type="number"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                placeholder="Enter number"
            />
            <button onClick={increaseNumber}>Increase Number</button>
            <button onClick={decreaseNumber}>Decrease Number</button>
            <br />
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={updateMessage}>Update Message</button>
        </div>
    );
};

export default SimpleStorageApp;
