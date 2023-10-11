const express = require("express");
const { Web3 } = require("web3");
const crypto = require("crypto");
var cors = require("cors");
const contractFile = require("./Hardhat/artifacts/contracts/Token.sol/Token.json");
const app = express();
app.use(cors({ credentials: true, origin: true, exposedHeaders: "*" }));
const port = 3000;

app.use(express.json());

const userAccounts = [];
const RPC_URL = "http://127.0.0.1:8545/";
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = contractFile?.abi;
const contract = new web3.eth.Contract(abi, contractAddress);

// Generate a private key securely
function generatePrivateKey() {
  const privateKeyBytes = crypto.randomBytes(32);
  return "0x" + privateKeyBytes.toString("hex");
}

app.post("/register", (req, res) => {
  try {
    const user = req.body;
    console.log(user, "User");
    const privateKey =
      "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
    // const privateKey = generatePrivateKey();
    const account = web3.eth.accounts.create(privateKey);
    userAccounts.push({ address: account.address, privateKey });
    res.json({
      success: true,
      message: "Registration success",
      userAddress: account.address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// Handle user transaction signing
app.post("/sign-transaction", async (req, res) => {
  try {
    const { userAddress, transactionData } = req.body;
    // Find the user's private key based on their Ethereum address
    const user = userAccounts.find(
      (account) => account.address === userAddress
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log(user, "user");
    const valueInWei = web3.utils.toWei("10", "ether");
    // sign the transaction using private key
    const isValidPrivateKey =
      web3.utils.isHex(user.privateKey) && user.privateKey.length === 66;
    if (isValidPrivateKey) {
      const tx = {
        to: contractAddress,
        from: userAddress,
        value: valueInWei,
        gas: "0x200000",
        gasPrice: web3.utils.toWei("10", "gwei"),
        data: contract.methods.transfer(contractAddress, 10).encodeABI(),
        nonce: 2,
      };
      const signedTransaction = await web3.eth.accounts.signTransaction(
        tx,
        user.privateKey
      );
      console.log("Signed Transaction:", signedTransaction);
      res.json({
        success: true,
        message: "Transaction signed",
        hash: signedTransaction.rawTransaction,
      });
    } else {
      console.log("Not valid");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Transaction signing failed" });
  }
});

// Handle admin transaction execution
app.post("/execute-transaction", async (req, res) => {
  try {
    const { signedTransaction } = req.body;
    let execute = await web3.eth.sendSignedTransaction(signedTransaction);

    console.log("Admin executing transaction:", execute);
    res.json({ success: true, message: "Transaction executed" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Transaction execution failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
