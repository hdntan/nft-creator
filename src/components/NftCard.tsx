import { useState } from 'react';
import Marketplace from '../../Marketplace.json';
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast } from '@/utils/openAlert';
import { useGlobalContext } from '@/app/context/store';
import { Button, Modal, theme } from 'antd';
import { darkTheme } from '@rainbow-me/rainbowkit';
const NftCard = ( {image, id, title, address, description, attributes }) => {
    const {connectNft, setConnectNft, ApprovalForAll} = useGlobalContext();
    const [loading, setLoading] = useState(false);

    const [price, setPrice] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
     
      if(!connectNft) {
        showErrorToast('Connect Nft address' );
        setLoading(false)

        return
      }
      if(!ApprovalForAll) {
        showErrorToast('setApprovalForAll Nft ' );
        setLoading(false)

        return
      }
      setIsModalOpen(true);

    };
  
    const handleOk = () => {
        makeItemExternal();

    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const makeItemExternal = async() =>{
        setLoading(true)
        if ( !price ) {
            showErrorToast('Enter price your nft' );
        setLoading(false)
    
            console.log('connect Nft', connectNft);
            return;
          }
          setIsModalOpen(false);
    
       
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          Marketplace.address,
          Marketplace.abi,
          signer
        );
      const priceItem = ethers.utils.parseUnits(price, "ether");

      let transaction = await contract.createItemExternal(address,id, priceItem);
      await transaction.wait();
    showSuccessToast('You successfully upload NFT!')
    setLoading(false)

        } catch (error) {
            showErrorToast("err make item NFT!");
        setLoading(false)

            console.log("err make item NFT!", error);
        }
        

    }

    return (
        <div className="w-[300px] mr-3 mb-32 bg-slate-100 rounded-md" >
            <ToastContainer />
            <Modal  title="Upload Nft" open={isModalOpen} onOk={handleOk}  okType={'default'} onCancel={handleCancel}>
        <p>Price:</p>
        <input className='w-full mt-3 border-2 px-3 py-2' type='number' placeholder='price...' value={price} onChange={(e) => setPrice(e.target.value)}></input>
      </Modal>
            <img className='w-full rounded-t-md' key={id} src={image}></img>
            <div className="p-3">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h3 className="text-xl">{title}</h3>
                        <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
                    </div>
                    <div className="flex mr-3">
                        <a target="_blank" className="text-blue-700" href={`https://etherscan.io/token/${address}`}>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a>
                    </div>
                </div>
                <p>{description? description.slice(0, 200) : "No Description"}</p>
            </div>
            <div className="flex flex-col justify-center   items-center">
               
                
            
        <Button loading={loading} disabled={loading} size='large'  className='flex justify-center items-center mt-5  shadow-lg shadow-black hover:bg-slate-200 rounded-lg p-2'
        onClick={showModal}>
                    Make Item
                   
                </Button>
        
     
    
        </div>
            <div className="flex flex-wrap justify-center items-center p-3 ">
                {attributes?.length > 0 && attributes.map((attribute:any) => {
                    return (
                        <div className="w-1/2 mb-2 flex justify-start flex-col">
                            <p className="mr-2 font-bold">{attribute.trait_type}:</p>
                            <p className="text-sm">{attribute.value}</p>
                        </div>
                    )
                })}
            </div>
           
        </div>
    )
}

export default NftCard