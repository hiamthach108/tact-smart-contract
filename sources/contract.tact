import "@stdlib/deploy";

message Add {
    amount: Int as uint32;
}

contract SampleTactContract with Deployable {

    owner: Address;
    counter: Int as uint32;

    init(owner: Address) {
        self.owner = owner;
        self.counter = 0;
    }

    fun add(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        self.counter += v;
    }

    receive(msg: Add) {
        self.add(msg.amount);
    }

    receive("increment") {
        self.add(1);
        self.reply("incremented".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }
}

message MultiSend {
    recipients: map<Address, Int>;
}

contract MultiSendContract with Deployable {
    owner: Address;
    tokenAddress: Address;
    recipients: map<Address, Int>;

    init(tokenAddress: Address) {
        self.owner = context().sender;
        self.tokenAddress = tokenAddress;
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

    get fun recipients(): map<Address, Int> {
        return self.recipients;
    }

    get fun claimableToken(addr: Address): Int {
        let amount = self.recipients.get(addr);
        if (amount == null) {
            return 0;
        }

        return amount!!;
    }
}
