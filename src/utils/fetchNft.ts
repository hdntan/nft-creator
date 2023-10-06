// Go to www.alchemy.com and create an account to grab your own api key!
const apiKey = "F_v3giM_QYUTUdgcsSJxxgSXw-cpf1aN";
const endpoint = `https://eth-goerli.g.alchemy.com/v2/${apiKey}`;

export const fetchNFTs = async (owner:any, contractAddress:any, setNFTs:any) => {
    // if (retryAttempt === 5) {
    //     return;
    // }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
            } else {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(data => data.json())
            }
        } catch (e) {
            fetchNFTs(owner, contractAddress, setNFTs)
        }

        setNFTs(data.ownedNfts)
        return data
    }
}

