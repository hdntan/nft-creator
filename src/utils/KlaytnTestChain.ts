import { Chain } from '@wagmi/core'
 
export const klaytnBaobab = {
  id: 1001,
  name: 'Klaytn Baobab',
  network: 'Klaytn Baobab',
  nativeCurrency: {
    decimals: 18,
    name: 'KLAY',
    symbol: 'KLAY',
  },
  rpcUrls: {
    public: { http: ['https://api.baobab.klaytn.net:8651'] },
    default: { http: ['https://api.baobab.klaytn.net:8651'] },
  },
  blockExplorers: {
    etherscan: { name: 'Baobab', url: 'https://baobab.klaytnscope.com/' },
    default: { name: 'Baobab', url: 'https://baobab.klaytnscope.com/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain