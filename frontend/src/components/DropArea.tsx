import { useState } from 'react';
import { Button, Card, Upload, Popover, Input, Space, Progress } from 'antd';
import { InboxOutlined, SendOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import axios, { AxiosProgressEvent } from 'axios';

interface uploadFile {
  name: string;
  progress: number;
}

const DropArea = () => {
  const [uploadFile, setUploadFile] = useState<uploadFile | null>(null);
  const [url, setUrl] = useState<string>('');

  const customRequest: UploadProps["customRequest"] = async (options) => {
    const { file } = options;
    console.log("file:", file);
    const formData = new FormData();
    formData.append('file', file);

    // ファイルをアップロードする
    axios.post('http://localhost:8000/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (file instanceof File) {
          setUploadFile({
            name: file.name,
            progress: progressEvent.progress as number
          });
        }
      }
    })
  }

  const downloadFilebyURL = async () => {
    if (!url) return;
    const response = await axios.get('http://localhost:8000/files/download', {
      params: { url },
    });
    console.log('response:', response);
  }

  const popoverContent = (
    <>
      <Space.Compact style={{ width: '500px' }}>
        <Input
          placeholder='https://example.com/sample.pdf'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="primary" onClick={downloadFilebyURL}>
          <SendOutlined />
        </Button>
      </Space.Compact>
    </>
  );

  return (
    <>
      <Card bordered style={{ maxWidth: '993px', width: '100%', margin: '0 auto' }} styles={{ body: { padding: '8px' } }}>
        {/* ドラッグ＆ドロップによるアップロードするエリア */}
        <Upload.Dragger
          style={{ padding: '16px 0' }}
          customRequest={customRequest}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text" style={{ fontWeight: 'normal', marginBottom: '22px', marginTop: '-10px' }}>
            <span>Drop PDF here</span>
          </p>
        </Upload.Dragger>
        <div className='ant-upload-option' style={{ position: 'absolute', left: '18px', right: '18px' }}>
          <div style={{ color: 'GrayText', position: 'relative', top: '-30px', right: '0px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            {/* エクスプローラーからアップロードするボタン */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <Upload customRequest={customRequest} showUploadList={false}>
                <Button type="link" style={{ margin: 0, padding: 0 }}>
                  Browse my Computer
                </Button>
              </Upload>
            </div>
            {/* URLを入力してインターネット上のPDFを指定するボタン */}
            <div>
              {/* https://ant.design/components/popover */}
              <Popover content={popoverContent} trigger="click" placement='bottomRight'>
                <Button type="link" style={{ margin: 0, padding: 0 }}>
                  From URL
                </Button>
              </Popover>
            </div>
          </div>
        </div>
      </Card>
      {/* アップロード中のプログレスバー表示 */}
      {uploadFile && (
        <Card bordered style={{ maxWidth: '993px', width: '100%', margin: '0 auto', marginTop: '16px' }} styles={{ body: { padding: '8px' } }}>
          <p>Uploading: {uploadFile.name}</p>
          <Progress percent={Math.ceil(uploadFile.progress * 100)} />
        </Card>
      )}
    </>
  )
};

export default DropArea;