import {
  contractNftCreatorFactory,
  getContract,
  uploadNFTRequest,
} from "@/services";
import { imageNameToUrl } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAccount } from "wagmi";

interface StyledLabelProps {
  fontSize: string;
  textColor: string;
}

interface UploadForm {
  name: string;
  symbol: string;
  description: string;
  type: string;
  file: string;
}

const UploadForm = () => {
  const route = useRouter();
  const { register, control, handleSubmit } = useForm<UploadForm>();

  const [imageNft, setImageNft] = useState<File>();

  const { address, isConnected } = useAccount();

  const onChangFile = async (e: any) => {
    let file = e.target.files[0];
    setImageNft(file);
  };

  const validateUpload = (data: any) => {
    if (!data.name) {
      alert("please enter name NFT");
      return false;
    }
    if (!data.image && !imageNft) {
      alert("please enter image NFT");
      return false;
    }
    if (!data.symbol) {
      alert("please enter symbol NFT");
      return false;
    }
    if (!data.description) {
      alert("please enter description NFT");
      return false;
    }
  };

  const removeImage = () => {
    setImageNft(undefined);
  };

  const onSubmit = async (data: any) => {
    validateUpload(data);

    const dataSubmit = { ...data, creator: address, file: imageNft };
    console.log("datasubmit", dataSubmit);

    try {
      const record = await uploadNFTRequest(dataSubmit);
      console.log("record", record, imageNameToUrl(record.data.data.fileName));
      // route.push("/overview");
      console.log("upload data be");

      if (record) {
        const contract = await contractNftCreatorFactory();
        if (contract) {
          const transaction = await contract.createCollection(
            record.data.data.name,
            record.data.data.symbol,
            imageNameToUrl(record.data.data.fileName),
            record.data.data.id
          );
          await transaction.wait();
        }
      }
      console.log("upload nft successful");
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <WrapperFormUpload>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label textColor="" fontSize="32px">
          Upload Asset
        </Label>
        <br />
        <Label textColor="" fontSize="">
          Asset Type
        </Label>

        <SelectInput {...register("type")}>
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
        <Label fontSize="12px" textColor="yellow">
          Learn more
        </Label>
        <br />

        <ContainerSelectImage>
          {!!imageNft ? (
            <ContainerImage>
              <img
                src={URL.createObjectURL(imageNft)}
                className=" rounded-xl  object-cover w-[129px] h-[129px]  "
              />
            </ContainerImage>
          ) : (
            <ContainerImage />
          )}
          <SelectImageRight>
            <ContainerButtonSelect>
              <ImageUploadButton>
                Change
                <Controller
                  name="file"
                  control={control}
                  render={({ field }) => (
                    <HiddenInput
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        field.onChange(e);
                        onChangFile(e);
                      }}
                    />
                  )}
                />
              </ImageUploadButton>
              <ImageUploadButton onClick={removeImage}>
                Remove
              </ImageUploadButton>
            </ContainerButtonSelect>
            <ContainerLabel>
              <Label textColor="" fontSize="">
                Filename: curve-arrow-pointing-left.psd
              </Label>
              <Label textColor="" fontSize="">
                Format: *.psd
              </Label>
              <Label textColor="" fontSize="">
                Max size per file: 20 MB
              </Label>
              <Label textColor="" fontSize="">
                Image will be visible to others after moderation.
              </Label>
            </ContainerLabel>
          </SelectImageRight>
        </ContainerSelectImage>

        <Label textColor="" fontSize="">
          Name*
        </Label>

        <Input
          type="text"
          placeholder="curve-arrow-pointing-left"
          {...register("name")}
        />

        <Label textColor="" fontSize="">
          Symbol*
        </Label>

        <Input
          type="text"
          placeholder="curve-arrow-pointing-left"
          {...register("symbol")}
        />

        <Label textColor="" fontSize="12px">
          25/50 characters
        </Label>
        <br />
        <Label textColor="" fontSize="">
          Description*
        </Label>

        <TextArea
          placeholder="curve-arrow-pointing-left"
          {...register("description")}
        />
        <Label textColor="" fontSize="12px">
          5/1000 characters
        </Label>

        <ContainerButton>
          <Button type="submit">Upload NFT</Button>
        </ContainerButton>
      </Form>
    </WrapperFormUpload>
  );
};

export default UploadForm;

const WrapperFormUpload = styled.div`
  /* margin: 64px 0 105px 0; */
  /* 

  display: flex;
  align-items: center;
  justify-content: center; */

  color: white;
  width: 850px;
  padding: 24px 36px;
  border: 1px solid #1647cf;
  border-radius: 8px;
  background: linear-gradient(0deg, #00062b, #00062b),
    linear-gradient(90deg, #021491 -16.29%, #1647cf 106.35%);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label<StyledLabelProps>`
  font-size: ${(props) => props.fontSize || "14px"};
  color: ${(props) => (props.textColor !== "yellow" ? "#FFFFFF" : "#FED73B")};
`;

const ImageUploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 304px;
  padding: 10px;
  border: 1px solid #fed73b;
  background: linear-gradient(0deg, #000000, #000000),
    linear-gradient(0deg, #fed73b, #fed73b);

  color: #fed73b;

  border-radius: 4px;
  cursor: pointer;
`;

const ContainerSelectImage = styled.div`
  display: flex;
  gap: 24px;
`;

const SelectImageRight = styled.div``;
const ContainerLabel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 17px;
`;
const ContainerButtonSelect = styled.div`
  display: flex;
  gap: 13px;
`;
const ContainerImage = styled.div`
  width: 129px;
  height: 129px;
  border: 1px solid rgba(62, 111, 255, 1);
  background: linear-gradient(0deg, #121949, #121949),
    linear-gradient(0deg, #3e6fff, #3e6fff);
  border-radius: 8px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Input = styled.input`
  margin: 8px 0 13px 0;
  padding: 16px 12px;
  font-size: 16px;
  background: linear-gradient(0deg, #121949, #121949),
    linear-gradient(0deg, #3e6fff, #3e6fff);
  option {
    background-color: #fff;
    color: #333;
  }
  border: 0.5px solid rgba(62, 111, 255, 1);
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  height: 130px;
  margin: 8px 0 13px 0;
  padding: 16px 12px;
  font-size: 16px;
  background: linear-gradient(0deg, #121949, #121949),
    linear-gradient(0deg, #3e6fff, #3e6fff);
  option {
    background-color: #fff;
    color: #333;
  }
  border: 0.5px solid rgba(62, 111, 255, 1);
  border-radius: 4px;
`;

const ContainerButton = styled.div`
  display: flex;

  margin: 24px 0;
  justify-content: end;
`;
const Button = styled.button`
  width: 137px;
  height: 53px;
  padding: 10px;
  background-color: #fed73b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 24px;
  color: #000000;
`;

const SelectInput = styled.select`
  margin: 8px 0 13px 0;
  padding: 16px 12px;
  font-size: 16px;
  background: linear-gradient(0deg, #121949, #121949),
    linear-gradient(0deg, #3e6fff, #3e6fff);
  option {
    background-color: #fff;
    color: #333;
  }
  border: 0.5px solid rgba(62, 111, 255, 1);
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const OPTIONS = [
  {
    value: "1",
    label: "NFT Skins",
  },
  {
    value: "2",
    label: "Character weapons",
  },
  {
    value: "3",
    label: "Map",
  },
  {
    value: "4",
    label: "Worlds",
  },
];
