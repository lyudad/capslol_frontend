import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { IJob } from 'store/apis/jobs/jobs.types';
import {
    DateContainer,
    StyledButton,
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
    jobObj: IJob;
}

const JobsListCard: React.FC<IProps> = ({ jobObj }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const {
        id,
        createdAt,
        title,
        description,
        price,
        timeAvailable,
        categoryId,
        skills,
        languageLevel,
        ownerId,
    } = jobObj;

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id } });
    };
    return (
        <>
            <DateContainer>{createdAt.substring(0, 10)}</DateContainer>
            <StyledButton onClick={onClickJob} type="submit">
                <JobTitle>{title},</JobTitle>
                <Salary>{price}$</Salary>
            </StyledButton>
            <Descriptions>{description}</Descriptions>
            <OwnerContainer>
                <ValueBox>
                    <Field>{t('JobPage.jobOwner')}</Field>
                    <FieldValue>
                        {`${ownerId.firstName} ${ownerId.lastName}`}
                    </FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.skills')}</Field>
                    <FieldValue>
                        {skills.map((item) => item.name).join(', ')}
                    </FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.category')}</Field>
                    <FieldValue>{categoryId.categoryName}</FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.timeAvailable')}</Field>
                    <FieldValue>{timeAvailable}</FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.english')}</Field>
                    <FieldValue>{languageLevel}</FieldValue>
                </ValueBox>
            </OwnerContainer>
            <StyledNav>{t('JobPage.sendProposal')}</StyledNav>
        </>
    );
};

export default JobsListCard;
