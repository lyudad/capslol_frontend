import { useTranslation } from 'react-i18next';
import 'antd/dist/antd.min.css';
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
import avatar from './avatar.png';
import { job } from './job-example';

const OneJobPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <JobCard>
                <Date>{job.date}</Date>

                <Title>{job.jobName}</Title>
                <Owner>
                    <AvatarImg>
                        <img src={avatar} alt="" />
                    </AvatarImg>
                    {job.jobOwner}
                </Owner>

                <Description>{job.description}</Description>

                <OptionContent>
                    <Field>{t('JobPage.salary')} </Field>
                    <Value>{job.salary}$</Value>
                </OptionContent>

                <OptionContent>
                    <Field>{t('JobPage.category')} </Field>
                    <Value>{job.category}</Value>
                </OptionContent>

                <OptionContent>
                    <Field>{t('JobPage.timeAvailable')} </Field>
                    <Value>{job.timeAvailable}</Value>
                </OptionContent>

                <SubTitle>{t('JobPage.requirements')}</SubTitle>

                <OptionContent>
                    <Field>{t('JobPage.skills')} </Field>
                    <Value>{job.skills.join(', ')}</Value>
                </OptionContent>

                <OptionContent>
                    <Field>{t('JobPage.english')} </Field>
                    <Value>{job.englishLevel}</Value>
                </OptionContent>
            </JobCard>
        </Page>
    );
};

export default OneJobPage;
