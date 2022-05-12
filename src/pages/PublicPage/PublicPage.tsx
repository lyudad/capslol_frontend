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
import "antd/dist/antd.min.css";
import avatar from "./avatar.png";
import { colors } from "constants/index";
import { useSearchUserQuery } from "store/apis/publicProfile";
import { useAppSelector } from "hooks/redux";

const PublicPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((s) => s.authReducer);
  const { data } = useSearchUserQuery(22);

  // console.log(user);
  console.log(data);

  return (
    <Page>
      <ProfileContainer>
        <Title>
          {user?.firstName
            ? user?.firstName + " " + user?.lastName
            : t("PublicProfile.user_name")}
        </Title>
        <Avatar>
          <img
            src={data?.profileImage ? data?.profileImage : avatar}
            alt=""
            width={140}
          />
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
        <Sections>
          {t("PublicProfile.position")}:{" "}
          <Description>
            <span>Text type</span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.experience")}
          <Description>
            {t("PublicProfile.company_name")}{" "}
            <span style={{ color: colors.brandColor }}>--</span>
          </Description>
          <Description>
            {t("PublicProfile.position")}:{" "}
            <span style={{ color: colors.brandColor }}>--</span>
          </Description>
          <Description>
            {t("PublicProfile.period")}:{" "}
            <span style={{ color: colors.brandColor }}>--</span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.skills")}:{" "}
          <Description>
            <span>{t("PublicProfile.tag_type")}</span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.languages")}:{" "}
          <Description>
            <span>level [Beginner, Intermediate, Advanced]</span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.add_information")}:{" "}
          <Description>
            <span>{t("PublicProfile.text_type")}</span>
          </Description>
        </Sections>
        <ButtonSet type="default">{t("PublicProfile.settings")}</ButtonSet>
      </ProfileContainer>
    </Page>
  );
};

export default PublicPage;
