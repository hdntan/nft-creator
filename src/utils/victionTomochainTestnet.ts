import { Chain } from '@wagmi/core'
 
export const tomochainTestnet = {
  id: 89,
  name: 'TomoChain Testnet',
  network: 'TomoChain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'TOMO',
    symbol: 'TOMO',
  },
  rpcUrls: {
    public: { http: ['https://rpc.testnet.tomochain.com'] },
    default: { http: ['https://rpc.testnet.tomochain.com'] },
  },
  blockExplorers: {
    etherscan: { name: 'Baobab', url: 'https://scan.testnet.tomochain.com' },
    default: { name: 'Baobab', url: 'https://scan.testnet.tomochain.com' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain