import {
    Button,
    Col,
    Form,
    Input,
    message,
    notification,
    Row,
    Select,
    Slider,
} from 'antd';
import {
    colors,
    englishLevel,
    projectDuration,
    dateFormatForSelect,
} from 'constants/index';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
    useCreateJobMutation,
    useGetCategoriesQuery,
    useGetJobsByOwnerQuery,
    useGetSkillsQuery,
} from 'store/apis/jobs';
import { IJob } from 'store/apis/jobs/jobs.types';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { HideWrapper } from 'components/HideWrapper/styles';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
import { setOwnerJobsLength } from 'store/slices/auth/auth.slice';

import { Title, Wrapper } from './style';

const CreateJobPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const userId = useAppSelector((state) => state.auth.user?.id);
    const { data: ownJobs, isLoading } = useGetJobsByOwnerQuery(userId);
    const { data: categories } = useGetCategoriesQuery();
    const { data: skills } = useGetSkillsQuery();
    const [createJob] = useCreateJobMutation();
    const dispatch = useAppDispatch();

    const onFill = (): void => {
        const templateId = form.getFieldValue('templateId');

        const ownJob = ownJobs?.find((item) => item.id === templateId);

        form.setFieldsValue({
            title: ownJob?.title,
            description: ownJob?.description,
            categoryId: ownJob?.categoryId.id,
            languageLevel: ownJob?.languageLevel,
            projectDuration: ownJob?.projectDuration,
            price: ownJob?.price,
            timeAvailable: ownJob?.timeAvailable,
            skills: ownJob?.skills.map((item) => item.id),
        });
    };

    const onFinish = async (
        value: Omit<IJob, 'id' | 'createdAt'>
    ): Promise<void> => {
        try {
            if (!userId) {
                throw new Error('user must has userId');
            }
            const newJob = await createJob({
                ...value,
                ownerId: userId,
            }).unwrap();

            notification.open({
                message: t('JobPage.jobCreated'),
            });

            dispatch(setOwnerJobsLength(1));

            navigate(Paths.JOB_PAGE, { state: { id: newJob.id } });
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

    const onReset = (): void => {
        form.resetFields();
    };

    return (
        <Row>
            <Col span={24}>
                <Title>{t('JobPage.createJob')}</Title>
            </Col>
            <Col span={24}>
                <Wrapper>
                    <SpinnerWrapper isLoading={isLoading}>
                        <Form
                            form={form}
                            name="basic"
                            onFinish={(values) => onFinish(values)}
                            autoComplete="off"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <HideWrapper showWhen={!!ownJobs?.length}>
                                <Form.Item
                                    label={t('JobPage.chooseJobTemplate')}
                                    name="templateId"
                                    rules={[
                                        {
                                            required: false,
                                            message: t(
                                                'JobPage.categoryPlaceholder'
                                            ),
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder={t(
                                            'JobPage.chooseJobTemplate'
                                        )}
                                        style={{ maxWidth: 400 }}
                                    >
                                        {ownJobs?.map((item) => (
                                            <Select.Option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {`${moment(
                                                    new Date(item.createdAt)
                                                ).format(
                                                    dateFormatForSelect
                                                )}, ${item.title}`}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="button"
                                        onClick={onFill}
                                        style={{
                                            background: `${colors.brandColor}`,
                                            borderColor: `${colors.brandColor}`,
                                        }}
                                    >
                                        {t('JobPage.fillFormBelow')}
                                    </Button>
                                </Form.Item>
                                {/* </Form> */}
                            </HideWrapper>

                            <Form.Item
                                label={t('JobPage.titleName')}
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: t('JobPage.titleInput'),
                                    },
                                ]}
                            >
                                <Input style={{ maxWidth: 400 }} />
                            </Form.Item>

                            <Form.Item
                                label={t('JobPage.descriptionName')}
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: t('JobPage.descriptionInput'),
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                    style={{ maxWidth: 400 }}
                                />
                            </Form.Item>

                            <Form.Item
                                label={t('JobPage.categoryLabel')}
                                name="categoryId"
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'JobPage.categoryPlaceholder'
                                        ),
                                    },
                                ]}
                            >
                                <Select
                                    placeholder={t(
                                        'JobPage.categoryPlaceholder'
                                    )}
                                    style={{ width: 300 }}
                                >
                                    {categories?.map((category) => (
                                        <Select.Option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.categoryName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label={t('JobPage.englisLabel')}
                                name="languageLevel"
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'JobPage.englishPlaceholder'
                                        ),
                                    },
                                ]}
                            >
                                <Select
                                    placeholder={t(
                                        'JobPage.englishPlaceholder'
                                    )}
                                    style={{ width: 300 }}
                                >
                                    {englishLevel?.map((englishName) => (
                                        <Select.Option
                                            key={englishName}
                                            value={englishName}
                                        >
                                            {englishName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label={t('JobPage.projectDurationLabel')}
                                name="projectDuration"
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'JobPage.projectDurationPlaceholder'
                                        ),
                                    },
                                ]}
                            >
                                <Select
                                    placeholder={t(
                                        'JobPage.projectDurationPlaceholder'
                                    )}
                                    style={{ width: 300 }}
                                >
                                    {projectDuration?.map((durationName) => (
                                        <Select.Option
                                            key={durationName}
                                            value={durationName}
                                        >
                                            {durationName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label={t('JobPage.HourlyRate')}
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: t('JobPage.setPrice'),
                                    },
                                ]}
                            >
                                <Slider
                                    min={0}
                                    step={1}
                                    max={50}
                                    tipFormatter={(priceFormat) =>
                                        `${priceFormat} $`
                                    }
                                    style={{ maxWidth: 400 }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="timeAvailable"
                                label={t('JobPage.timeAvailableLabel')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('JobPage.setTime'),
                                    },
                                ]}
                            >
                                <Slider
                                    min={1}
                                    max={12}
                                    tipFormatter={(hourFormat) =>
                                        hourFormat === 1
                                            ? `${hourFormat} Hour`
                                            : `${hourFormat} Hours`
                                    }
                                    style={{ maxWidth: 400 }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t('JobPage.skillsLabel')}
                                name="skills"
                                rules={[
                                    {
                                        required: true,
                                        message: t('JobPage.skillPlaceholder'),
                                    },
                                ]}
                            >
                                <Select
                                    placeholder={t('JobPage.skillPlaceholder')}
                                    style={{ width: 300 }}
                                    mode="multiple"
                                >
                                    {skills?.map((skill) => (
                                        <Select.Option
                                            key={skill.id}
                                            value={skill.id}
                                        >
                                            {skill.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        background: `${colors.brandColor}`,
                                        borderColor: `${colors.brandColor}`,
                                    }}
                                >
                                    Create Job
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="button"
                                    onClick={onReset}
                                    style={{
                                        marginLeft: 24,
                                        background: `${colors.brandColor}`,
                                        borderColor: `${colors.brandColor}`,
                                    }}
                                >
                                    Reset
                                </Button>
                            </Form.Item>
                        </Form>
                    </SpinnerWrapper>
                </Wrapper>
            </Col>
        </Row>
    );
};

export default CreateJobPage;
