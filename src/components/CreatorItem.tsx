import { technoRaceFont } from "@/font";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface StyledComponentProps {
  typeButton: string;
}

const CreatorItem = ({ item }: any) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Title className={technoRaceFont.className}>{item.title}</Title>
      <ContainerImage>
        <Image src={item.image} alt="gold" height={200} width={200} />
      </ContainerImage>
      <ButtonContainer>
        <ButtonItem onClick={() => router.push(`/upload-asset`)} typeButton="">
          Submit
        </ButtonItem>
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
  justify-content: center;
  /* padding: 20px; */
  gap: 36px;
  width: 400px;
  height: 480px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 2px solid rgba(62, 111, 255, 0.4);
  background: radial-gradient(
      110.18% 67.48% at 32.08% -8.14%,
      rgba(62, 111, 255, 0.4) 0%,
      rgba(62, 111, 255, 0) 100%
    ),
    rgba(17, 14, 3, 0.4);
  border-radius: 12px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;
const Title = styled.div`
  font-size: 32px;
  color: #ffffff;
`;

const ContainerImage = styled.div`
img {
  width: 200px;
  height: 200px;
}`;

const ButtonItem = styled.button<StyledComponentProps>`
  border-radius: 4px;
  width: 100%;
  border: 1px solid;
  padding: 8px 16px;
  margin: 0 20px;
  font-size: 16px;
  background-color: ${(props) =>
    props.typeButton === "manage" ? "#FED73B" : " #000000"};
  color: ${(props) => (props.typeButton !== "manage" ? "#FED73B" : " #000000")};
`;
