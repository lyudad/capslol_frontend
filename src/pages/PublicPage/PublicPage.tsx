import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { notification, Row } from 'antd';
import { colors } from 'constants/index';
import 'antd/dist/antd.min.css';
import { useSearchUserQuery } from 'store/apis/publicProfile';
import { useState } from 'react';
import avatar from 'assets/avatar.png';
import { Paths } from 'router/paths';
import {
    Description,
    ProfileContainer,
    Avatar,
    Title,
    Sections,
    Page,
    ButtonSet,
    TitleEmpty,
    SectionsUl,
    Line,
    StyledNav,
} from './styles';

const PublicPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAppSelector((s) => s.auth);
    const [toggle, setToggle] = useState(false);

    const location = useLocation();

    const { data } = useSearchUserQuery((location.state as number) || user?.id);

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

    const handleSendProposal = (): void => {
        navigate(Paths.CONTACT_INFO, { state: { id: user?.id } });
    };

    const handleSendInterview = (): void => {
        setToggle(true);

        notification.success({
            message: `${t('TalentPage.sent_to')}${data?.user?.firstName} ${
                data?.user?.lastName
            }`,
        });
    };
    return (
        <Page>
            <ProfileContainer>
                {!!location.state && (
                    <Row>
                        <ButtonSet
                            onClick={() => navigate(`/talents`)}
                            type="default"
                        >
                            {t('PublicProfile.back')}
                        </ButtonSet>
                        {toggle ? (
                            <StyledNav disabled>
                                {t('TalentPage.already_sent')}
                            </StyledNav>
                        ) : (
                            <StyledNav onClick={handleSendInterview}>
                                {t('TalentPage.send_interview')}
                            </StyledNav>
                        )}
                    </Row>
                )}
                <Title>
                    {data?.user?.firstName
                        ? `${data?.user?.firstName} ${data?.user?.lastName}`
                        : t('PublicProfile.user_name')}
                </Title>

                <Avatar>
                    <img
                        src={data?.profileImage || avatar}
                        alt=""
                        width={180}
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
                    {data?.educations.map((e) => (
                        <SectionsUl key={e.id}>
                            <Line />
                            <Description>
                                {t('PublicProfile.name_of_courses')}:{' '}
                                <span style={{ color: colors.brandColor }}>
                                    {e.name}
                                </span>
                            </Description>
                            <Description>
                                {t('PublicProfile.specialization')}:{' '}
                                <span style={{ color: colors.brandColor }}>
                                    {e.specialization}
                                </span>
                            </Description>
                            <Description>
                                {t('PublicProfile.period')}:{' '}
                                <span style={{ color: colors.brandColor }}>
                                    {e.startAt} - {e.endAt}
                                </span>
                            </Description>
                            <Line />
                        </SectionsUl>
                    ))}
                </Sections>
                <Sections>
                    {t('PublicProfile.category')}:
                    <Description>
                        <span style={{ color: colors.brandColor }}>
                            {' '}
                            {data?.categories?.categoryName || ''}{' '}
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
                    {t('PublicProfile.experience')}:
                    {data?.experiense.map((e) => (
                        <SectionsUl key={e.id}>
                            <Line />
                            <Description>
                                {t('PublicProfile.company_name')}:{' '}
                                <span style={{ color: colors.brandColor }}>
                                    {e.companyName}
                                </span>
                            </Description>
                            <Description>
                                {t('PublicProfile.position')}:{' '}
                                <span style={{ color: colors.brandColor }}>
                                    {e.position}
                                </span>
                            </Description>
                            <Description>
                                {t('PublicProfile.period')}:{' '}
                                <span style={{ color: colors.brandColor }}>
                                    {e.startAt} - {e.endAt}
                                </span>
                            </Description>
                            <Line />
                        </SectionsUl>
                    ))}
                </Sections>
                <Sections>
                    {t('PublicProfile.skills')}:{' '}
                    <Description>
                        <span style={{ color: colors.brandColor }}>
                            {data?.skills.map((e) => (
                                <span key={e.id}>| {e.name} </span>
                            ))}{' '}
                        </span>
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
                {!location.state && (
                    <Row justify="end">
                        <ButtonSet onClick={handleSendProposal} type="default">
                            {t('PublicProfile.contact_info')}
                        </ButtonSet>
                        <ButtonSet
                            onClick={() => navigate(`/setting/${user?.id}`)}
                            type="default"
                        >
                            {t('PublicProfile.settings')}
                        </ButtonSet>
                    </Row>
                )}
            </ProfileContainer>
        </Page>
    );
};

export default PublicPage;
