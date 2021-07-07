const ArdinisToken = artifacts.require("ArdinisToken");

module.exports = function (deployer) {
  deployer.deploy(ArdinisToken, 100000);
};
