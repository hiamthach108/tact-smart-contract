import { Address, Dictionary, toNano } from "@ton/core";
import { Blockchain } from "@ton/sandbox";
import "@ton/test-utils";
import { MultiSendContract } from "./output/mapp_MultiSendContract";

describe("multisend", () => {
    it("should deploy multisend contract correctly", async () => {
        // Create Sandbox and deploy contract
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");

        let tokenAddress = Address.parse("kQAFFmHKD-aoQVqWRWBktdrYYLMtgzMQ2FLK9MtAF7S2xU4j");
        let contract = system.openContract(await MultiSendContract.fromInit(tokenAddress));
        const deployResult = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            { $$type: "Deploy", queryId: 0n }
        );
        expect(deployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            deploy: true,
            success: true,
        });
    });

    it("should send basic check", async () => {
        // Create Sandbox and deploy contract
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");
        let recipient = await system.treasury("recipient");

        let tokenAddress = Address.parse("kQAFFmHKD-aoQVqWRWBktdrYYLMtgzMQ2FLK9MtAF7S2xU4j");
        let contract = system.openContract(await MultiSendContract.fromInit(tokenAddress));
        const deployResult = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            { $$type: "Deploy", queryId: 0n }
        );
        expect(deployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            deploy: true,
            success: true,
        });

        // Send
        const sendAmount = toNano(100);
        const recipients = Dictionary.empty<Address, bigint>();
        recipients.set(recipient.address, sendAmount);

        const sendResult = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            { $$type: "MultiSend", recipients: recipients }
        );
        expect(sendResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
        });

        // check history
        const history = await contract.getRecipients();
        // log history
        console.log("history", history);
        // expect history to contain recipient.address
        const amount = history.get(recipient.address);
        expect(amount).toEqual(sendAmount);
    });

    it("should send multiple specific recipients", async () => {
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");
        let recipient1 = Address.parse("UQCT_yTOrkaGn6h500icKrkvy1S7lQ86u6V3ERKZO8sqF_4C");
        let recipient2 = Address.parse("UQC70cW5cnzwGTd53Lb31s7XGgzPdaJroImPh6JhesqLvwNA");

        let tokenAddress = Address.parse("kQAFFmHKD-aoQVqWRWBktdrYYLMtgzMQ2FLK9MtAF7S2xU4j");
        let contract = system.openContract(await MultiSendContract.fromInit(tokenAddress));

        const recipients = Dictionary.empty<Address, bigint>();
        recipients.set(recipient1, toNano(100));
        recipients.set(recipient2, toNano(200));

        const sendResult = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            { $$type: "MultiSend", recipients: recipients }
        );
        expect(sendResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
        });

        // check history
        const history = await contract.getRecipients();
        // log history
        console.log("history", history);
        // expect history to contain recipient1 and recipient2
        const amount1 = history.get(recipient1);
        expect(amount1).toEqual(toNano(100));

        const amount2 = history.get(recipient2);
        expect(amount2).toEqual(toNano(200));
    });
});
