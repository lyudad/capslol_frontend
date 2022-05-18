import { useTranslation } from 'react-i18next';
import 'antd/dist/antd.min.css';
import { useGetJobByIdQuery } from 'store/apis/jobs';
import { langLevel } from 'constants/index';
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

    const { data } = useGetJobByIdQuery(3);

    // console.log('DATA: ', data);

    return (
        <Page>
            <JobCard>
                <Date>{data?.createdAt.substring(0, 10)}</Date>

                <Title>{data?.title}</Title>
                <Owner>
                    <AvatarImg>
                        <img src={avatar} alt="" />
                    </AvatarImg>
                    {job.jobOwner}
                </Owner>

                <Description>{data?.description}</Description>

                <OptionContent>
                    <Field>{t('JobPage.salary')} </Field>
                    <Value>{data?.price}$</Value>
                </OptionContent>

                <OptionContent>
                    <Field>{t('JobPage.category')} </Field>
                    <Value>{data?.categories[0].categoryName}</Value>
                </OptionContent>

                <OptionContent>
                    <Field>{t('JobPage.timeAvailable')} </Field>
                    <Value>{data?.timeAvailable}</Value>
                </OptionContent>

                <SubTitle>{t('JobPage.requirements')}</SubTitle>

                <OptionContent>
                    <Field>{t('JobPage.skills')} </Field>
                    <Value>
                        {data?.skills.map((item) => item.name).join(', ')}
                    </Value>
                </OptionContent>

                <OptionContent>
                    <Field>{t('JobPage.english')} </Field>
                    {data?.languageLevel && (
                        <Value>{langLevel[data?.languageLevel]}</Value>
                    )}
                </OptionContent>
            </JobCard>
        </Page>
    );
};

export default OneJobPage;
