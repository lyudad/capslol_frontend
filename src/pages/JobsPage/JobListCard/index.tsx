import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  DateContainer,
  JobTitle,
  Salary,
  OwnerContainer,
  Descriptions,
  ValueBox,
  Field,
  FieldValue,
} from "./styles";
import "antd/dist/antd.min.css";
import { IJobObj } from "./props";

interface IProps {
  jobObj: IJobObj;
}

const JobsListCard: React.FC<IProps> = ({ jobObj }) => {
  const { t } = useTranslation();
  const {
    id,
    date,
    jobName,
    salary,
    description,
    jobOwner,
    skills,
    category,
    timeAvailable,
    englishLevel,
  } = jobObj;

  return (
    <>
      <DateContainer>{date}</DateContainer>
      <NavLink to="/.........">
        <JobTitle>{jobName}</JobTitle>
        <Salary>{salary}$</Salary>
      </NavLink>
      <Descriptions>{description}</Descriptions>
      <OwnerContainer>
        <ValueBox>
          <Field>{t("JobPage.jobOwner")}</Field>
          <FieldValue>{jobOwner}</FieldValue>
        </ValueBox>
        <ValueBox>
          <Field>{t("JobPage.skills")}</Field>
          <FieldValue>{skills.join(", ")}</FieldValue>
        </ValueBox>
        <ValueBox>
          <Field>{t("JobPage.category")}</Field>
          <FieldValue>{category}</FieldValue>
        </ValueBox>
        <ValueBox>
          <Field>{t("JobPage.timeAvailable")}</Field>
          <FieldValue>{timeAvailable}</FieldValue>
        </ValueBox>
        <ValueBox>
          <Field>{t("JobPage.english")}</Field>
          <FieldValue>{englishLevel}</FieldValue>
        </ValueBox>
      </OwnerContainer>
    </>
  );
};

export default JobsListCard;
