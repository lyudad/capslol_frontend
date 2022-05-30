import { Button, Col, Form, Input, Row, Select, Slider } from 'antd';
import { colors, englishLevel, projectDuration } from 'constants/index';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery, useGetSkillsQuery } from 'store/apis/jobs';
import { Title, Wrapper } from './style';

const CreateJobPage: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const { data: categories } = useGetCategoriesQuery();
    const { data: skills } = useGetSkillsQuery();

    function onFinish(value: string): void {
        console.log('success', value);
    }

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
                            name="category"
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
                            name="english"
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
                            name="duration"
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
                            name="time"
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
                                max={24}
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
