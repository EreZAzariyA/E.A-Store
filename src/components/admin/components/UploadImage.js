import { Image, Upload } from 'antd';
import { acceptedImageFile } from '../../../utils/helpers';
import InboxOutlined from '@ant-design/icons/InboxOutlined';
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { storageServices } from '../../../services/storage-services';

const { Dragger } = Upload;

export const UploadImage = ({ dragger, count, compType, setImageUrl, imageUrl }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState(imageUrl);

  const handleChange = (info) => {
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
  };

  const customRequest = async ({ onSuccess, onError, file }) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await storageServices.uploadImage(form, compType);
      setLoading(false);

      if (res) {
        onSuccess(res);
        setImageUrl(res);
        setImage(res);
      }
    } catch (err) {
      onError(err, err?.message);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  if (dragger) {
    return (
      <Dragger
        name='file'
        accept={acceptedImageFile}
        maxCount={count || null}
        beforeUpload={() => false}
        onDrop = {(e) => {
          console.log('Dropped files', e.dataTransfer.files);
        }}
        onChange={handleChange}
        onRemove={(file) => console.log(fileList)}
        fileList={fileList}
        listType='picture'
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
  } else return (
    <Upload
      name="avatar"
      listType='picture-card'
      accept={acceptedImageFile}
      maxCount={count}
      customRequest={customRequest}
      showUploadList={false}
    >
      {image ? (
          <Image
            src={image}
            preview={false}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
    </Upload>
  );
};