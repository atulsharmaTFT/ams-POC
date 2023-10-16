// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const session = require("express-session");
// const passport = require("passport");

// const indexRouter = require("./routes/index");
// const userRouter = require("./routes/user");

// const app = express();
// app.set("trust proxy", 1);
// app.set("view engine", "ejs");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   session({
//     secret: "not my cat's name",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 60 * 60 * 1000, // 1 hour
//       // secure: true, // Uncomment this line to enforce HTTPS protocol.
//       sameSite: true
//     }
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/", indexRouter);
// app.use("/user", userRouter);

// const listener = app.listen(8080, function() {
//   console.log("Listening on port " + listener.address().port);
// });

const ethers = require('ethers');
const abifile = require("./Hardhat/artifacts/contracts/Counter.sol/Counter.json")
// Generate a random mnemonic for the user
const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
console.log("mnemonic",mnemonic);

// Store the user's mnemonic securely in your database
// You may also want to associate this with the user's account

// Derive an Ethereum wallet from the mnemonic
const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
console.log("wallet",wallet);

// Replace these with your private keys
const senderPrivateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';
const signerPrivateKey = wallet?.privateKey;

// Replace with your Ethereum node URL
const nodeUrl = "http://127.0.0.1:8545/";

// Connect to the Ethereum network
const provider = new ethers.providers.JsonRpcProvider(nodeUrl);

// Create a wallet for the sender
const senderWallet = new ethers.Wallet(senderPrivateKey, provider);

// Create a wallet for the signer
const signerWallet = new ethers.Wallet(signerPrivateKey, provider);

// Contract address and ABI (You need to replace these with your contract's address and ABI)
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractAbi = abifile?.abi;

const contract = new ethers.Contract(contractAddress, contractAbi, senderWallet);

async function createAndBroadcastTransaction() {
    // Construct a transaction to call the function
    const transaction = await contract.connect(signerWallet).incrementCounter();
    // Sign the transaction with the sender's private key
    // const signedTransaction = await senderWallet.signTransaction(transaction);
    const signedTransaction = await signerWallet.signTransaction(transaction);
    // Broadcast the signed transaction
    // const txResponse = await provider.sendTransaction(signedTransaction);
    const txResponse = await senderWallet.sendTransaction(signedTransaction);
    const receipt = await txResponse.wait();

console.log(receipt);

    console.log('Transaction hash:', txResponse.hash);
}

createAndBroadcastTransaction();
