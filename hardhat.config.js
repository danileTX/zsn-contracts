require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  solidity: {
    version: "0.6.12",
    settings: {
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
},
};
