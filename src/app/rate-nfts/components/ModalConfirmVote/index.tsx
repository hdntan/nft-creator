import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import * as React from "react";

export interface IModalConfirmVoteProps {}

export default function ModalConfirmVote(props: IModalConfirmVoteProps) {
  const { isShowing, toggle } = useModal();
  return (
    <Modal isShowing={isShowing} hide={toggle}>
      <p>aaaa</p>
    </Modal>
  );
}
