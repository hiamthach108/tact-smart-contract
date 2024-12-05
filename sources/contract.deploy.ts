import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
// import { SampleTactContract } from "./output/mapp_SampleTactContract";
import { MultiSendContract } from "./output/mapp_MultiSendContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

// (async () => {
//     // Parameters
//     let testnet = true;
//     let packageName = "mapp_SampleTactContract.pkg";
//     let owner = Address.parse("kQBM7QssP28PhrctDOyd47_zpFfDiQvv5V9iXizNopb1d2LB");
//     let init = await SampleTactContract.init(owner);

//     // Load required data
//     let address = contractAddress(0, init);
//     let data = init.data.toBoc();
//     let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

//     // Prepareing
//     console.log("Uploading package...");
//     let prepare = await prepareTactDeployment({ pkg, data, testnet });

//     // Deploying
//     console.log("============================================================================================");
//     console.log("Contract Address");
//     console.log("============================================================================================");
//     console.log();
//     console.log(address.toString({ testOnly: testnet }));
//     console.log();
//     console.log("============================================================================================");
//     console.log("Please, follow deployment link");
//     console.log("============================================================================================");
//     console.log();
//     console.log(prepare);
//     console.log();
//     console.log("============================================================================================");
// })();

(async () => {
    let testnet = true;
    let packageName = "mapp_MultiSendContract.pkg";
    let tokenAddr = Address.parse("kQAFFmHKD-aoQVqWRWBktdrYYLMtgzMQ2FLK9MtAF7S2xU4j");
    let init = await MultiSendContract.init(tokenAddr);

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
