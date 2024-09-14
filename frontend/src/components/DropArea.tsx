import { Button, Card, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const DropArea = () => {
    return (
        <>
            <Card bordered style={{ maxWidth: '993px', width: '100%', margin: '0 auto' }} styles={{ body: { padding: '8px' } }}>
                {/* ドラッグ＆ドロップによるアップロードするエリア */}
                <Upload.Dragger style={{ padding: '16px 0' }}>
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
                            <Upload>
                                <Button type="link" style={{ margin: 0, padding: 0 }}>
                                    Browse my Computer
                                </Button>
                            </Upload>
                        </div>
                        {/* URLを入力してインターネット上のPDFを指定するボタン */}
                        <div>
                            <Button type="link" style={{ margin: 0, padding: 0 }}>
                                From URL
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
};

export default DropArea;