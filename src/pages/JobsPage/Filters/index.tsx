import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery, useGetSkillsQuery } from 'store/apis/jobs';
import { Form, Button, Input } from 'antd';
import { colors, langLevel } from 'constants/index';
import { IQueryFilters } from './props';
import {
    Title,
    StyledSlider,
    FilterTitle,
    StyledFilter,
    PriceValue,
    ButtonsItem,
} from './styles';
import 'antd/dist/antd.min.css';
import FilterOptionItem from '../FilterOptionItem';

interface FiltersPropsInterface {
    submitHandler: (value: IQueryFilters) => void;
    salaryLimit?: number;
    timeLimit?: number;
}

const Filters: React.FC<FiltersPropsInterface> = ({
    submitHandler,
    salaryLimit = 50,
    timeLimit = 12,
}) => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [maxSalary, setMaxSalary] = useState<number | null>(0);
    const [timeAvailable, setTimeAvailable] = useState<number | null>(0);

    const { data: categories } = useGetCategoriesQuery();
    const listOfCategories = categories?.map((category) => ({
        id: category.id,
        name: category.categoryName,
    }));

    const { data: listOfskills } = useGetSkillsQuery();
    const listOfEnglishLevels = langLevel.map((level, index) => ({
        id: index,
        name: level,
    }));

    const resetHandler = (): void => {
        form.resetFields();
    };

    const changeHandler = (value: IQueryFilters): void => {
        if (value.maxSalary) {
            setMaxSalary(value.maxSalary);
        }

        if (value.timeAvailable) {
            setTimeAvailable(value.timeAvailable);
        }
    };
    return (
        <>
            <Title>{t('JobPage.filters')}</Title>
            <Form
                form={form}
                name="basic"
                onFinish={submitHandler}
                onValuesChange={changeHandler}
            >
                <StyledFilter>
                    <FilterTitle>{t('JobPage.search')}</FilterTitle>
                    <Form.Item
                        name="query"
                        style={{
                            marginBottom: '0px',
                        }}
                    >
                        <Input
                            placeholder="Please enter"
                            style={{ width: 300 }}
                        />
                    </Form.Item>
                </StyledFilter>

                <FilterOptionItem
                    titleMessage="JobPage.Category"
                    placeholder="Select category"
                    name="categoryId"
                    lists={listOfCategories}
                />

                <FilterOptionItem
                    titleMessage="JobPage.englishLevel"
                    placeholder="Select level"
                    name="englishLevel"
                    useNameValue
                    lists={listOfEnglishLevels}
                />

                <FilterOptionItem
                    titleMessage="JobPage.Skills"
                    placeholder="Select skills"
                    name="skillIds"
                    mode="multiple"
                    lists={listOfskills}
                />

                <StyledFilter>
                    <FilterTitle>{t('JobPage.HourlyRate')}</FilterTitle>
                    <PriceValue>
                        <span>min: 1$</span>
                        <span>current: {maxSalary}$</span>
                    </PriceValue>
                    <Form.Item name="maxSalary" noStyle>
                        <StyledSlider step={1} min={1} max={salaryLimit} />
                    </Form.Item>
                </StyledFilter>

                <StyledFilter>
                    <FilterTitle>{t('JobPage.TimeAvailable')}</FilterTitle>
                    <PriceValue>
                        <span> </span>
                        <span>
                            time: {timeAvailable ? `${timeAvailable}` : 0} h/day
                        </span>
                    </PriceValue>
                    <Form.Item name="timeAvailable" noStyle>
                        <StyledSlider step={1} min={1} max={timeLimit} />
                    </Form.Item>
                </StyledFilter>

                <ButtonsItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: 80,
                            background: `${colors.brandColor}`,
                            borderColor: `${colors.brandColor}`,
                            marginTop: '12px',
                        }}
                    >
                        {t('JobPage.submit')}
                    </Button>
                    <Button
                        type="primary"
                        htmlType="button"
                        onClick={resetHandler}
                        style={{
                            width: 80,
                            background: `${colors.brandColor}`,
                            borderColor: `${colors.brandColor}`,
                            marginTop: '12px',
                        }}
                    >
                        Reset
                    </Button>
                </ButtonsItem>
            </Form>
        </>
    );
};

export default Filters;
