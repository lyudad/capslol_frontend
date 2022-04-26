import { Description, ProfileContainer, Title, TitleContainer } from "./styles";
import avatar from "./avatar.png";

const PublicPage: React.FC = () => {
  return (
    <ProfileContainer>
      <h1>User Name</h1>

      <img src={avatar} alt="" />
    </ProfileContainer>
  );
};

export default PublicPage;
