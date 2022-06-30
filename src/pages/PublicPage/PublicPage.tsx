import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomizedState } from 'pages/TalentsPage/TalentListCard/props';
import { message, Modal, notification, Row, Select } from 'antd';
import { colors } from 'constants/index';
import 'antd/dist/antd.min.css';
import { useSearchUserQuery } from 'store/apis/publicProfile';
import { useEffect, useState } from 'react';
import { IJob } from 'store/apis/jobs/jobs.types';
import avatar from 'assets/avatar.png';
import { newInvitation } from 'store/apis/invitations/invitations.types';
import { useLazyGetJobsByOwnerQuery } from 'store/apis/jobs';
import { useCreateInvitationMutation } from 'store/apis/talents';
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
    const location = useLocation();
    const { id: locationId, isActive } = location.state as CustomizedState;
    const { Option } = Select;
    const [searchOwnJobs] = useLazyGetJobsByOwnerQuery();
    const [createInvitation] = useCreateInvitationMutation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAppSelector((s) => s.auth);
    const { data } = useSearchUserQuery(locationId || user?.id);
    const [toggle, setToggle] = useState(isActive);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [jobIdSelected, setJobIdSelected] = useState<number>();
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [ownJobs, setOwnJobs] = useState<IJob[]>([]);

    useEffect((): void => {
        const reloadJobs = async (): Promise<void> => {
            const firsResults = await searchOwnJobs(user?.id).unwrap();
            const results = firsResults.filter(
                (item) => item.isArchived === false
            );
            setOwnJobs([...results]);
        };
        reloadJobs();
    }, [searchOwnJobs, user?.id]);

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

    const handleOk = async (): Promise<void> => {
        try {
            setConfirmLoading(true);
            const createNewInvitation: newInvitation = {
                ownerId: user?.id,
                freelancerId: data?.user?.id,
                jobId: Number(jobIdSelected || ownJobs[0]?.id),
            };
            await createInvitation(createNewInvitation).unwrap();
        } catch (error) {
            return message.error(error.status);
        }
        setConfirmLoading(false);
        setIsModalVisible(false);
        setToggle(true);
        return notification.success({
            message: `${t('TalentPage.sent_to')}${data?.user?.firstName} ${
                data?.user?.lastName
            }`,
        });
    };
    const handleCancel = (): void => {
        setIsModalVisible(false);
    };

    const handleChangeCategory = (value: string): void => {
        setJobIdSelected(Number(value));
    };

    const handleSendInterview = async (): Promise<void> => {
        try {
            if (!ownJobs.length) {
                notification.warning({
                    message: t('TalentPage.no_jobs'),
                });
                return;
            }
            if (ownJobs.length === 1) {
                const createNewInvitation: newInvitation = {
                    ownerId: user?.id,
                    freelancerId: data?.user?.id,
                    jobId: Number(ownJobs[0]?.id),
                };
                await createInvitation(createNewInvitation).unwrap();
                notification.success({
                    message: `${t('TalentPage.sent_to')}${
                        data?.user?.firstName
                    } ${data?.user?.lastName}`,
                });
                return;
            }
            setIsModalVisible(true);
        } catch (error) {
            if ('data' in error) {
                message.error(error.data.message);
            }
            if ('error' in error) {
                message.error(error.status);
            }
            throw error;
        }
    };

    return (
        <>
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
                            <ButtonSet
                                onClick={handleSendProposal}
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
                    )}
                </ProfileContainer>
            </Page>
            <Modal
                title={t('TalentPage.title_modal')}
                visible={isModalVisible}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
            >
                <Select
                    defaultValue={ownJobs[0]?.title}
                    style={{ width: '100%' }}
                    onChange={handleChangeCategory}
                    placeholder="Please select"
                >
                    {ownJobs?.map((e) => (
                        <Option key={e.id}>{e.title}</Option>
                    ))}
                </Select>
            </Modal>
        </>
    );
};

export default PublicPage;
