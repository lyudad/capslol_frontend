import {
  Description,
  ProfileContainer,
  Avatar,
  Title,
  Sections,
} from "./styles";
import { Button } from "antd";
import "antd/dist/antd.min.css";
import avatar from "./avatar.png";
import { colors } from "constants/index";

const PublicPage: React.FC = () => {
  return (
    <ProfileContainer>
      <Title>
        <h1>User Name</h1>
      </Title>
      <Avatar>
        <img src={avatar} alt="" width={140} />
      </Avatar>
      <Sections>
        <Description>
          <p>
            Hour rate: <span style={{ color: colors.lightBlue }}>--</span>$
          </p>
        </Description>
      </Sections>
      <Sections>
        <Description>
          <p>
            The available amount of hours:{" "}
            <span style={{ color: colors.lightBlue }}>--</span>h
          </p>
        </Description>
      </Sections>
      <br />
      <Sections>
        <h3>
          Education:
          <Description>
            <p>Name of courses, university: --</p>
          </Description>
          <Description>
            <p>Specialization: --</p>
          </Description>
          <Description>
            <p>Period of Time: --</p>
          </Description>
        </h3>
      </Sections>
      <Sections>
        <h3>
          Category:
          <Description>
            <p>Development [Js, Java, Python]:</p>
          </Description>
        </h3>
      </Sections>
      <Button
        type="primary"
        style={{
          position: "absolute",
          bottom: 20,
          right: 35,
        }}
      >
        Settings
      </Button>
    </ProfileContainer>
  );
};

export default PublicPage;
