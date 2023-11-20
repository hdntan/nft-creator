import * as React from "react";

export interface IIconCoinProps {}

export default function IconCoin(props: IIconCoinProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M20 3.33325C29.2 3.33325 36.6667 10.7999 36.6667 19.9999C36.6667 29.1999 29.2 36.6666 20 36.6666C10.8 36.6666 3.33334 29.1999 3.33334 19.9999C3.33334 10.7999 10.8 3.33325 20 3.33325ZM20 18.3333V13.3333L13.3333 19.9999L20 26.6666V21.6666H26.6667V18.3333H20Z"
        fill="#FED73B"
      />
    </svg>
  );
}
