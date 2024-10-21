const hre = require("hardhat");
const { saveContractAddress, getSavedContractAddresses } = require("../utils");
const { ethers } = require("hardhat");

async function main() {
  const RPS = "1";
  const startTS = 1817158008;
  // get zsn token address from contract address file
  const zsnTokenAddress =
    getSavedContractAddresses()[hre.network.name]["ZSN-TOKEN"];
  console.log("zsnTokenAddress: ", zsnTokenAddress);

  const farm = await hre.ethers.getContractFactory("FarmingZSN");
  const Farm = await farm.deploy(
    zsnTokenAddress,
    ethers.utils.parseEther(RPS),
    startTS
  );
  await Farm.deployed();
  console.log("Farm deployed to: ", Farm.address);

  saveContractAddress(hre.network.name, "FarmingZSN", Farm.address);

  // fund the farm
  // approve the farm to spend the token
  const ZSN = await hre.ethers.getContractAt("ZSNToken", zsnTokenAddress);
  const approveTx = ZSN.approve(Farm.address, ethers.utils.parseEther("50000"));
  await approveTx.wait();

  let tx = await Farm.fund(ethers.utils.parseEther("50000"));
  await tx.wait();
  // add lp token
  const lpTokenAddress =
    getSavedContractAddresses()[hre.network.name]["ZSN-TOKEN"];
  await Farm.add(100, lpTokenAddress, true);
  console.log("Farm funded and LP token added");

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
