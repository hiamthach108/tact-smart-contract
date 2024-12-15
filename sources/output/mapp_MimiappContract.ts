import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type WithdrawUpdate = {
    $$type: 'WithdrawUpdate';
    amount: bigint;
    destination: Address;
}

export function storeWithdrawUpdate(src: WithdrawUpdate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(462494594, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
    };
}

export function loadWithdrawUpdate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 462494594) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    return { $$type: 'WithdrawUpdate' as const, amount: _amount, destination: _destination };
}

function loadTupleWithdrawUpdate(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'WithdrawUpdate' as const, amount: _amount, destination: _destination };
}

function loadGetterTupleWithdrawUpdate(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'WithdrawUpdate' as const, amount: _amount, destination: _destination };
}

function storeTupleWithdrawUpdate(source: WithdrawUpdate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserWithdrawUpdate(): DictionaryValue<WithdrawUpdate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawUpdate(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawUpdate(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _responseDestination = sc_0.loadMaybeAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0;
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forwardPayload = sc_0;
    return { $$type: 'JettonTransferNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

function loadGetterTupleJettonTransferNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    ownerAddress: Address;
    jettonMasterAddress: Address;
    jettonWalletCode: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.ownerAddress);
        b_0.storeAddress(src.jettonMasterAddress);
        b_0.storeRef(src.jettonWalletCode);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _ownerAddress = sc_0.loadAddress();
    let _jettonMasterAddress = sc_0.loadAddress();
    let _jettonWalletCode = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, ownerAddress: _ownerAddress, jettonMasterAddress: _jettonMasterAddress, jettonWalletCode: _jettonWalletCode };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _ownerAddress = source.readAddress();
    let _jettonMasterAddress = source.readAddress();
    let _jettonWalletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, ownerAddress: _ownerAddress, jettonMasterAddress: _jettonMasterAddress, jettonWalletCode: _jettonWalletCode };
}

function loadGetterTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _ownerAddress = source.readAddress();
    let _jettonMasterAddress = source.readAddress();
    let _jettonWalletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, ownerAddress: _ownerAddress, jettonMasterAddress: _jettonMasterAddress, jettonWalletCode: _jettonWalletCode };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.ownerAddress);
    builder.writeAddress(source.jettonMasterAddress);
    builder.writeCell(source.jettonWalletCode);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type MimiappContract$Data = {
    $$type: 'MimiappContract$Data';
    owner: Address;
    tokenAddress: Address;
    recipients: Dictionary<Address, bigint>;
    totalWithdrawn: bigint;
    totalClaimed: bigint;
    myJettonWalletAddress: Address;
    myJettonAmount: bigint;
}

export function storeMimiappContract$Data(src: MimiappContract$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.tokenAddress);
        b_0.storeDict(src.recipients, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.totalWithdrawn, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.totalClaimed, 257);
        b_1.storeAddress(src.myJettonWalletAddress);
        b_1.storeCoins(src.myJettonAmount);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMimiappContract$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _tokenAddress = sc_0.loadAddress();
    let _recipients = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _totalWithdrawn = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _totalClaimed = sc_1.loadIntBig(257);
    let _myJettonWalletAddress = sc_1.loadAddress();
    let _myJettonAmount = sc_1.loadCoins();
    return { $$type: 'MimiappContract$Data' as const, owner: _owner, tokenAddress: _tokenAddress, recipients: _recipients, totalWithdrawn: _totalWithdrawn, totalClaimed: _totalClaimed, myJettonWalletAddress: _myJettonWalletAddress, myJettonAmount: _myJettonAmount };
}

function loadTupleMimiappContract$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _tokenAddress = source.readAddress();
    let _recipients = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _totalWithdrawn = source.readBigNumber();
    let _totalClaimed = source.readBigNumber();
    let _myJettonWalletAddress = source.readAddress();
    let _myJettonAmount = source.readBigNumber();
    return { $$type: 'MimiappContract$Data' as const, owner: _owner, tokenAddress: _tokenAddress, recipients: _recipients, totalWithdrawn: _totalWithdrawn, totalClaimed: _totalClaimed, myJettonWalletAddress: _myJettonWalletAddress, myJettonAmount: _myJettonAmount };
}

