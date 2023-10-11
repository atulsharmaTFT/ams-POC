const express = require("express");
const {Web3} = require("web3");
const crypto = require("crypto");
var cors = require('cors')
const app = express();
app.use(cors({credentials: true, origin: true, exposedHeaders: '*'}))
const port = 3000;

const RPC_URL = "http://localhost:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

app.use(express.json());

const userAccounts = [];

// Generate a private key securely
function generatePrivateKey() {
  const privateKeyBytes = crypto.randomBytes(32);
  return "0x" + privateKeyBytes.toString("hex");
}

app.post("/register", (req, res) => {
  try {
    const user = req.body;
    console.log(user,"User")
    const privateKey = generatePrivateKey();
    const account = web3.eth.accounts.create(privateKey);
    userAccounts.push({ address: account.address, privateKey });
    console.log(privateKey, account, "WaL")
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
    console.log(user, "user")
    // sign the transaction using private key
    const signedTransaction = await web3.eth.accounts.signTransaction(
      transactionData,
      user.privateKey
    );
    console.log("Signed Transaction:", signedTransaction);
    res.json({
      success: true,
      message: "Transaction signed",
      hash: signedTransaction.rawTransaction,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Transaction signing failed" });
  }
});

// Handle admin transaction execution
app.post("/execute-transaction", (req, res) => {
  try {
    const { signedTransaction } = req.body;
    console.log("Admin executing transaction:", signedTransaction);
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
