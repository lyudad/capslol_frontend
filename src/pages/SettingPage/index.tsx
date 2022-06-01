import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import {
    useGetAllSkillsQuery,
    useSearchUserQuery,
    useCreateProfileMutation,
    useCreateExperienceMutation,
    useGetAllCategoriesQuery,
    useCreateEducationMutation,
    useUploadAvatarMutation,
} from 'store/apis/publicProfile';
import { useState } from 'react';
import {
    InputNumber,
    Input,
    DatePicker,
    Space,
    Select,
    Row,
    notification,
    message,
} from 'antd';

import { colors } from 'constants/index';
import 'antd/dist/antd.min.css';
import { useNavigate } from 'react-router-dom';
import avatar from 'assets/avatar.png';
import {
    Educations,
    Experiences,
    newProfile,
} from 'store/apis/publicProfile/publicProfile.types';
import { Moment } from 'moment';

import {
    ProfileContainer,
    Avatar,
    Page,
    TitleEmpty,
    Description,
    Sections,
    ButtonSet,
} from './styles';

const englishEnum = [
    'Beginner',
    'Pre-Intermediate',
    'Intermediate',
    'Advanced',
];

const SettingPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAppSelector((s) => s.auth);
    const { Option } = Select;
    const { data } = useSearchUserQuery(user?.id);
    const { data: allSkills } = useGetAllSkillsQuery('');
    const { data: allCategories } = useGetAllCategoriesQuery('');
    const [createProfile] = useCreateProfileMutation();
    const [createExperience] = useCreateExperienceMutation();
    const [createEducation] = useCreateEducationMutation();
    const [uploadAvatar] = useUploadAvatarMutation();

    const { TextArea } = Input;

    const [hourRate, setHourRate] = useState(data?.hourRate);
    const [availableHours, setAvailableHours] = useState(data?.availableHours);
    const [educationName, setEducationName] = useState(data?.educations.name);
    const [specialization, setSpecialization] = useState(
        data?.educations.specialization
    );
    const [startEducation, setStartEducation] = useState(
        data?.educations.startAt
    );
    const [startExperiense, setStartExperiense] = useState(
        data?.experiense.startAt
    );
    const [endEducation, setEndEducation] = useState(data?.educations.endAt);
    const [endExperiense, setEndExperiense] = useState(data?.experiense.endAt);
    const [category, setCategory] = useState(data?.categories.categoryName);
    const [position, setPosition] = useState(data?.position);
    const [nameCompany, setNameCompany] = useState(
        data?.experiense.companyName
    );
    const [experiensePosition, setExperiensePosition] = useState(
        data?.experiense.position
    );
    const [other, setOther] = useState(data?.other);
    const [english, setEnglish] = useState(data?.english);
    const [skills, setSkills] = useState(
        data?.skills.map((e) => <Option key={e.name}>{e.name}</Option>)
    );
    const [skillsId, setSkillsId] = useState<number[]>();
    const [categoryId, setCategoryId] = useState<number>();

    const [previewSource, setPreviewSource] = useState<string>('');

    const [avatarUrl, setAvatarUrl] = useState();

    const onNameCompany = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setNameCompany(event.target.value);
    };
    const onOther = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setOther(event.target.value);
    };

    const onExpiriensePosition = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setExperiensePosition(event.target.value);
    };
    const onPosition = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPosition(event.target.value);
    };
    const onChangeHuorRate = (value: number): void => {
        setHourRate(value);
    };
    const onChangeAvailableHours = (value: number): void => {
        setAvailableHours(value);
    };
    const onEducationName = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setEducationName(event.target.value);
    };
    const onSpecialization = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSpecialization(event.target.value);
    };

    const onStartEducation = (
        date: Moment | null,
        dateString: string
    ): void => {
        setStartEducation(dateString);
    };

    const onEndEducation = (date: Moment | null, dateString: string): void => {
        setEndEducation(dateString);
    };

    const onStartExperiense = (
        date: Moment | null,
        dateString: string
    ): void => {
        setStartExperiense(dateString);
    };

    const onEndExperiense = (date: Moment | null, dateString: string): void => {
        setEndExperiense(dateString);
    };

    const handleChangeCategory = (value: string): void => {
        setCategory(value);
        const numberId: number[] = [];
        allCategories?.forEach(({ id, categoryName }) => {
            if (value.includes(categoryName)) {
                numberId.push(id);
            }
        });
        setCategoryId(Number(...numberId));
    };

    const handleChange = (value: string): void => {
        setEnglish(value);
    };

    const previewFile = (file: Blob): void => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result as string);
        };
    };

    const handleUploadImage = async (
        event: React.ChangeEvent
    ): Promise<void> => {
        const target = event.target as HTMLInputElement;
        const file = (target.files as FileList)[0];

        previewFile(file);

        const newformData = new FormData();
        newformData.append('file', file);
        newformData.append('upload_preset', 'ycmt0cuu');

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await uploadAvatar(newformData).then((res: any) =>
                setAvatarUrl(res.data.url)
            );
        } catch (error) {
            message.error(error.message);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeTag = (value: any): void => {
        setSkills(value);

        const res: number[] = [];
        allSkills?.forEach(({ id, name }) => {
            if (value.includes(name)) {
                res.push(id);
            }
        });
        setSkillsId(res);
    };

    const onSaveChanges = async (): Promise<void> => {
        if (!hourRate) {
            return notification.warning({
                message: 'Please input your Hour Rate!',
            });
        }
        if (!availableHours) {
            return notification.warning({
                message: 'Please input your available amount of hours',
            });
        }
        if (!category) {
            return notification.warning({
                message: 'Please choose your Category',
            });
        }
        if (!skills) {
            return notification.warning({
                message: 'Please choose your Skills',
            });
        }
        if (!english) {
            return notification.warning({
                message: 'Please choose your English level',
            });
        }

        const UpdateProfile: newProfile = {
            id: user?.id,
            profileImage: avatarUrl,
            hourRate,
            availableHours,
            categories: categoryId,
            position,
            skills: skillsId,
            english,
            other,
        };

        const UpdateEducation: Educations = {
            id: user?.id,
            name: educationName,
            specialization,
            startAt: startEducation,
            endAt: endEducation,
        };
        const UpdateExperience: Experiences = {
            id: user?.id,
            companyName: nameCompany,
            position: experiensePosition,
            startAt: startExperiense,
            endAt: endExperiense,
        };

        try {
            await createEducation(UpdateEducation);
            await createExperience(UpdateExperience);
            await createProfile(UpdateProfile);
        } catch (error) {
            message.error(error.status);
        }
        navigate(`/profile`);
        return notification.success({
            message: 'Changes saved',
        });
    };

    return (
        <Page>
            <ProfileContainer>
                <TitleEmpty>
                    {user?.firstName
                        ? `${user?.firstName} ${user?.lastName}`
                        : t('PublicProfile.user_name')}
                </TitleEmpty>

                <Avatar>
                    {previewSource ? (
                        <img src={previewSource} alt="" width={140} />
                    ) : (
                        <img
                            src={data?.profileImage || avatar}
                            alt=""
                            width={140}
                        />
                    )}
                    <input
                        type="file"
                        name="image"
                        onChange={handleUploadImage}
                    />
                </Avatar>
                <Sections>
                    <Description>
                        <span style={{ color: colors.brandColor }}>*</span>{' '}
                        {t('PublicProfile.hour_rate')}{' '}
                        <span style={{ color: colors.brandColor }}>
                            {' '}
                            <InputNumber
                                min={1}
                                max={50}
                                placeholder="max 50"
                                defaultValue={hourRate}
                                onChange={onChangeHuorRate}
                            />
                        </span>
                        {' $'}
                    </Description>
                    <Description>
                        <span style={{ color: colors.brandColor }}>*</span>{' '}
                        {t('PublicProfile.amount_hours')}{' '}
                        <span style={{ color: colors.brandColor }}>
                            {' '}
                            <InputNumber
                                min={1}
                                max={12}
                                placeholder="max 12"
                                defaultValue={availableHours}
                                onChange={onChangeAvailableHours}
                            />
                        </span>
                        {' h'}
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.education')}
                    <Description>
                        {t('PublicProfile.name_of_courses')}:{' '}
                        <Input
                            style={{ width: 200 }}
                            value={educationName}
                            onChange={onEducationName}
                            placeholder={t('PublicProfile.education_name')}
                        />
                    </Description>
                    <Description>
                        {t('PublicProfile.specialization')}:{' '}
                        <Input
                            style={{ width: 200 }}
                            value={specialization}
                            onChange={onSpecialization}
                            placeholder={t('PublicProfile.specialization')}
                        />
                    </Description>
                    <Description>
                        {t('PublicProfile.period')}: start{' '}
                        <Space direction="vertical">
                            <DatePicker
                                placeholder={startEducation}
                                onChange={onStartEducation}
                            />
                        </Space>{' '}
                        end{' '}
                        <Space direction="vertical">
                            <DatePicker
                                placeholder={endEducation}
                                onChange={onEndEducation}
                            />
                        </Space>
                    </Description>
                </Sections>
                <Sections>
                    <span>
                        <span style={{ color: colors.brandColor }}>* </span>{' '}
                        {t('PublicProfile.category')}:
                    </span>
                    <Description>
                        <Select
                            defaultValue={category}
                            style={{ width: 220 }}
                            onChange={handleChangeCategory}
                            placeholder={t('PublicProfile.choose_category')}
                        >
                            {allCategories?.map((e) => (
                                <Option key={e.categoryName}>
                                    {e.categoryName}
                                </Option>
                            ))}
                        </Select>
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.position')}:{' '}
                    <Description>
                        <Input
                            style={{ width: 200 }}
                            value={position}
                            onChange={onPosition}
                            placeholder={t('PublicProfile.position')}
                        />
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.experience')}
                    <Description>
                        {t('PublicProfile.company_name')}:{' '}
                        <Input
                            style={{ width: 200 }}
                            placeholder={t('PublicProfile.company_name')}
                            value={nameCompany}
                            onChange={onNameCompany}
                        />
                    </Description>
                    <Description>
                        {t('PublicProfile.position')}:{' '}
                        <Input
                            style={{ width: 200 }}
                            value={experiensePosition}
                            onChange={onExpiriensePosition}
                            placeholder={t('PublicProfile.position')}
                        />
                    </Description>
                    <Description>
                        {t('PublicProfile.period')}: start{' '}
                        <Space direction="vertical">
                            <DatePicker
                                placeholder={startExperiense}
                                onChange={onStartExperiense}
                            />
                        </Space>{' '}
                        end{' '}
                        <Space direction="vertical">
                            <DatePicker
                                placeholder={endExperiense}
                                onChange={onEndExperiense}
                            />
                        </Space>
                    </Description>
                </Sections>
                <Sections>
                    <span>
                        <span style={{ color: colors.brandColor }}>* </span>{' '}
                        {t('PublicProfile.skills')}:
                    </span>

                    <Description>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '65%' }}
                            placeholder="Please select"
                            defaultValue={skills}
                            onChange={handleChangeTag}
                        >
                            {allSkills?.map((e) => (
                                <Option key={e.name}>{e.name}</Option>
                            ))}
                        </Select>
                    </Description>
                </Sections>
                <Sections>
                    <span>
                        <span style={{ color: colors.brandColor }}>* </span>{' '}
                        {t('PublicProfile.languages')}:
                    </span>

                    <Description>
                        <span>
                            level:{' '}
                            <Select
                                placeholder="NO SET"
                                defaultValue={english}
                                style={{ width: 220 }}
                                onChange={handleChange}
                            >
                                {englishEnum.map((e) => (
                                    <Option key={e} value={e}>
                                        {e}
                                    </Option>
                                ))}
                            </Select>
                        </span>
                    </Description>
                </Sections>
                <Sections>
                    {t('PublicProfile.add_information')}:{' '}
                    <Description>
                        <TextArea
                            rows={4}
                            style={{ width: 420 }}
                            showCount
                            maxLength={500}
                            placeholder={t('PublicProfile.text_type')}
                            value={other}
                            onChange={onOther}
                        />
                    </Description>
                </Sections>
                <Row justify="end">
                    <ButtonSet onClick={onSaveChanges} type="default">
                        {t('PublicProfile.save_changes')}
                    </ButtonSet>
                </Row>
            </ProfileContainer>
        </Page>
    );
};

export default SettingPage;
