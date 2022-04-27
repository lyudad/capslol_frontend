import { useTranslation } from "react-i18next";
import {
  Description,
  ProfileContainer,
  Avatar,
  Title,
  Sections,
  Page,
  ButtonSet,
} from "./styles";
import { Button } from "antd";
import "antd/dist/antd.min.css";
import avatar from "./avatar.png";
import { colors } from "constants/index";

const PublicPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <ProfileContainer>
        <Title>{t("PublicProfile.user_name")}</Title>
        <Avatar>
          <img src={avatar} alt="" width={140} />
        </Avatar>
        <Sections>
          <Description>
            {t("PublicProfile.hour_rate")}{" "}
            <span style={{ color: colors.brandColor }}>--</span>$
          </Description>
        </Sections>
        <Sections>
          <Description>
            {t("PublicProfile.amount_hours")}{" "}
            <span style={{ color: colors.brandColor }}>--</span>h
          </Description>
        </Sections>
        <br />
        <Sections>
          {t("PublicProfile.education")}
          <Description>
            {t("PublicProfile.name_of_courses")}{" "}
            <span style={{ color: colors.brandColor }}>--</span>
          </Description>
          <Description>
            {t("PublicProfile.specialization")}:{" "}
            <span style={{ color: colors.brandColor }}>--</span>
          </Description>
          <Description>
            {t("PublicProfile.period")}:{" "}
            <span style={{ color: colors.brandColor }}>--</span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.category")}:
          <Description>
            {t("PublicProfile.development")} [Js, Java, Python]
          </Description>
        </Sections>
        <ButtonSet type="default">{t("PublicProfile.settings")}</ButtonSet>
      </ProfileContainer>
    </Page>
  );
};

export default PublicPage;
