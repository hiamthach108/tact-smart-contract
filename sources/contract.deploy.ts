import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress, Cell } from "@ton/core";
import { MimiappContract } from "./output/mapp_MimiappContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    let testnet = true;
    let packageName = "mapp_MimiappContract.pkg";
    let tokenAddr = Address.parse("kQBvQUrxabaus5u9P1Rp-FW8XSswFYEHQ7smJoSX6EE638jO");
    let cell = new Cell();
    let init = await MimiappContract.init(tokenAddr, cell);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
