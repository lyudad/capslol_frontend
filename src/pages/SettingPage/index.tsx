import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import {
    useGetAllSkillsQuery,
    useSearchUserQuery,
} from 'store/apis/publicProfile';
import { useState } from 'react';
import { InputNumber, Input, DatePicker, Space, Select, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { colors } from 'constants/index';
import 'antd/dist/antd.min.css';
import { useNavigate } from 'react-router-dom';
import avatar from 'assets/avatar.png';
import {
    ProfileContainer,
    Avatar,
    Page,
    TitleEmpty,
    Description,
    Sections,
    ButtonSet,
} from './styles';

const english = ['Beginner', 'Pre-Intermediate', 'Intermediate', 'Advanced'];

const SettingPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAppSelector((s) => s.auth);
    const { Option } = Select;
    const { data } = useSearchUserQuery(user?.id);
    const { data: allSkills } = useGetAllSkillsQuery('');
    const { TextArea } = Input;
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);

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
        data?.experiense.companyName
    );

    const onChangeFirstName = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setFirstName(event.target.value);
    };
    const onChangeLastName = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setLastName(event.target.value);
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartEducation = (date: any, dateString: string): void => {
        setStartEducation(dateString);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEndEducation = (date: any, dateString: string): void => {
        setEndEducation(dateString);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartExperiense = (date: any, dateString: string): void => {
        setStartExperiense(dateString);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEndExperiense = (date: any, dateString: string): void => {
        setEndExperiense(dateString);
    };

    const handleChangeCategory = (value: string): void => {
        setCategory(value);
    };

    const handleChange = (value: string): void => {
        // eslint-disable-next-line no-console
        console.log(`selected ${value}`);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeTag = (value: any): void => {
        // eslint-disable-next-line no-console
        console.log(`selected ${value}`);
    };

    return (
        <Page>
            <ProfileContainer>
                <TitleEmpty>
                    <Input
                        size="middle"
                        style={{ marginRight: 10 }}
                        placeholder={t('PublicProfile.first_name')}
                        onChange={onChangeFirstName}
                        value={firstName}
                        prefix={<UserOutlined />}
                    />
                    <Input
                        size="middle"
                        placeholder={t('PublicProfile.last_name')}
                        onChange={onChangeLastName}
                        value={lastName}
                    />
                </TitleEmpty>
                <Avatar>
                    <img
                        src={data?.profileImage || avatar}
                        alt=""
                        width={140}
                    />
                    <ButtonSet type="default">
                        {t('PublicProfile.save_changes')}
                    </ButtonSet>
                </Avatar>

                <Sections>
                    <Description>
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
                    {t('PublicProfile.category')}:
                    <Description>
                        <Select
                            defaultValue={category}
                            style={{ width: 220 }}
                            onChange={handleChangeCategory}
                            placeholder={t('PublicProfile.choose_category')}
                        >
                            <Option value="Research and Development">
                                Research and Development
                            </Option>
                            <Option value="Web development">
                                Web development
                            </Option>
                            <Option value="Accounting">Accounting</Option>
                            <Option value="Business Development">
                                Business Development
                            </Option>
                            <Option value="Human Resources">
                                Human Resources
                            </Option>
                            <Option value="UX/UI design">UX/UI design</Option>
                            <Option value="Services">Services</Option>
                            <Option value="Legal">Legal</Option>
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
                        {t('PublicProfile.period')}:{' '}
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
                    {t('PublicProfile.skills')}:{' '}
                    <Description>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '65%' }}
                            placeholder="Please select"
                            defaultValue={data?.skills.map((e) => (
                                <Option key={e.name}>{e.name}</Option>
                            ))}
                            onChange={handleChangeTag}
                        >
                            {allSkills?.map((e) => (
                                <Option key={e.name}>{e.name}</Option>
                            ))}
                        </Select>
                    </Description>
                </Sections>
                {/* ENGLISH */}
                <Sections>
                    {t('PublicProfile.languages')}:{' '}
                    <Description>
                        <span>
                            level:{' '}
                            <Select
                                placeholder="NO SET"
                                defaultValue={data?.english}
                                style={{ width: 220 }}
                                onChange={handleChange}
                            >
                                {english.map((e) => (
                                    <Option key={e} value={e}>
                                        {e}
                                    </Option>
                                ))}
                            </Select>
                        </span>
                    </Description>
                </Sections>
                {/* OTHER */}
                <Sections>
                    {t('PublicProfile.add_information')}:{' '}
                    <Description>
                        <TextArea
                            rows={4}
                            style={{ width: 420 }}
                            value={data?.other}
                            placeholder={t('PublicProfile.text_type')}
                            maxLength={6}
                        />
                    </Description>
                </Sections>
                <Row justify="end">
                    <ButtonSet
                        onClick={() => navigate(`/profile`)}
                        type="default"
                    >
                        {t('PublicProfile.save_changes')}
                    </ButtonSet>
                </Row>
            </ProfileContainer>
        </Page>
    );
};

export default SettingPage;
