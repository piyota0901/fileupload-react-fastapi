import { Typography } from 'antd';

const { Title } = Typography;


function TitleArea() {
    return (
        <>
            <header style={{ display: 'flex', flexDirection: 'column', margin: '36px 0 36px', alignItems: 'center', width: '100%' }}>
                <Title style={{ fontWeight: '600px', fontSize: '46px', textAlign: 'center', padding: 0, margin: 0, marginBottom: '12px' }}>
                    Chat with my PDF
                </Title>
                <Typography.Text
                    type="secondary"
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        marginBottom: 0,
                        maxWidth: '530px',
                        display: 'block',
                    }}
                >
                    あなたの PDFファイルについて AI とチャット💬
                </Typography.Text>
            </header>
        </>
    )
}

export default TitleArea