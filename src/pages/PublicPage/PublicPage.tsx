import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Row } from 'antd';
import { colors } from 'constants/index';
import 'antd/dist/antd.min.css';
import { useSearchUserQuery } from 'store/apis/publicProfile';
import avatar from 'assets/avatar.png';
import {
    Description,
    ProfileContainer,
    Avatar,
    Title,
    Sections,
    Page,
    ButtonSet,
    TitleEmpty,
} from './styles';

const PublicPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAppSelector((s) => s.authReducer);

    const { data } = useSearchUserQuery(user?.id);

    if (!user) {
        return (
            <Page>
                <ProfileContainer>
                    <TitleEmpty>Emtpy profile 🤷‍♂️</TitleEmpty>
                    <Row justify="end">
                        <ButtonSet type="default">
                            {t('PublicProfile.settings')}
                        </ButtonSet>
                    </Row>
                </ProfileContainer>
            </Page>
        );
    }

    return (
        <Page>
            <ProfileContainer>
                <Title>
                    {user?.firstName
                        ? `${user?.firstName} ${user?.lastName}`
                        : t('PublicProfile.user_name')}
                </Title>
                <Avatar>
                    <img
                        src={data?.profileImage || avatar}
                        alt=""
                        width={140}
                    />
                </Avatar>
                <Sections>
                    <Description>
                        {t('PublicProfile.hour_rate')}{' '}
                        <span style={{ color: colors.brandColor }}>
                            {data?.hourRate}
                        </span>
                        $
                    </Description>
                </Sections>
                <Sections>
                    <Description>
                        {t('PublicProfile.amount_hours')}{' '}
                        <span style={{ color: colors.brandColor }}>
                            {data?.availableHours}
                        </span>
                        h
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.education')}
                    <Description>
                        {t('PublicProfile.name_of_courses')}{' '}
                        <span style={{ color: colors.brandColor }}>
                            {data?.educations.name}
                        </span>
                    </Description>
                    <Description>
                        {t('PublicProfile.specialization')}:{' '}
                        <span style={{ color: colors.brandColor }}>
                            {data?.educations.specialization}
                        </span>
                    </Description>
                    <Description>
                        {t('PublicProfile.period')}:{' '}
                        <span style={{ color: colors.brandColor }}>
                            {data?.educations.startAt} -{' '}
                            {data?.educations.endAt}
                        </span>
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.category')}:
                    <Description>
                        <span style={{ color: colors.brandColor }}>
                            {' '}
                            {data?.categories.categoryName ||
                                t('PublicProfile.development')}{' '}
                        </span>
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.position')}:{' '}
                    <Description>
                        <span style={{ color: colors.brandColor }}>
                            {data?.position}
                        </span>
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.experience')}
                    <Description>
                        {t('PublicProfile.company_name')}:{' '}
                        <span style={{ color: colors.brandColor }}>
                            {data?.experiense.companyName}
                        </span>
                    </Description>
                    <Description>
                        {t('PublicProfile.position')}:{' '}
                        <span style={{ color: colors.brandColor }}>
                            {data?.experiense.position}
                        </span>
                    </Description>
                    <Description>
                        {t('PublicProfile.period')}:{' '}
                        <span style={{ color: colors.brandColor }}>
                            {data?.experiense.startAt} -{' '}
                            {data?.experiense.endAt}
                        </span>
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.skills')}:{' '}
                    <Description>
                        {/* <span style={{ color: colors.brandColor }}>
                            {data?.skills.id}
                        </span> */}
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.languages')}:{' '}
                    <Description>
                        <span>
                            level:{' '}
                            <span style={{ color: colors.brandColor }}>
                                {data?.english}
                            </span>
                        </span>
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.add_information')}:{' '}
                    <Description>
                        <span>
                            {data?.other || t('PublicProfile.text_type')}
                        </span>
                    </Description>
                </Sections>
                <Row justify="end">
                    <ButtonSet
                        onClick={() => navigate(`/contact_info/${user?.id}`)}
                        type="default"
                    >
                        {t('PublicProfile.contact_info')}
                    </ButtonSet>
                    <ButtonSet
                        onClick={() => navigate(`/setting/${user?.id}`)}
                        type="default"
                    >
                        {t('PublicProfile.settings')}
                    </ButtonSet>
                </Row>
            </ProfileContainer>
        </Page>
    );
};

export default PublicPage;
