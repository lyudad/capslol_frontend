import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { notification, Modal, Select } from 'antd';
import avatar from 'assets/avatar.png';
import { useEffect, useState } from 'react';
import { Slicer } from 'utilities/utilities';
import { useAppSelector } from 'hooks/redux';
import { useLazyGetJobsByOwnerQuery } from 'store/apis/jobs';
import { IJob } from 'store/apis/jobs/jobs.types';
import {
    StyledButton,
    JobTitle,
    OwnerContainer,
    Descriptions,
    ValueBox,
    Field,
    FieldValue,
    StyledNav,
    Avatar,
    FieldSkills,
} from './styles';
import 'antd/dist/antd.min.css';
import { talentProfile } from './props';

interface IProps {
    jobObj: talentProfile;
}

const TalentListCard: React.FC<IProps> = ({ jobObj }) => {
    const { user: userStore } = useAppSelector((s) => s.auth);
    const [searchOwnJobs] = useLazyGetJobsByOwnerQuery();
    // console.log(data, 'My Jobs');

    const { Option } = Select;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id, user, other, profileImage, categories, skills } = jobObj;
    const [targetId, setTargetId] = useState();
    const [idAfterOk, setIdAfterOk] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentName, setCurrentName] = useState();
    const [ownJobs, setOwnJobs] = useState<IJob[]>([]);

    useEffect((): void => {
        const reloadJobs = async (): Promise<void> => {
            const results = await searchOwnJobs(userStore?.id).unwrap();
            setOwnJobs([...results]);
        };
        reloadJobs();
    }, [searchOwnJobs, userStore?.id]);

    // const showModal = (): void => {
    //     setIsModalVisible(true);
    // };

    const handleOk = (): void => {
        setIsModalVisible(false);
        setIdAfterOk(targetId);
        notification.success({
            message: t('TalentPage.sent_to') + currentName,
        });
    };

    const handleCancel = (): void => {
        setIsModalVisible(false);
    };

    const onClickJob = (): void => {
        navigate(`/talents/profile/${id}`, { state: id });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSendInterview = (e: any): void => {
        setIsModalVisible(true);
        setTargetId(e.currentTarget.id);
        setCurrentName(e.currentTarget.name);
    };

    return (
        <>
            <StyledButton onClick={onClickJob} type="submit">
                <JobTitle>
                    <Avatar>
                        <img src={profileImage || avatar} alt="" width={60} />
                    </Avatar>
                    {user?.firstName} {user?.lastName}
                </JobTitle>
            </StyledButton>
            <Descriptions>{Slicer(other)}</Descriptions>
            <OwnerContainer>
                <ValueBox>
                    <Field>{t('JobPage.category')}</Field>
                    <FieldValue>{categories?.categoryName}</FieldValue>
                </ValueBox>
                <ValueBox>
                    <Field>{t('JobPage.skills')}</Field>
                    <FieldSkills>
                        {skills
                            ?.map((item: { name: string }) => item.name)
                            .join(', ')}
                    </FieldSkills>
                </ValueBox>
            </OwnerContainer>
            {id === Number(idAfterOk) ? (
                <StyledNav disabled>{t('TalentPage.already_sent')}</StyledNav>
            ) : (
                <StyledNav
                    name={`${user?.firstName} ${user?.lastName}`}
                    id={String(id)}
                    onClick={handleSendInterview}
                >
                    {t('TalentPage.send_interview')}
                </StyledNav>
            )}
            <Modal
                title={t('TalentPage.title_modal')}
                visible={isModalVisible}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Select
                    defaultValue={ownJobs[0]?.title}
                    style={{ width: '100%' }}
                    // onChange={handleChangeCategory}
                    placeholder="Please select"
                >
                    {ownJobs?.map((e) => (
                        <Option key={e.title}>{e.title}</Option>
                    ))}
                    {/* <Option key="One">One</Option>
                    <Option key="Two">Two</Option>
                    <Option key="Three">Three</Option> */}
                </Select>
            </Modal>
        </>
    );
};

export default TalentListCard;
