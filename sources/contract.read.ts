import { Address, contractAddress } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { SampleTactContract } from "./output/mapp_SampleTactContract";
import { MultiSendContract } from "./output/mapp_MultiSendContract";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Parameters
    let owner = Address.parse("kQBM7QssP28PhrctDOyd47_zpFfDiQvv5V9iXizNopb1d2LB");
    let init = await SampleTactContract.init(owner);
    let contract_address = contractAddress(0, init);

    // Prepareing
    console.log("Reading Contract Info...");
    console.log(contract_address);

    // Input the contract address
    let contract = await SampleTactContract.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("Counter Value: " + (await contract_open.getCounter()));
})();

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });
    let init = await MultiSendContract.init(Address.parse("kQAFFmHKD-aoQVqWRWBktdrYYLMtgzMQ2FLK9MtAF7S2xU4j"));
    let contract_address = contractAddress(0, init);
    let recipient1 = Address.parse("UQCT_yTOrkaGn6h500icKrkvy1S7lQ86u6V3ERKZO8sqF_4C");

    let contract = await MultiSendContract.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("History: " + (await contract_open.getClaimableToken(recipient1)));
})();
