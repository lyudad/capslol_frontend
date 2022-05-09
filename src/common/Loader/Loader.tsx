import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Wrapper } from "./styles";

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const Loader: React.FC = () => (
  <Wrapper>
    <Spin indicator={antIcon} />
  </Wrapper>
);

export default Loader;
