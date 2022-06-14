import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import moment from 'moment';
import { dateFormat } from 'constants/index';
import { IJob } from 'store/apis/jobs/jobs.types';
import { useArchiveToggleMutation } from 'store/apis/jobs';
import { HideWrapper } from 'components/HideWrapper/styles';
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
import { OneCard } from '../styles';

interface IProps {
    jobObj: IJob;
    isArchive: boolean;
}

const JobCard: React.FC<IProps> = ({ isArchive, jobObj }) => {
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
        projectDuration,
        isArchived,
    } = jobObj;

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id } });
    };

    const [archiveToggle] = useArchiveToggleMutation();

    const onClick = async (): Promise<void> => {
        const arch = await archiveToggle(id);
    };

    return (
        <HideWrapper showWhen={isArchive === isArchived}>
            <OneCard>
                <DateContainer>
                    {moment(new Date(createdAt)).format(dateFormat)}
                </DateContainer>
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
                        <Field>{t('JobPage.projectDuration')}</Field>
                        <FieldValue>{projectDuration}</FieldValue>
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
                    <ValueBox>
                        <Field>{t('JobPage.skills')}</Field>
                        <FieldValue>
                            {skills.map((item) => item.name).join(', ')}
                        </FieldValue>
                    </ValueBox>
                </OwnerContainer>
                {isArchived ? (
                    <StyledNav onClick={() => archiveToggle(id)}>
                        {t('OwnerJobsPage.fromArchive')}
                    </StyledNav>
                ) : (
                    <StyledNav onClick={() => archiveToggle(id)}>
                        {t('OwnerJobsPage.inArchive')}
                    </StyledNav>
                )}
            </OneCard>
        </HideWrapper>
    );
};

export default JobCard;
