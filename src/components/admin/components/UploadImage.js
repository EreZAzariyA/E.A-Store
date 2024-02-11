import { Upload, message } from 'antd';
import { acceptedImageFile } from '../../../utils/helpers';
import InboxOutlined from '@ant-design/icons/InboxOutlined';
import { useState } from 'react';

const { Dragger } = Upload

export const UploadImage = () => {
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
      setFileList(info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Dragger
      name='file'
      accept={acceptedImageFile}
      beforeUpload={() => false}
      onDrop = {(e) => {
        console.log('Dropped files', e.dataTransfer.files);
      }}
      onChange={handleChange}
      onRemove={(file) => console.log(fileList)}
      fileList={fileList}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-error" style={{ textTransform: 'capitalize' }}>!! Please change the image name before uploading !!</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p>
    </Dragger>
  );
};


// );