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
    useGetAllExperienceQuery,
    useDeleteExperienceMutation,
    useGetAllEducationsQuery,
    useDeleteEducationMutation,
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

    const { data: allExperience } = useGetAllExperienceQuery('');
    const { data: allEducations } = useGetAllEducationsQuery('');
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
    const [endEducation, setEndEducation] = useState('select date');

    const [nameCompany, setNameCompany] = useState('');
    const [experiensePosition, setExperiensePosition] = useState('');
    const [startExperiense, setStartExperiense] = useState('');
    const [endExperiense, setEndExperiense] = useState('select date');
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

    const onEndExperiense = async (
        date: Moment | null,
        dateString: string
    ): Promise<void> => {
        const UpdateExperience: Experiences = {
            companyName: nameCompany,
            position: experiensePosition,
            startAt: startExperiense,
            endAt: dateString,
        };
        await createExperience(UpdateExperience);
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

    const onEndEducation = async (
        date: Moment | null,
        dateString: string
    ): Promise<void> => {
        const UpdateEducation: Educations = {
            name: educationName,
            specialization,
            startAt: startEducation,
            endAt: dateString,
        };

        await createEducation(UpdateEducation);
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

    const onAddEducation = (): void => {
        if (changeToggleEducation === true) {
            setChangeToggleEducation(false);
            setEndEducation('Select date');
        }
        if (changeToggleEducation === false) {
            setChangeToggleEducation(true);
            setEndEducation('');
        }
    };

    const onAddExperience = (): void => {
        if (changeToggle === true) {
            setChangeToggle(false);
            setEndExperiense('Select date');
        }
        if (changeToggle === false) {
            setChangeToggle(true);
            setEndExperiense('');
        }
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
        if (!endExperiense) {
            return notification.warning({
                message: 'Please fill in all fields of new Experience section',
            });
        }
        if (!endEducation) {
            return notification.warning({
                message: 'Please fill in all fields of new Education section',
            });
        }

        const arrayEducations: number[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        allEducations?.forEach(({ id }: any) => {
            arrayEducations.push(id);
        });

        const arrayExperiense: number[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        allExperience?.forEach(({ id }: any) => {
            arrayExperiense.push(id);
        });

        const UpdateProfile: newProfile = {
            id: user?.id,
            userId: Number(user?.id),
            experiense: arrayExperiense,
            educations: arrayEducations,
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
                            <Line />
                        </>
                    )}
                    <Row justify="center">
                        <ButtonSet
                            onClick={onAddEducation}
                            style={{ marginTop: 20 }}
                            type="default"
                        >
                            {changeToggleEducation ? '⛔' : '➕'}
                        </ButtonSet>
                    </Row>
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
                            <Line />
                        </>
                    )}
                    <Row justify="center">
                        <ButtonSet
                            onClick={onAddExperience}
                            style={{ marginTop: 20 }}
                            type="default"
                        >
                            {changeToggle ? '⛔' : '➕'}
                        </ButtonSet>
                    </Row>
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
