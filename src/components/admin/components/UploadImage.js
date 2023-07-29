import { Upload } from 'antd';
import { acceptedImageFile } from '../../../utils/helpers';
import InboxOutlined from '@ant-design/icons/InboxOutlined';

const { Dragger } = Upload

export const UploadImage = () => {
  return (
    <Dragger
      maxCount={1}
      name='file'
      accept={acceptedImageFile}
      beforeUpload={() => (false)}
      >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-error">!! Please change the image name before uploading !!</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p>
    </Dragger>
  );
};


// );