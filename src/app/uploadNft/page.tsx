
"use client"
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Upload } from 'antd';
import React from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const UploadNFT = () => {
    const onFinish = (values: any) => {
        console.log(values);
      };
      const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
  return (
    <div className='flex flex-col justify-center items-center mt-20'>
        <div>UPLOAD NFT TO MARKETPLACE</div>
 <div className='w-full flex items-center  justify-center mx-auto mt-10 gap-8 '>
        
        <Form >
        
        <Form.Item    label=""
        name="profilePicture"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please input your image!' }]}
        >
          <Upload.Dragger name="files" action="/upload.do"  listType="picture"
          beforeUpload={() => false} >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
     
        </Form>

<Form className='w-1/2  border-2 py-10 rounded-lg shadow-lg'
      name="profile_form"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
     
      <Form.Item name={['nft', 'name']}  label="Name"  rules={[{ required: true, message: 'Please input your name NFT!', }]}>
        <Input placeholder='Name NFT...' />
      </Form.Item>
      <Form.Item name={['nft', 'description']} label="Description"  rules={[{ required: true, message: 'Please input your NFT description!' }]}>
        <Input placeholder='Description...' />
      </Form.Item>
      <Form.Item name={['nft', 'price']} label="Price" rules={[{ required: true,type: 'number' }]}>
        <InputNumber placeholder='Price...' />
      </Form.Item>

      

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button  htmlType="submit">
          Upload NFT
        </Button>
      </Form.Item>
    </Form>

    </div>
    </div>
   
    
  )
}

export default UploadNFT

