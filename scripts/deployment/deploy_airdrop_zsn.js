const hre = require("hardhat");
const {} = require("../utils");

async function main() {
    // get zsn token address from contract address file
    const zsnTokenAddress = getSavedContractAddresss()[hre.network.name]["ZSN-TOKEN"];
    console.log("zsnTokenAddress: ",zsnTokenAddress);

    const air = hre.ethers.getContractFactory("Airdrop");
    const Air = await air.deploy(zsnTokenAddress);
    await Air.deployed();
    console.log("Air deployed to: ", Air.address);

    saveContractAddress(hre.network.name, "Airdrop-ZSN", Air.address);
    // send zsn token to airdrop contract
    const zsnToken = await hre.ethers.getContractAt("ZSNToken", zsnTokenAddress);
    let tx = await zsnToken.transfer(Air.address, ethers.utils.parseEther("10000"));
    // wait for transfer
    await tx.wait();
    // get airdrop balance of zsn token
    const balance = await zsnToken.balanceOf(Air.address);
    console.log("Airdrop balance of ZSN token: ", ethers.utils.formatEther(balance));

    // test airdrop
    tx = await Air.withdrawTokens();
    await tx.wait();
    // get airdrop balance of zsn token
    const balanceAfter = await zsnToken.balanceOf(Air.address);
    console.log("Airdrop balance of ZSN token after withdrawTokens: ", ethers.utils.formatEther(balanceAfter));
}