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
import { Button, Row } from "antd";
import "antd/dist/antd.min.css";
import avatar from "./avatar.png";
import { colors } from "constants/index";
import { useSearchUserQuery } from "store/apis/publicProfile";
import { useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";

const PublicPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAppSelector((s) => s.authReducer);

  console.log(user);

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
            <span>{data?.position}</span>
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
            <span>level [{data?.english}]</span>
          </Description>
        </Sections>
        <Sections>
          {t("PublicProfile.add_information")}:{" "}
          <Description>
            <span>
              {data?.other ? data?.other : t("PublicProfile.text_type")}
            </span>
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
