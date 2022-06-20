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
    useDeleteExperienceMutation,
    useDeleteEducationMutation,
    useUpdateProfileMutation,
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

import { Line } from 'pages/PublicPage/styles';
import {
    ProfileContainer,
    Avatar,
    Page,
    TitleEmpty,
    Description,
    Sections,
    ButtonSet,
    SectionsExperience,
    ButtonDel,
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

    const [updateProfile] = useUpdateProfileMutation();

    const { data: allSkills } = useGetAllSkillsQuery('');
    const { data: allCategories } = useGetAllCategoriesQuery('');
    const [createProfile] = useCreateProfileMutation();
    const [createExperience] = useCreateExperienceMutation();
    const [deleteExperience] = useDeleteExperienceMutation();
    const [deleteEducation] = useDeleteEducationMutation();
    const [createEducation] = useCreateEducationMutation();
    const [uploadAvatar] = useUploadAvatarMutation();
    const { TextArea } = Input;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [skills, setSkills] = useState<any>(data?.skills);
    const [hourRate, setHourRate] = useState(data?.hourRate);
    const [availableHours, setAvailableHours] = useState(data?.availableHours);

    const [educationName, setEducationName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [startEducation, setStartEducation] = useState('');
    const [endEducation, setEndEducation] = useState('');

    const [nameCompany, setNameCompany] = useState('');
    const [experiensePosition, setExperiensePosition] = useState('');
    const [startExperiense, setStartExperiense] = useState('');
    const [endExperiense, setEndExperiense] = useState('');

    const [category, setCategory] = useState(data?.categories.categoryName);
    const [position, setPosition] = useState(data?.position);
    const [other, setOther] = useState(data?.other);
    const [english, setEnglish] = useState(data?.english);
    const [skillsId, setSkillsId] = useState<number[]>();
    const [categoryId, setCategoryId] = useState<number>();
    const [previewSource, setPreviewSource] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState();
    const [changeToggle, setChangeToggle] = useState<boolean>(false);
    const [changeToggleEducation, setChangeToggleEducation] =
        useState<boolean>(false);

    const onOther = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setOther(event.target.value);
    };
    const onNameCompany = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setNameCompany(event.target.value);
    };

    const onExpiriensePosition = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setExperiensePosition(event.target.value);
    };
    const onPosition = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPosition(event.target.value);
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
        try {
            const target = event.target as HTMLInputElement;
            const file = (target.files as FileList)[0];

            previewFile(file);

            const newformData = new FormData();
            newformData.append('file', file);
            newformData.append('upload_preset', 'ycmt0cuu');
            const response = await uploadAvatar(newformData).unwrap();

            setAvatarUrl(response.url);
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleChangeTag = (value: string[]): void => {
        setSkills(value);

        const res: number[] = [];
        allSkills?.forEach(({ id, name }) => {
            if (value.includes(name)) {
                res.push(id);
            }
        });
        setSkillsId(res);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDeleteExperience = async (e: any): Promise<void> => {
        try {
            await deleteExperience(Number(e.currentTarget.id));
        } catch (error) {
            message.error(error.status);
        }
        notification.success({
            message: 'Success delete 🧺',
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDeleteEducation = async (e: any): Promise<void> => {
        try {
            await deleteEducation(Number(e.currentTarget.id));
        } catch (error) {
            message.error(error.status);
        }
        notification.success({
            message: 'Success delete 🧺',
        });
    };
    const onHideEducation = (): void => {
        setEducationName('');
        setSpecialization('');
        setStartEducation('');
        setEndEducation('');
        setChangeToggleEducation(false);
    };
    const onHideExperience = (): void => {
        setNameCompany('');
        setExperiensePosition('');
        setStartExperiense('');
        setEndExperiense('');
        setChangeToggle(false);
    };

    const onAddEducation = async (): Promise<void> => {
        if (changeToggleEducation === true) {
            try {
                const UpdateEducation: Educations = {
                    name: educationName,
                    specialization,
                    startAt: startEducation,
                    endAt: endEducation,
                };

                const newEducation = await createEducation(
                    UpdateEducation
                ).unwrap();

                const arrayEducations: number[] = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data?.educations.forEach(({ id }: any) => {
                    arrayEducations.push(id);
                });
                arrayEducations.push(newEducation.id as number);

                const UpdateProfile: newProfile = {
                    id: user?.id,
                    userId: Number(user?.id),
                    educations: arrayEducations,
                };
                if (!educationName) {
                    return notification.warning({
                        message: 'All Education fields must be completed!',
                    });
                }
                if (!specialization) {
                    return notification.warning({
                        message: 'All Education fields must be completed!',
                    });
                }
                if (!startEducation) {
                    return notification.warning({
                        message: 'All Education fields must be completed!',
                    });
                }
                if (!endEducation) {
                    return notification.warning({
                        message: 'All Education fields must be completed!',
                    });
                }
                await updateProfile(UpdateProfile);
                setEducationName('');
                setSpecialization('');
                setStartEducation('');
                setEndEducation('');
                setChangeToggleEducation(false);
                notification.success({
                    message: 'Added successfully',
                });
            } catch (error) {
                return message.error(error.status);
            }
        }
        if (changeToggleEducation === false) {
            setChangeToggleEducation(true);
        }
        return undefined;
    };

    const onAddExperience = async (): Promise<void> => {
        if (changeToggle === true) {
            try {
                const UpdateExperience: Experiences = {
                    companyName: nameCompany,
                    position: experiensePosition,
                    startAt: startExperiense,
                    endAt: endExperiense,
                };
                const newExperience = await createExperience(
                    UpdateExperience
                ).unwrap();

                const arrayExperience: number[] = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data?.experiense.forEach(({ id }: any) => {
                    arrayExperience.push(id);
                });
                arrayExperience.push(newExperience.id as number);

                const UpdateProfile: newProfile = {
                    id: user?.id,
                    userId: Number(user?.id),
                    experiense: arrayExperience,
                };
                if (!nameCompany) {
                    return notification.warning({
                        message: 'All Experience fields must be completed!',
                    });
                }
                if (!experiensePosition) {
                    return notification.warning({
                        message: 'All Experience fields must be completed!',
                    });
                }
                if (!startExperiense) {
                    return notification.warning({
                        message: 'All Experience fields must be completed!',
                    });
                }
                if (!endExperiense) {
                    return notification.warning({
                        message: 'All Experience fields must be completed!',
                    });
                }
                await updateProfile(UpdateProfile);
                setNameCompany('');
                setExperiensePosition('');
                setStartExperiense('');
                setEndExperiense('');
                setChangeToggle(false);
                notification.success({
                    message: 'Added successfully',
                });
            } catch (error) {
                return message.error(error.status);
            }
        }
        if (changeToggle === false) {
            setChangeToggle(true);
        }
        return undefined;
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
            userId: Number(user?.id),
            profileImage: avatarUrl,
            hourRate,
            availableHours,
            categories: categoryId,
            position,
            skills: skillsId,
            english,
            other,
        };
        try {
            await createProfile(UpdateProfile);
        } catch (error) {
            return message.error(error.status);
        }
        navigate(`/profile/${user?.id}`);
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
                        style={{ marginTop: 10, width: 114 }}
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
                    {data?.educations.map((e) => (
                        <SectionsExperience key={e.id}>
                            <Line />
                            <Description>
                                <Row justify="end">
                                    <ButtonDel
                                        style={{
                                            marginBottom: -33,
                                            marginTop: 0,
                                            marginRight: '7%',
                                            width: 33,
                                            borderRadius: 30,
                                        }}
                                        onClick={onDeleteEducation}
                                        type="default"
                                        id={String(e.id)}
                                    >
                                        ❌
                                    </ButtonDel>
                                </Row>
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
                        </SectionsExperience>
                    ))}
                    {changeToggleEducation && (
                        <>
                            <Line />
                            <Description>
                                <Row justify="end">
                                    <ButtonDel
                                        style={{
                                            marginBottom: -33,
                                            marginTop: 0,
                                            marginRight: '7%',
                                            width: 33,
                                            borderRadius: 30,
                                        }}
                                        type="default"
                                        onClick={onHideEducation}
                                    >
                                        ❌
                                    </ButtonDel>
                                </Row>
                                {t('PublicProfile.name_of_courses')}:{' '}
                                <Input
                                    style={{
                                        width: 159,
                                        marginTop: 0,
                                    }}
                                    placeholder={t(
                                        'PublicProfile.name_of_courses'
                                    )}
                                    value={educationName}
                                    onChange={onEducationName}
                                />
                            </Description>
                            <Description>
                                {t('PublicProfile.specialization')}:{' '}
                                <Input
                                    style={{ width: 241 }}
                                    value={specialization}
                                    onChange={onSpecialization}
                                    placeholder={t(
                                        'PublicProfile.specialization'
                                    )}
                                />
                            </Description>
                            <Description>
                                {t('PublicProfile.period')}: start{' '}
                                <Space direction="vertical">
                                    <DatePicker
                                        onChange={onStartEducation}
                                        placeholder="Select Date"
                                    />
                                </Space>{' '}
                                end{' '}
                                <Space direction="vertical">
                                    <DatePicker
                                        onChange={onEndEducation}
                                        placeholder="Select Date"
                                    />
                                </Space>
                            </Description>
                            <ButtonSet
                                onClick={onAddEducation}
                                style={{
                                    width: 100,
                                    marginTop: 20,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginBottom: 5,
                                }}
                                type="default"
                            >
                                Сonfirm ✔
                            </ButtonSet>
                            <Line />
                        </>
                    )}
                    {!changeToggleEducation && (
                        <Row justify="center">
                            <ButtonSet
                                onClick={onAddEducation}
                                style={{ marginTop: 20 }}
                                type="default"
                            >
                                ➕
                            </ButtonSet>
                        </Row>
                    )}
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
                            placeholder="Please select"
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
                    {data?.experiense.map((e) => (
                        <SectionsExperience key={e.id}>
                            <Line />
                            <Description>
                                <Row justify="end">
                                    <ButtonDel
                                        style={{
                                            marginBottom: -33,
                                            marginTop: 0,
                                            marginRight: '7%',
                                            width: 33,
                                            borderRadius: 30,
                                        }}
                                        onClick={onDeleteExperience}
                                        type="default"
                                        id={String(e.id)}
                                    >
                                        ❌
                                    </ButtonDel>
                                </Row>
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
                        </SectionsExperience>
                    ))}
                    {changeToggle && (
                        <>
                            <Line />
                            <Description>
                                <Row justify="end">
                                    <ButtonDel
                                        style={{
                                            marginBottom: -33,
                                            marginTop: 0,
                                            marginRight: '7%',
                                            width: 33,
                                            borderRadius: 30,
                                        }}
                                        type="default"
                                        onClick={onHideExperience}
                                    >
                                        ❌
                                    </ButtonDel>
                                </Row>
                                {t('PublicProfile.company_name')}:{' '}
                                <Input
                                    style={{
                                        width: 159,
                                        marginTop: 0,
                                    }}
                                    placeholder={t(
                                        'PublicProfile.company_name'
                                    )}
                                    value={nameCompany}
                                    onChange={onNameCompany}
                                />
                            </Description>
                            <Description>
                                {t('PublicProfile.position')}:{' '}
                                <Input
                                    style={{ width: 241 }}
                                    value={experiensePosition}
                                    onChange={onExpiriensePosition}
                                    placeholder={t('PublicProfile.position')}
                                />
                            </Description>
                            <Description>
                                {t('PublicProfile.period')}: start{' '}
                                <Space direction="vertical">
                                    <DatePicker
                                        onChange={onStartExperiense}
                                        placeholder="Select Date"
                                    />
                                </Space>{' '}
                                end{' '}
                                <Space direction="vertical">
                                    <DatePicker
                                        onChange={onEndExperiense}
                                        placeholder="Select Date"
                                    />
                                </Space>
                            </Description>
                            <ButtonSet
                                onClick={onAddExperience}
                                style={{
                                    width: 100,
                                    marginTop: 20,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginBottom: 5,
                                }}
                                type="default"
                            >
                                Сonfirm ✔
                            </ButtonSet>
                            <Line />
                        </>
                    )}
                    {!changeToggle && (
                        <Row justify="center">
                            <ButtonSet
                                onClick={onAddExperience}
                                style={{ marginTop: 20 }}
                                type="default"
                            >
                                ➕
                            </ButtonSet>
                        </Row>
                    )}
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
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            defaultValue={skills?.map((skill: any) => (
                                <Option key={skill.name}>{skill.name}</Option>
                            ))}
                            onChange={handleChangeTag}
                        >
                            {allSkills?.map((skill) => (
                                <Option value={skill.name} key={skill.id}>
                                    {skill.name}
                                </Option>
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
                                placeholder="Please select"
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
