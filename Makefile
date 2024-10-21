farm:
	@npx hardhat compile
	@npx hardhat run --network local scripts/deployment/deploy_zsn_token.js
	@npx hardhat run --network local scripts/deployment/deploy_airdrop_zsn.js
	@npx hardhat run --network local scripts/deployment/deploy_farm.js
node:
	@npx hardhat node
runtest:
	@npx hardhat test
upgrades:
	@npx hardhat run --network local scripts/deployment/upgrades.js