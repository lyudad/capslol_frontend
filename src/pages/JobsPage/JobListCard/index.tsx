import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { IJobs } from 'store/apis/jobs/jobs.types';
import { langLevel } from 'constants/index';
import {
    DateContainer,
    JobTitle,
    Salary,
    OwnerContainer,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    StyledNav,
} from './styles';
import 'antd/dist/antd.min.css';

interface IProps {
    jobObj: IJobs;
}

const JobsListCard: React.FC<IProps> = ({ jobObj }) => {
    const { t } = useTranslation();
    const {
        id,
        createdAt,
        title,
        description,
        price,
        timeAvailable,
        categories,
        skills,
        languageLevel,
    } = jobObj;

    return (
        <>
            <DateContainer>{createdAt.substring(0, 10)}</DateContainer>
            <NavLink to="/job">
                <JobTitle>{title},</JobTitle>
                <Salary>{price}$</Salary>
            </NavLink>
            <Descriptions>{description}</Descriptions>
            <OwnerContainer>
                <ValueBox>
                    <Field>{t('JobPage.jobOwner')}</Field>
                    <FieldValue>jobOwner</FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.skills')}</Field>
                    <FieldValue>
                        {skills.map((item) => item.name).join(', ')}
                    </FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.category')}</Field>
                    <FieldValue>{categories[0].categoryName}</FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.timeAvailable')}</Field>
                    <FieldValue>{timeAvailable}</FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.english')}</Field>
                    <FieldValue>{langLevel[languageLevel]}</FieldValue>
                </ValueBox>
            </OwnerContainer>
            <StyledNav to="">{t('JobPage.sendProposal')}</StyledNav>
        </>
    );
};

export default JobsListCard;
