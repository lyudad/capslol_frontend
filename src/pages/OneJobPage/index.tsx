/* eslint-disable @typescript-eslint/no-shadow */
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { useGetJobByIdQuery, useGetUserProfileQuery } from 'store/apis/jobs';
import { HideWrapper } from 'components/HideWrapper/styles';
import avatar from 'assets/avatar.png';
import { useGetProposalsByFreelancerQuery } from 'store/apis/proposals';
import { useAppSelector } from 'hooks/redux';
import { TFilterArg, TFilterReturn } from 'pages/SendProposal/interfaces';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import { CustomState } from './props';
import {
    Page,
    Title,
    JobCard,
    Date,
    SubTitle,
    Value,
    Field,
    Description,
    OptionContent,
    Owner,
    AvatarImg,
    Note,
} from './styles';
import { StyledNav } from '../JobsPage/JobListCard/styles';

const OneJobPage: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAppSelector((s) => s.auth);
    const { data: freelancerProposals } = useGetProposalsByFreelancerQuery(
        user?.id
    );
    const navigate = useNavigate();

    const location = useLocation();

    const state = location.state as CustomState;

    const { data: jobData, isLoading } = useGetJobByIdQuery(state.id);

    const ownerId = jobData?.ownerId.id;

    const jobId = jobData?.id;

    const { data: ownerProfile } = useGetUserProfileQuery(ownerId);

    const role = useAppSelector((state) => state.auth.user?.role);

    const regUserId = useAppSelector((state) => state.auth.user?.id);

    const { data: userProfile } = useGetUserProfileQuery(user?.id);

    const handleSendProposal = (): void => {
        navigate(Paths.SEND_PROPOSAL, { state: { id: jobId } });
    };

    const handleFiltered = (data: TFilterArg): TFilterReturn => {
        const filtered = data?.filter((i) => i.jobId.id === jobId)[0]?.jobId
            ?.id;

        return filtered;
    };

    return (
        <Page>
            <SpinnerWrapper isLoading={isLoading}>
                <HideWrapper
                    showWhen={role === 'Job Owner' || !jobData?.isArchived}
                >
                    <JobCard>
                        <Date>{jobData?.createdAt.substring(0, 10)}</Date>

                        <Title>{jobData?.title}</Title>
                        <Owner>
                            <AvatarImg>
                                <img
                                    src={ownerProfile?.profileImage || avatar}
                                    alt=""
                                />
                            </AvatarImg>
                            {`${jobData?.ownerId.firstName} ${jobData?.ownerId.lastName}`}
                        </Owner>

                        <Description>{jobData?.description}</Description>

                        <OptionContent>
                            <Field>{t('JobPage.projectDuration')} </Field>
                            <Value>{jobData?.projectDuration}</Value>
                        </OptionContent>

                        <OptionContent>
                            <Field>{t('JobPage.hourlyRate')} </Field>
                            <Value>{jobData?.price}$</Value>
                        </OptionContent>

                        <OptionContent>
                            <Field>{t('JobPage.category')} </Field>
                            <Value>{jobData?.categoryId.categoryName}</Value>
                        </OptionContent>

                        <OptionContent>
                            <Field>{t('JobPage.timeAvailable')} </Field>
                            <Value>{jobData?.timeAvailable}</Value>
                        </OptionContent>

                        <SubTitle>{t('JobPage.requirements')}</SubTitle>

                        <OptionContent>
                            <Field>{t('JobPage.skills')} </Field>
                            <Value>
                                {jobData?.skills
                                    .map((item) => item.name)
                                    .join(', ')}
                            </Value>
                        </OptionContent>

                        <OptionContent>
                            <Field>{t('JobPage.english')} </Field>
                            <Value>{jobData?.languageLevel}</Value>
                        </OptionContent>

                        <OptionContent>
                            <HideWrapper
                                showWhen={
                                    role === 'Freelancer' && !!userProfile
                                }
                            >
                                {handleFiltered(freelancerProposals) ===
                                jobId ? (
                                    <StyledNav disabled>
                                        {t('JobPage.alreadySent')}
                                    </StyledNav>
                                ) : (
                                    <StyledNav onClick={handleSendProposal}>
                                        {t('JobPage.sendProposal')}
                                    </StyledNav>
                                )}
                            </HideWrapper>
                            <HideWrapper
                                showWhen={role !== 'Freelancer' || !userProfile}
                            >
                                <Value>{t('JobPage.ifYouAre')}</Value>
                            </HideWrapper>
                        </OptionContent>
                    </JobCard>
                </HideWrapper>
                <HideWrapper
                    showWhen={role !== 'Job Owner' && !!jobData?.isArchived}
                >
                    <JobCard>
                        <Note style={{}}>{t('JobPage.unfortunately')}</Note>
                    </JobCard>
                </HideWrapper>
            </SpinnerWrapper>
        </Page>
    );
};

export default OneJobPage;
