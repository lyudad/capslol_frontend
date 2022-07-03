import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetProposalsByFreelancerQuery } from 'store/apis/proposals';
import { useAppSelector } from 'hooks/redux';
import { useGetUserProfileQuery } from 'store/apis/jobs';
import { Paths } from 'router/paths';
import moment from 'moment';
import { dateFormat, descriptionLength } from 'constants/index';
import { IJob } from 'store/apis/jobs/jobs.types';
import { TFilterArg, TFilterReturn } from 'pages/SendProposal/interfaces';
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

interface IProps {
    jobObj: IJob;
}

const JobsListCard: React.FC<IProps> = ({ jobObj }) => {
    const { t } = useTranslation();
    const [showMore, setShowMore] = useState<boolean>(false);
    const role = useAppSelector((state) => state.auth.user?.role);

    const user = useAppSelector((state) => state.auth.user);

    const { data: userProfile } = useGetUserProfileQuery(user?.id);

    const { data: freelancerProposals } = useGetProposalsByFreelancerQuery(
        user?.id
    );

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
    } = jobObj;

    const onClickJob = (): void => {
        navigate(Paths.JOB_PAGE, { state: { id } });
    };

    const handleSendProposal = (): void => {
        navigate(Paths.SEND_PROPOSAL, { state: { id } });
    };

    const handleFiltered = (data: TFilterArg): TFilterReturn => {
        const filtered = data?.filter((i) => i.jobId.id === id)[0]?.jobId?.id;

        return filtered;
    };

    return (
        <>
            <DateContainer>
                {moment(new Date(createdAt)).format(dateFormat)}
            </DateContainer>
            <StyledButton onClick={onClickJob} type="submit">
                <JobTitle>{title},</JobTitle>
                <Salary>{price}$</Salary>
            </StyledButton>

            <Descriptions>
                <HideWrapper
                    showWhen={
                        description.length >= descriptionLength && !showMore
                    }
                >
                    {description.slice(0, descriptionLength)}...
                </HideWrapper>
                <HideWrapper
                    showWhen={
                        description.length < descriptionLength ||
                        (description.length >= descriptionLength && showMore)
                    }
                >
                    {description}
                </HideWrapper>
            </Descriptions>

            <StyledNav
                onClick={() => setShowMore(!showMore)}
                style={{
                    marginTop: 4,
                    marginBottom: 12,
                    fontSize: 10,
                    fontStyle: 'italic',
                    borderRadius: 12,
                    padding: 6,
                }}
            >
                {description.length >= descriptionLength && !showMore
                    ? `${t('JobPage.showMore')}`
                    : `${t('JobPage.showLess')}`}
            </StyledNav>

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
            <HideWrapper showWhen={role === 'Freelancer' && !!userProfile}>
                {handleFiltered(freelancerProposals) === id ? (
                    <StyledNav disabled>{t('JobPage.alreadySent')}</StyledNav>
                ) : (
                    <StyledNav onClick={handleSendProposal}>
                        {t('JobPage.sendProposal')}
                    </StyledNav>
                )}
            </HideWrapper>
        </>
    );
};

export default JobsListCard;
