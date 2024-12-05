import "@stdlib/deploy";


message MultiSend {
    recipients: map<Address, Int>;
}

const JettonTransferGas: Int = ton("0.05");

message(0xf8a7ea5) JettonTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    responseDestination: Address?;
    customPayload: Cell? = null;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}

message Claim {
    amount: Int as coins;
}

struct JettonWalletData {
    balance: Int as coins;
    ownerAddress: Address;
    jettonMasterAddress: Address;
    jettonWalletCode: Cell;
}

fun calculateJettonWalletAddress(
    ownerAddress: Address,
    jettonMasterAddress: Address,
    jettonWalletCode: Cell,
): Address {

    let initData = JettonWalletData{
        balance: 0,
        ownerAddress,
        jettonMasterAddress,
        jettonWalletCode,
    };

    return contractAddress(StateInit{
        code: jettonWalletCode,
        data: initData.toCell(),
    });
}

contract MultiSendContract with Deployable {
    owner: Address;
    tokenAddress: Address;
    tokenBalance: Int as coins;
    recipients: map<Address, Int>;

    init(tokenAddress: Address) {
        self.owner = context().sender;
        self.tokenAddress = tokenAddress;
        self.tokenBalance = 0;
    }

    receive(msg: MultiSend) {
        self.multiSend(msg.recipients);
    }

    fun multiSend(recipients: map<Address, Int>) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");

        foreach (recipient, amount in recipients) {
            let cmt: StringBuilder = beginComment();
            let old = self.recipients.get(recipient);
            if (old == null) {
                self.recipients.set(recipient, amount);
            } else {
                let new = old!! + amount;
                self.recipients.set(recipient, new);
            }
        }

        self.reply("sent".asComment());
    }

    receive(msg: Claim) {
        let ctx: Context = context();
        let amount = self.recipients.get(ctx.sender);
        require(amount != null && amount != 0, "No amount to claim");

        send(SendParameters{
            to: ctx.sender, 
            value: JettonTransferGas, 
            body: JettonTransfer{
                // To prevent replay attacks
                queryId: 42,
                // Jetton amount to transfer
                amount: msg.amount,
                // Where to transfer Jettons:
                // this is an address of the Jetton wallet
                // owner and not the Jetton wallet itself
                destination: sender(),
                // Where to send a confirmation notice of a successful transfer
                // and the rest of the incoming message value
                responseDestination: sender(),
                // Can be used for custom logic of Jettons themselves,
                // and without such can be set to null
                customPayload: null,
                // Amount to transfer with JettonTransferNotification,
                // which is needed for the execution of custom logic
                forwardTonAmount: 1, // if its 0, the notification won't be sent!
                // Compile-time way of expressing:
                //     beginCell().storeUint(0xF, 4).endCell().beginParse()
                // For more complicated transfers, adjust accordingly
                forwardPayload: rawSlice("F")
            }.toCell(),
        });

        self.recipients.set(ctx.sender, 0);
    }
}
