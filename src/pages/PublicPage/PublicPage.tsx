import {
  Description,
  ProfileContainer,
  Avatar,
  Title,
  TitleContainer,
} from "./styles";
import { Button } from "antd";
import "antd/dist/antd.css";
import avatar from "./avatar.png";

const PublicPage: React.FC = () => {
  return (
    <ProfileContainer>
      <h1>User Name</h1>
      <Avatar>
        <img src={avatar} alt="" width={240} />
      </Avatar>

      <Button
        type="primary"
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        Settings
      </Button>
    </ProfileContainer>
  );
};

export default PublicPage;