function loadGetterTupleMimiappContract$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _tokenAddress = source.readAddress();
    let _recipients = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _totalWithdrawn = source.readBigNumber();
    let _totalClaimed = source.readBigNumber();
    let _myJettonWalletAddress = source.readAddress();
    let _myJettonAmount = source.readBigNumber();
    return { $$type: 'MimiappContract$Data' as const, owner: _owner, tokenAddress: _tokenAddress, recipients: _recipients, totalWithdrawn: _totalWithdrawn, totalClaimed: _totalClaimed, myJettonWalletAddress: _myJettonWalletAddress, myJettonAmount: _myJettonAmount };
}

function storeTupleMimiappContract$Data(source: MimiappContract$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.tokenAddress);
    builder.writeCell(source.recipients.size > 0 ? beginCell().storeDictDirect(source.recipients, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.totalWithdrawn);
    builder.writeNumber(source.totalClaimed);
    builder.writeAddress(source.myJettonWalletAddress);
    builder.writeNumber(source.myJettonAmount);
    return builder.build();
}

function dictValueParserMimiappContract$Data(): DictionaryValue<MimiappContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMimiappContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMimiappContract$Data(src.loadRef().beginParse());
        }
    }
}

 type MimiappContract_init_args = {
    $$type: 'MimiappContract_init_args';
    tokenAddress: Address;
    jettonWalletCode: Cell;
}

function initMimiappContract_init_args(src: MimiappContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.tokenAddress);
        b_0.storeRef(src.jettonWalletCode);
    };
}

async function MimiappContract_init(tokenAddress: Address, jettonWalletCode: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMimiappContract_init_args({ $$type: 'MimiappContract_init_args', tokenAddress, jettonWalletCode })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MimiappContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    12495: { message: `Notification not from your jetton wallet!` },
    52232: { message: `No amount to claim` },
}

const MimiappContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawUpdate","header":462494594,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"ownerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonMasterAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWalletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MimiappContract$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"recipients","type":{"kind":"dict","key":"address","value":"int"}},{"name":"totalWithdrawn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"myJettonWalletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"myJettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const MimiappContract_getters: ABIGetter[] = [
    {"name":"claimable","arguments":[{"name":"adr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"recipients","arguments":[],"returnType":{"kind":"dict","key":"address","value":"int"}},
    {"name":"totalWithdrawn","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"totalClaimed","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"tokenAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"myJettonWalletAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"myJettonAmount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const MimiappContract_getterMapping: { [key: string]: string } = {
    'claimable': 'getClaimable',
    'recipients': 'getRecipients',
    'totalWithdrawn': 'getTotalWithdrawn',
    'totalClaimed': 'getTotalClaimed',
    'tokenAddress': 'getTokenAddress',
    'myJettonWalletAddress': 'getMyJettonWalletAddress',
    'myJettonAmount': 'getMyJettonAmount',
}

const MimiappContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawUpdate"}},
    {"receiver":"internal","message":{"kind":"text","text":"claim"}},
    {"receiver":"internal","message":{"kind":"text","text":"claim_test"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class MimiappContract implements Contract {
    
    static async init(tokenAddress: Address, jettonWalletCode: Cell) {
        return await MimiappContract_init(tokenAddress, jettonWalletCode);
    }
    
    static async fromInit(tokenAddress: Address, jettonWalletCode: Cell) {
        const init = await MimiappContract_init(tokenAddress, jettonWalletCode);
        const address = contractAddress(0, init);
        return new MimiappContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MimiappContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MimiappContract_types,
        getters: MimiappContract_getters,
        receivers: MimiappContract_receivers,
        errors: MimiappContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonTransferNotification | WithdrawUpdate | 'claim' | 'claim_test' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferNotification') {
            body = beginCell().store(storeJettonTransferNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawUpdate') {
            body = beginCell().store(storeWithdrawUpdate(message)).endCell();
        }
        if (message === 'claim') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'claim_test') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getClaimable(provider: ContractProvider, adr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(adr);
        let source = (await provider.get('claimable', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getRecipients(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('recipients', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    
    async getTotalWithdrawn(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('totalWithdrawn', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTotalClaimed(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('totalClaimed', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTokenAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tokenAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getMyJettonWalletAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('myJettonWalletAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getMyJettonAmount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('myJettonAmount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}