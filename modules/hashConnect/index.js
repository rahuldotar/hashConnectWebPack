const hashConnect = new window.HashConnect(true);
const { TransferTransaction,Hbar } = window.hashgraph

const connectHashGraph = async () => {
    console.log({hashConnect})
    const appMetadata = {
        name: "dApp Example",
        description: "An example hedera dApp",
        icon: "https://absolute.url/to/icon.png",
        url:"http://127.0.0.1:5555/"
    }
    let initData = await hashConnect.init(appMetadata, "testnet", false);
    console.log({initData})

    const connection = await hashConnect.connect(initData.topic, appMetadata);
    console.log({connection})
    
    const accountId = "0.0.48966911"
    const otherAccountId = "0.0.48609370"

    const pairingString = await hashConnect.generatePairingString(connection,'testnet',false)
    console.log({pairingString})

    await hashConnect.findLocalWallets()
    await hashConnect.connectToLocalWallet(pairingString)

    hashConnect.connectionStatusChangeEvent.once(async (connectionStatus) => {
        console.log({connectionStatus})
        const provider = await hashConnect.getProvider("testnet", initData.topic,accountId );
        console.log({provider})

        const balance = (await provider.getAccountBalance(accountId)).toString();
        console.log({balance})

        const signer = await hashConnect.getSigner(provider);
        console.log({signer})

        const transaction = await new TransferTransaction()
        .addHbarTransfer(accountId, new Hbar(-10))
        .addHbarTransfer(otherAccountId, new Hbar(10))
        .freezeWithSigner(signer);

        console.log({transaction})

        const res = await transaction.executeWithSigner(signer);
        console.log({res})
    })

    
}


