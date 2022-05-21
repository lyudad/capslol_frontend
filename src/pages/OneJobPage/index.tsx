import { useTranslation } from 'react-i18next';
import 'antd/dist/antd.min.css';
import { useGetUserProfileQuery } from 'store/apis/jobs';
import { useAppSelector } from 'hooks/redux';
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

import avatar from '../../assets/avatar.png';

const OneJobPage: React.FC = () => {
    const { t } = useTranslation();

    const jobID = useAppSelector((state) => state.jobsReducer?.jobId);

    const jobData = useAppSelector((state) => state.jobsReducer?.jobs).find(
        (item) => item.id === jobID
    );

    const ownerId = jobData?.ownerId.id;

    const { data: ownerProfile } = useGetUserProfileQuery(ownerId);

    return (
        <Page>
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
                        {jobData?.skills.map((item) => item.name).join(', ')}
                    </Value>
                </OptionContent>

                <OptionContent>
                    <Field>{t('JobPage.english')} </Field>
                    <Value>{jobData?.languageLevel}</Value>
                </OptionContent>
            </JobCard>
        </Page>
    );
};

export default OneJobPage;
