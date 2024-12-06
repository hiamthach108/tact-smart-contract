import { Address, Dictionary, toNano } from "@ton/core";
import { Blockchain } from "@ton/sandbox";
import "@ton/test-utils";
import { CocoMonContract } from "./output/mapp_CocoMonContract";

describe("cocomon", () => {
    it("should deploy cocomon contract correctly", async () => {
        // Create Sandbox and deploy contract
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");

        let tokenAddress = Address.parse("kQAFFmHKD-aoQVqWRWBktdrYYLMtgzMQ2FLK9MtAF7S2xU4j");
        let contract = system.openContract(await CocoMonContract.fromInit(tokenAddress));
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

    it("should update specific recipients", async () => {
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");
        let recipient1 = Address.parse("UQCT_yTOrkaGn6h500icKrkvy1S7lQ86u6V3ERKZO8sqF_4C");
        let recipient2 = Address.parse("UQC70cW5cnzwGTd53Lb31s7XGgzPdaJroImPh6JhesqLvwNA");

        let tokenAddress = Address.parse("kQAFFmHKD-aoQVqWRWBktdrYYLMtgzMQ2FLK9MtAF7S2xU4j");
        let contract = system.openContract(await CocoMonContract.fromInit(tokenAddress));

        const recipients = Dictionary.empty<Address, bigint>();
        recipients.set(recipient1, toNano(1));
        recipients.set(recipient2, toNano(2));

        const sendResult = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            { $$type: "ClaimUpdate", recipients: recipients }
        );
        expect(sendResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
        });

        const result = await contract.getRecipients();
        const amount1 = result.get(recipient1);
        expect(amount1).toEqual(toNano(1));

        const amount2 = result.get(recipient2);
        expect(amount2).toEqual(toNano(2));
    });

    it("should update recipient and claim it", async () => {
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");
        let nonOwner = await system.treasury("non-owner");

        let tokenAddress = Address.parse("kQAFFmHKD-aoQVqWRWBktdrYYLMtgzMQ2FLK9MtAF7S2xU4j");
        let contract = system.openContract(await CocoMonContract.fromInit(tokenAddress));

        const recipients = Dictionary.empty<Address, bigint>();
        recipients.set(nonOwner.address, toNano(1));

        const sendResult = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            { $$type: "ClaimUpdate", recipients: recipients }
        );
        expect(sendResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
        });

        const result = await contract.getRecipients();
        const amount1 = result.get(nonOwner.address);
        expect(amount1).toEqual(toNano(1));

        const claimResult = await contract.send(
            nonOwner.getSender(),
            { value: toNano(1) },
            { $$type: "Claim", amount: toNano(1) }
        );

        expect(claimResult.transactions).toHaveTransaction({
            from: nonOwner.address,
            to: contract.address,
            success: true,
        });

        const result2 = await contract.getClaimable(nonOwner.address);
        expect(result2).toEqual(toNano(0));
    });
});
