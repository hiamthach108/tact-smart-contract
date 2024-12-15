import { Address, Cell, toNano } from "@ton/core";
import { Blockchain } from "@ton/sandbox";
import "@ton/test-utils";
import { MimiappContract } from "./output/mapp_MimiappContract";

const TOKEN_ADDRESS = "kQBvQUrxabaus5u9P1Rp-FW8XSswFYEHQ7smJoSX6EE638jO";

describe("cocomon", () => {
    it("should deploy cocomon contract correctly", async () => {
        // Create Sandbox and deploy contract
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");
        let initcell = new Cell();

        let tokenAddress = Address.parse(TOKEN_ADDRESS);
        let contract = system.openContract(await MimiappContract.fromInit(tokenAddress, initcell));
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
        let initcell = new Cell();

        let recipient1 = Address.parse("UQCT_yTOrkaGn6h500icKrkvy1S7lQ86u6V3ERKZO8sqF_4C");

        let tokenAddress = Address.parse(TOKEN_ADDRESS);
        let contract = system.openContract(await MimiappContract.fromInit(tokenAddress, initcell));

        let value = toNano(1);

        const sendResult = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            { $$type: "WithdrawUpdate", amount: value, destination: recipient1 }
        );
        expect(sendResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
        });

        const result = await contract.getRecipients();
        const amount1 = result.get(recipient1);
        expect(amount1).toEqual(value);
    });

    it("claim test", async () => {
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");
        let nonOwner = await system.treasury("non-owner");
        let initcell = new Cell();

        let tokenAddress = Address.parse(TOKEN_ADDRESS);
        let contract = system.openContract(await MimiappContract.fromInit(tokenAddress, initcell));
        const value = toNano(1);

        const sendResult = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            { $$type: "WithdrawUpdate", amount: value, destination: nonOwner.address }
        );
        expect(sendResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
        });

        const result = await contract.getRecipients();
        const amount1 = result.get(nonOwner.address);
        expect(amount1).toEqual(toNano(1));

        const claimResult = await contract.send(nonOwner.getSender(), { value: toNano(1) }, "claim_test");

        expect(claimResult.transactions).toHaveTransaction({
            from: nonOwner.address,
            to: contract.address,
            success: true,
        });

        const result2 = await contract.getClaimable(nonOwner.address);
        expect(result2).toEqual(toNano(1));
    });

    it("claim call", async () => {
        let system = await Blockchain.create();
        let owner = await system.treasury("owner");
        let nonOwner = await system.treasury("non-owner");
        let initcell = new Cell();

        let tokenAddress = Address.parse(TOKEN_ADDRESS);
        let contract = system.openContract(await MimiappContract.fromInit(tokenAddress, initcell));
        const value = toNano(1);

        const sendResult = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            { $$type: "WithdrawUpdate", amount: value, destination: nonOwner.address }
        );
        expect(sendResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
        });

        const result = await contract.getRecipients();
        const amount1 = result.get(nonOwner.address);
        expect(amount1).toEqual(toNano(1));

        const claimResult = await contract.send(nonOwner.getSender(), { value: toNano(1) }, "claim");

        expect(claimResult.transactions).toHaveTransaction({
            from: nonOwner.address,
            to: contract.address,
            success: true,
        });

        const result2 = await contract.getClaimable(nonOwner.address);
        expect(result2).toEqual(toNano(0));
    });
});
