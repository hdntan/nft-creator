import gameAbi from "./abi/AbiContract.json";
import nftCreatorFactoryAbi from "./abi/NFTCreatorFactory.json";
import gamingTokenAbi from "./abi/GamingToken.json";

const GameContract = {
  abi: gameAbi,
  address: process.env.NEXT_PUBLIC_GAME_ADDRESS || "",
};

const NFTCreatorFactory = {
  abi: nftCreatorFactoryAbi,
  address: process.env.NEXT_PUBLIC_NFT_CREATOR_FACTORY_ADDRESS || "",
};

const GamingToken = {
  abi: gamingTokenAbi,
  address: process.env.NEXT_PUBLIC_GAMING_TOKEN_ADDRESS || ""
}
export { GameContract, NFTCreatorFactory, GamingToken };
