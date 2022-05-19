import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { IJob } from 'store/apis/jobs/jobs.types';
import { langLevel } from 'constants/index';
import { useAppDispatch } from 'hooks/redux';
import { setJobId } from 'store/slices/jobs/jobs.slice';
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

    const dispatch = useAppDispatch();

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

    const onClickJob = (): void => {
        dispatch(setJobId(id));
        navigate(Paths.JOB_PAGE);
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
                    <FieldValue>{t('JobPage.noName')}</FieldValue>
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
