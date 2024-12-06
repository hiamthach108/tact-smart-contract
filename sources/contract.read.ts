import { Address, contractAddress } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { CocoMonContract } from "./output/mapp_CocoMonContract";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });
    let init = await CocoMonContract.init(Address.parse("kQAFFmHKD-aoQVqWRWBktdrYYLMtgzMQ2FLK9MtAF7S2xU4j"));
    let contract_address = contractAddress(0, init);
    let recipient1 = Address.parse("UQCT_yTOrkaGn6h500icKrkvy1S7lQ86u6V3ERKZO8sqF_4C");

    let contract = await CocoMonContract.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("History: " + (await contract_open.getClaimable(recipient1)));
})();
