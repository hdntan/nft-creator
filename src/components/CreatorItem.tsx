import Image from "next/image";
import styled from "styled-components";
import Gold from "../assets/Gold.png";

interface StyledComponentProps {
  typeButton: string;
}

const CreatorItem = ({ item }: any) => {
  return (
    <Wrapper>
      <Title>{item.title}</Title>
      <ContainerImage>
        <Image src={Gold} alt="gold" height={200} width={200} />
      </ContainerImage>
      <ButtonContainer>
        <ButtonItem typeButton="manage">Manage</ButtonItem>
        <ButtonItem typeButton="">Submit</ButtonItem>
      </ButtonContainer>
    </Wrapper>
  );
};

export default CreatorItem;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px;
  gap: 36px;
  width: 398px;
  height: 480px;

  background: radial-gradient(
      107.25% 65.08% at 32.08% -8.14%,
      rgba(62, 111, 255, 0.4) 0%,
      rgba(62, 111, 255, 0) 100%
    ),
    rgba(17, 14, 3, 0.4);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Title = styled.div``;

const ContainerImage = styled.div``;
const ButtonItem = styled.button<StyledComponentProps>`
  border-radius: 4px;
  width: 326px;
  border: 1px solid;
  padding: 8px 16px 8px 16px;
  background-color: ${(props) =>
    props.typeButton === "manage" ? "#FED73B" : " #000000"};
  color: ${(props) => (props.typeButton !== "manage" ? "#FED73B" : " #000000")};
`;
