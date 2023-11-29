import { contractNftCreatorFactory, uploadNFTRequest } from "@/services";
import { showErrorToast, showSuccessToast } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
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
  const [imageDetail, setImageDetail] = useState<any>({});


  const { address, isConnected } = useAccount();

  let [loading, setLoading] = useState(false);

  const onChangFile = async (e: any) => {
    let file = e.target.files[0];
    const size = file.size  / (1024 * 1024)
    const fileObject = {
      fileName: file.name,
      format: file.type,
      size: size.toFixed(2)
    }
    setImageDetail(fileObject);
    setImageNft(file);
  };

  const validateUpload = (data: any) => {
    if(!isConnected) {
      showErrorToast("Please Connect Wallet");
      return false;
    }
    if (!data.image && !imageNft) {
      showErrorToast("Please Upload Collections");
      return false;
    }
    if (!data.name) {
      showErrorToast("Please Enter Collection Name");
      return false;
    }
   
    if (!data.symbol) {
      showErrorToast("Please Enter Collection Symbol");
      return false
    }
    if (!data.description) {
      showErrorToast("Please Enter Collection Description");
      return false;
    }
    return true
  };

  const removeImage = () => {
    setImageNft(undefined);
  };

  const onSubmit = async (data: any) => {
    if( !validateUpload(data)) {
      return
    }
   

    const dataSubmit = { ...data, creator: address, file: imageNft };

    try {
      setLoading(true);
      const record = await uploadNFTRequest(dataSubmit);
      if (record) {
        const contract = await contractNftCreatorFactory();
        if (contract) {
          const transaction = await contract.createCollection(
            record.data.data.name,
            record.data.data.symbol,
            record.data.data.ipfsMetadataUrl,
            record.data.data.id
          );
          await transaction.wait();
        }
      }
      setLoading(false);
      showSuccessToast("Upload Collections Successfully");
      route.push("/overview");
    } catch (error) {
      showErrorToast("Upload Collections Failed");
      setLoading(false)
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
                Filename: {imageDetail.fileName || ""}
              </Label>
              <Label textColor="" fontSize="">
                Format: {imageDetail.format || "*.png"} 
              </Label>
              <Label textColor="" fontSize="">
                Max size per file: {imageDetail.size || "20"} MB
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
          placeholder=""
          {...register("name")}
        />

        <Label textColor="" fontSize="">
          Symbol*
        </Label>

        <Input
          type="text"
          placeholder=""
          {...register("symbol")}
        />

        <Label textColor="" fontSize="12px">
          {/* 25/50 characters */}
        </Label>
        <br />
        <Label textColor="" fontSize="">
          Description*
        </Label>

        <TextArea
          placeholder=""
          {...register("description")}
        />
        <Label textColor="" fontSize="12px">
          {/* 5/1000 characters */}
        </Label>

        <ContainerButton>
          <Button disabled={loading} type="submit">
            <ClipLoader loading={loading} size={20} color="#36d7b7" />
            <p>Upload</p>
          </Button>
        </ContainerButton>
      </Form>
    </WrapperFormUpload>
  );
};

export default UploadForm;

const WrapperFormUpload = styled.div`

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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 53px;
  padding: 12px 24px;
  background-color: #fed73b;
  border: none;
  border-radius: 8px;
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  gap: 12px;
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
