import DropArea from "@/components/DropArea"
import TitleArea from "@/components/TitleArea"
import { Flex } from "antd"

function App() {

  return (
    <>
      <div style={{ height: '100%', backgroundColor: "#ffcfdf", backgroundImage: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)", padding: "12px" }}>
        <Flex vertical align="center" style={{ height: 'auto', width: '100%' }}>
          <TitleArea />
          <DropArea />
        </Flex>
      </div>
    </>
  )
}

export default App
