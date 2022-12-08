const hashConnect = new window.HashConnect(true);
const { TransferTransaction,Hbar } = window.hashgraph

const connectHashGraph = async () => {
    const hashconnect = new HashConnect()

    const appMetadata = {
        name: "dApp Example",
        description: "An example hedera dApp",
        icon: "https://absolute.url/to/icon.png",
        url:"http://127.0.0.1:5555/"
    }
    

    const initData = await hashconnect.init(appMetadata, "testnet", false);
    console.log({initData})

  
    await hashconnect.findLocalWallets()

    hashconnect.foundExtensionEvent.once(async(walletMetadata) => {
      console.log({walletMetadata})

      const approved = await hashconnect.connectToLocalWallet(initData.pairingString,walletMetadata)
      console.log({approved})
  })

    hashconnect.pairingEvent.once(async (pairingData) => {
        console.log({pairingData})

        const accountId = pairingData.accountIds[0]
        const otherAccountId = "0.0.48609370"

        const provider = await hashconnect.getProvider("testnet", initData.topic,pairingData.accountIds[0] );
        console.log({provider})

        const balance = (await provider.getAccountBalance(accountId)).toString();
        console.log({balance})

        const signer = await hashconnect.getSigner(provider);
        console.log({signer})

        const transaction = await new TransferTransaction()
        .addHbarTransfer(accountId, new Hbar(-10))
        .addHbarTransfer(otherAccountId, new Hbar(10))
        .freezeWithSigner(signer);

        console.log({transaction})

        const res = await transaction.executeWithSigner(signer);
        console.log({res})
    })

    hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
      console.log({acknowledgeData})
  })

  hashconnect.connectionStatusChangeEvent.once((connectionStatus) => {
      console.log({connectionStatus})
  })
    
}


