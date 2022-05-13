import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Description,
  ProfileContainer,
  Avatar,
  Title,
  Sections,
  Page,
  ButtonSet,
  TitleEmpty,
} from "./styles";
import { Row } from "antd";
import "antd/dist/antd.min.css";
import avatar from "./avatar.png";
import { colors } from "constants/index";
import {
  useSearchEducationsQuery,
  useSearchExperienceQuery,
  useSearchSkillsQuery,
  useSearchUserQuery,
} from "store/apis/publicProfile";
import { useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";

const PublicPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user } = useAppSelector((s) => s.authReducer);

  if (!user) {
    return (
      <Page>
        <ProfileContainer>
          <TitleEmpty>Emtpy profile 🤷‍♂️</TitleEmpty>
          <Row justify="end">
            <ButtonSet type="default">{t("PublicProfile.settings")}</ButtonSet>
          </Row>
        </ProfileContainer>
      </Page>
    );
  }

  const { data } = useSearchUserQuery(user?.id);
  const { data: exp } = useSearchExperienceQuery(user?.id);
  const { data: edu } = useSearchEducationsQuery(user?.id);
  const { data: ski } = useSearchSkillsQuery(user?.id);

  return (
    <Page>
      <ProfileContainer>
        <Title>
          {user?.firstName
            ? user?.firstName + " " + user?.lastName
            : t("PublicProfile.user_name")}
        </Title>
        <Avatar>
          <img src={data?.profileImage || avatar} alt="" width={140} />
        </Avatar>
        <Sections>
          <Description>
            {t("PublicProfile.hour_rate")}{" "}
            <span style={{ color: colors.brandColor }}>{data?.hourRate}</span>$
          </Description>
        </Sections>
        <Sections>
          <Description>
            {t("PublicProfile.amount_hours")}{" "}
            <span style={{ color: colors.brandColor }}>
              {data?.availableHours}
            </span>
            h
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.education")}
          <Description>
            {t("PublicProfile.name_of_courses")}{" "}
            <span style={{ color: colors.brandColor }}>{edu?.name}</span>
          </Description>
          <Description>
            {t("PublicProfile.specialization")}:{" "}
            <span style={{ color: colors.brandColor }}>
              {edu?.specialization}
            </span>
          </Description>
          <Description>
            {t("PublicProfile.period")}:{" "}
            <span style={{ color: colors.brandColor }}>
              {edu?.startAt} - {edu?.endAt}
            </span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.category")}:
          <Description>
            {t("PublicProfile.development")}{" "}
            <span style={{ color: colors.brandColor }}>[Js, Java, Python]</span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.position")}:{" "}
          <Description>
            <span style={{ color: colors.brandColor }}>{data?.position}</span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.experience")}
          <Description>
            {t("PublicProfile.company_name")}:{" "}
            <span style={{ color: colors.brandColor }}>{exp?.companyName}</span>
          </Description>
          <Description>
            {t("PublicProfile.position")}:{" "}
            <span style={{ color: colors.brandColor }}>{exp?.position}</span>
          </Description>
          <Description>
            {t("PublicProfile.period")}:{" "}
            <span style={{ color: colors.brandColor }}>
              {exp?.startAt} - {exp?.endAt}
            </span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.skills")}:{" "}
          <Description>
            <span style={{ color: colors.brandColor }}>{ski?.name}</span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.languages")}:{" "}
          <Description>
            <span>
              level:{" "}
              <span style={{ color: colors.brandColor }}>{data?.english}</span>
            </span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.add_information")}:{" "}
          <Description>
            <span>{data?.other || t("PublicProfile.text_type")}</span>
          </Description>
        </Sections>
        <Row justify="end">
          {/* TODO:id в фигурных скопках нужно указать id user-a */}
          <ButtonSet onClick={() => navigate(`/contact_info/`)} type="default">
            {t("PublicProfile.contact_info")}
          </ButtonSet>
          <ButtonSet type="default">{t("PublicProfile.settings")}</ButtonSet>
        </Row>
      </ProfileContainer>
    </Page>
  );
};

export default PublicPage;
