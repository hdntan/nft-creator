import { IconStartHightlight, IconStartNull } from "@/assets/icons";
import * as React from "react";
import styled from "styled-components";

export interface IRatingProps {
  onChange: (rate: number) => void;
}

export default function Rating({ onChange }: IRatingProps) {
  const [rating, setRating] = React.useState(1);
  const [hover, setHover] = React.useState(0);

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
            {index <= (hover || rating) ? (
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
