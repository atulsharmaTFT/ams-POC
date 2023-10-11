import React, { useState } from "react";

const App = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [transactionHash, setTransactionHash] = useState("");
  const [address, setAddress] = useState("");
  const SERVER_URL = "http://localhost:3000";
  const handleRegistration = async () => {
    try {
      if (!user?.name || !user?.email) {
        return alert("Please enter email and name");
      }
      const response = await fetch(`${SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      console.log(result, "result");
      if (result.success) {
        setAddress(result.userAddress);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleTrasactionSigning = async () => {
    try {
      const transactionData = {
        id: "1",
        name: "iPhone 14 Pro Max",
      };
      const response = await fetch(`${SERVER_URL}/sign-transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionData, userAddress: address }),
      });

      const result = await response.json();
      console.log(result, "result sign");
      if (result.success) {
        setTransactionHash(result.hash);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const executeTransaction = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/execute-transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signedTransaction: transactionHash }),
      });

      const result = await response.json();
      console.log(result, "result sign");
      if (result.success) {
        setTransactionHash(result.hash);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "darkkhaki",
        height: "100vh",
      }}
    >
      <h1>User Private key Registration</h1>
      <form>
        <label style={{ fontSize: 20, width: "20vw" }}>
          Name:
          <input
            style={{ fontSize: 20, marginLeft: 20 }}
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </label>
        <br />
        <label style={{ fontSize: 20, width: "20vw" }}>
          Email:
          <input
            style={{ fontSize: 20, marginLeft: 20 }}
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegistration}>
          Register
        </button>
      </form>
      {transactionHash && (
        <>
          <p>Transaction Hash: {transactionHash}</p>
          <button type="button" onClick={executeTransaction}>
            Execute Transaction
          </button>
        </>
      )}
      {address && (
        <>
          <p style={{ padding: 10, backgroundColor: "lightgrey" }}>
            Address: {address}
          </p>
          <button type="button" onClick={handleTrasactionSigning}>
            Sign Transaction
          </button>
        </>
      )}
    </div>
  );
};

export default App;
