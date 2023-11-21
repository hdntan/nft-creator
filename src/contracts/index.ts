import gameAbi from "./abi/AbiContract.json";

const GameContract = {
  abi: gameAbi,
  address: process.env.NEXT_PUBLIC_GAME_ADDRESS || "",
};

export { GameContract };
