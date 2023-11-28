import { IconStartHightlight, IconStartNull } from "@/assets/icons";
import { contractNftCreatorFactory } from "@/services";
import * as React from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";

export interface IRatingProps {
  onChange: (rate: number) => void;
  id: any;
}

export default function Rating({ onChange, id }: IRatingProps) {
  const { address } = useAccount();
  const user = address?.toString();

  const [rating, setRating] = React.useState(1);
  const [avgRate, setAvgRate] = React.useState<any>();
  const [hover, setHover] = React.useState(0);
  const getRating = async () => {
    try {
      const contract = await contractNftCreatorFactory();
      if (contract) {
        const transaction = await contract.voteHistory(user, id);
        const rate = transaction.toNumber();
        console.log("rate", rate.toFixed(0));
        setAvgRate(rate.toFixed(0));
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  React.useEffect(() => {
    getRating();
  }, []);
  return (
    <StartRating>
      {[...Array(5)].map((start, index) => {
        index += 1;
        return (
          <button
            key={start}
            onClick={() => {
              setRating(index);
              onChange(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            {index <= (hover || avgRate) ? (
              <IconStartHightlight />
            ) : (
              <IconStartNull />
            )}
          </button>
        );
      })}
    </StartRating>
  );
}
const StartRating = styled.div`
  display: flex;
  gap: 5px;
  button {
    margin: 0;
    padding: 0;
  }
`;
