import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import {
    useGetAllSkillsQuery,
    useSearchUserQuery,
} from 'store/apis/publicProfile';
import { useState } from 'react';
import { UploadFile, UploadFileStatus } from 'antd/lib/upload/interface';
import {
    Upload,
    InputNumber,
    Input,
    DatePicker,
    Space,
    Select,
    Row,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { colors } from 'constants/index';
import 'antd/dist/antd.min.css';
import { useNavigate } from 'react-router-dom';

import avatar from '../../assets/avatar.png';

import {
    ProfileContainer,
    Avatar,
    Page,
    TitleEmpty,
    Description,
    Sections,
    ButtonSet,
} from './styles';

interface File {
    uid: string;
    name: string;
    url: string | undefined;
    status?: UploadFileStatus;
}
const english = ['Beginner', 'Pre-Intermediate', 'Intermediate', 'Advanced'];

const SettingPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAppSelector((s) => s.authReducer);
    const { Option } = Select;
    const { data } = useSearchUserQuery(user?.id);
    const { data: allSkills } = useGetAllSkillsQuery('');
    const imgProgile = data?.profileImage || avatar;
    const [fileList, setFileList] = useState<File[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: imgProgile,
        },
    ]);
    const { TextArea } = Input;
    const [name, setName] = useState(`${user?.firstName} ${user?.lastName}`);
    const [hourRate, setHourRate] = useState(data?.hourRate);
    const [availableHours, setAvailableHours] = useState(data?.availableHours);
    const [educationName, setEducationName] = useState(data?.educations.name);
    const [specializ, setSpecializ] = useState(data?.educations.specialization);
    const [startEduc, setStartEduc] = useState(data?.educations.startAt);
    const [startExp, setStartExp] = useState(data?.experiense.startAt);
    const [endEduc, setEndEduc] = useState(data?.educations.endAt);
    const [endExp, setEndtExp] = useState(data?.experiense.endAt);

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
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
        setSpecializ(event.target.value);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartDate = (date: any, dateString: string): void => {
        setStartEduc(dateString);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEndDate = (date: any, dateString: string): void => {
        setEndEduc(dateString);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartExp = (date: any, dateString: string): void => {
        setStartExp(dateString);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEndExp = (date: any, dateString: string): void => {
        setEndtExp(dateString);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = ({ fileList: newFileList }: any): void => {
        setFileList(newFileList);
    };

    const handleChange = (value: string): void => {
        console.log(`selected ${value}`);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeTag = (value: any): void => {
        console.log(`selected ${value}`);
    };

    const onPreview = async (file: UploadFile): Promise<void> => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve): void => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as Blob);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        if (typeof src === 'string') {
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
        }
    };

    return (
        <Page>
            <ProfileContainer>
                <TitleEmpty>
                    <Input
                        size="large"
                        onChange={onChangeName}
                        value={name}
                        placeholder={t('PublicProfile.user_name')}
                        prefix={<UserOutlined />}
                    />
                </TitleEmpty>
                <Avatar>
                    <ImgCrop rotate>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 1 && 'Upload'}
                        </Upload>
                    </ImgCrop>
                </Avatar>
                {/* HOURS/RATE */}
                <Sections>
                    <Description>
                        {t('PublicProfile.hour_rate')}{' '}
                        <span style={{ color: colors.brandColor }}>
                            {' '}
                            <InputNumber
                                min={1}
                                max={50}
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
                                defaultValue={availableHours}
                                onChange={onChangeAvailableHours}
                            />
                        </span>
                        {' h'}
                    </Description>
                </Sections>
                {/* EDUCATION */}
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
                            value={specializ}
                            onChange={onSpecialization}
                            placeholder={t('PublicProfile.specialization')}
                        />
                    </Description>
                    <Description>
                        {t('PublicProfile.period')}: start{' '}
                        <Space direction="vertical">
                            <DatePicker
                                placeholder={startEduc}
                                onChange={onStartDate}
                            />
                        </Space>{' '}
                        end{' '}
                        <Space direction="vertical">
                            <DatePicker
                                placeholder={endEduc}
                                onChange={onEndDate}
                            />
                        </Space>
                    </Description>
                </Sections>
                {/* CATEGORY */}
                <Sections>
                    {t('PublicProfile.category')}:
                    <Description>
                        <Select
                            defaultValue="Web Developer"
                            style={{ width: 220 }}
                            onChange={handleChange}
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
                        {/* <span style={{ color: colors.brandColor }}>
                            {' '}
                            {data?.categories.categoryName ||
                                t('PublicProfile.development')}{' '}
                        </span> */}
                    </Description>
                </Sections>
                {/* POSITION */}
                <Sections>
                    {t('PublicProfile.position')}:{' '}
                    <Description>
                        <Input
                            style={{ width: 200 }}
                            placeholder={data?.position}
                        />
                    </Description>
                </Sections>
                {/* EXPERIENCE */}
                <Sections>
                    {t('PublicProfile.experience')}
                    <Description>
                        {t('PublicProfile.company_name')}:{' '}
                        <Input
                            style={{ width: 200 }}
                            placeholder={data?.experiense.companyName}
                        />
                    </Description>
                    <Description>
                        {t('PublicProfile.position')}:{' '}
                        <Input
                            style={{ width: 200 }}
                            placeholder={data?.experiense.position}
                        />
                    </Description>
                    <Description>
                        {t('PublicProfile.period')}:{' '}
                        <Space direction="vertical">
                            <DatePicker
                                placeholder={startExp}
                                onChange={onStartExp}
                            />
                        </Space>{' '}
                        end{' '}
                        <Space direction="vertical">
                            <DatePicker
                                placeholder={endExp}
                                onChange={onEndExp}
                            />
                        </Space>
                    </Description>
                </Sections>
                {/* SKILLS */}
                <Sections>
                    {t('PublicProfile.skills')}:{' '}
                    <Description>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '35%' }}
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
