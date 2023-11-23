import { IconPlus, IconStart } from "@/assets/icons";
import { useRouter } from "next/navigation";
import * as React from "react";
import styled from "styled-components";

export interface IListButtonProps {}

export default function ListButton(props: IListButtonProps) {
  const router = useRouter();
  return (
    <List>
      <ButtonVote onClick={() => router.push("/rate-nfts")}>
        <p>Rating</p>
        <IconStart />
      </ButtonVote>
      <ButtonUpload onClick={() => router.push("/upload-asset")}>
        <p>Upload Asset</p>
        <IconPlus />
      </ButtonUpload>
    </List>
  );
}

const List = styled.div`
  display: flex;
  cursor: pointer;
  p {
    color: #fed73b;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }
`;
const ButtonVote = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  width: 150px;
  border-radius: 8px 0px 0px 8px;
  border: 1px solid #fed73b;
`;

const ButtonUpload = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  min-width: 150px;
  border-radius: 0px 8px 8px 0px;
  border: 1px solid #fed73b;
`;
