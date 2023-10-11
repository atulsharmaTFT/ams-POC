pragma solidity ^0.8.0;

contract SimpleCounter {
    uint256 public counter;

    constructor() {
        counter = 0; // Initialize the counter to 0 when the contract is deployed
    }

    // Function to increment the counter
    function increment() public {
        counter++;
    }
}
