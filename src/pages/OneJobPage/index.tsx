import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { useGetJobByIdQuery, useGetUserProfileQuery } from 'store/apis/jobs';
import avatar from 'assets/avatar.png';
import Spinner from 'components/Spinner';
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
} from './styles';
import { StyledNav } from '../JobsPage/JobListCard/styles';

const OneJobPage: React.FC = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const location = useLocation();

    const state = location.state as CustomState;

    const { data: jobData, isLoading } = useGetJobByIdQuery(state.id);

    const ownerId = jobData?.ownerId.id;

    const jobId = jobData?.id;

    const { data: ownerProfile } = useGetUserProfileQuery(ownerId);

    const handleSendProposal = (): void => {
        navigate(Paths.SEND_PROPOSAL, { state: { id: jobId } });
    };

    return (
        <Page>
            {isLoading ? (
                <Spinner />
            ) : (
                <JobCard>
                    <Date>{jobData?.createdAt.substring(0, 10)}</Date>

                    <Title>{jobData?.title}</Title>
                    <Owner>
                        <AvatarImg>
                            {ownerProfile?.profileImage ? (
                                <img src={ownerProfile?.profileImage} alt="" />
                            ) : (
                                <img src={avatar} alt="" />
                            )}
                        </AvatarImg>
                        {`${jobData?.ownerId.firstName} ${jobData?.ownerId.lastName}`}
                    </Owner>

                    <Description>{jobData?.description}</Description>

                    <OptionContent>
                        <Field>{t('JobPage.projectDuration')} </Field>
                        <Value>{jobData?.projectDuration}</Value>
                    </OptionContent>

                    <OptionContent>
                        <Field>{t('JobPage.salary')} </Field>
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
                        <StyledNav onClick={handleSendProposal}>
                            {t('JobPage.sendProposal')}
                        </StyledNav>
                    </OptionContent>
                </JobCard>
            )}
        </Page>
    );
};

export default OneJobPage;
