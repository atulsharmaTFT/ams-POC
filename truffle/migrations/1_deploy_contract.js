const SimpleCounter = artifacts.require("SimpleCounter");

module.exports = function (deployer) {
  deployer.deploy(SimpleCounter);
};
