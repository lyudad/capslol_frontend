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
import { colors, englishLevel, projectDuration } from 'constants/index';
import { useAppSelector } from 'hooks/redux';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
    useCreateJobMutation,
    useGetCategoriesQuery,
    useGetSkillsQuery,
} from 'store/apis/jobs';
import { IJob } from 'store/apis/jobs/jobs.types';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'router/paths';
import { Title, Wrapper } from './style';

const CreateJobPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const userId = useAppSelector((state) => state.auth.user?.id);

    const { data: categories } = useGetCategoriesQuery();
    const { data: skills } = useGetSkillsQuery();
    const [createJob] = useCreateJobMutation();

    const onFinish = async (
        value: Omit<IJob, 'id' | 'createdAt'>
    ): Promise<void> => {
        try {
            if (!userId) {
                throw new Error('user must has userId');
            }
            await createJob({
                ...value,
                ownerId: userId,
            }).unwrap();

            notification.open({
                message: t('JobPage.jobCreated'),
            });

            navigate(Paths.JOBS);
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
        <Row>
            <Col span={24}>
                <Title> Create a job</Title>
            </Col>
            <Col span={24}>
                <Wrapper>
                    <Form
                        form={form}
                        name="basic"
                        onFinish={(values) => onFinish(values)}
                        autoComplete="off"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                    >
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
                            <Input />
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
                            />
                        </Form.Item>

                        <Form.Item
                            label={t('JobPage.categoryLabel')}
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: t('JobPage.categoryPlaceholder'),
                                },
                            ]}
                        >
                            <Select
                                placeholder={t('JobPage.categoryPlaceholder')}
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
                                    message: t('JobPage.englishPlaceholder'),
                                },
                            ]}
                        >
                            <Select
                                placeholder={t('JobPage.englishPlaceholder')}
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
                            label={t('JobPage.priceLabel')}
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: t('JobPage.setPrice'),
                                },
                            ]}
                        >
                            <Slider
                                min={10}
                                step={10}
                                max={100}
                                tipFormatter={(priceFormat) =>
                                    `${priceFormat} $`
                                }
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
                        </Form.Item>
                    </Form>
                </Wrapper>
            </Col>
        </Row>
    );
};

export default CreateJobPage;
