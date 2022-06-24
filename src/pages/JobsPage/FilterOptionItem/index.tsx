import { Form, Select } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledFilter, FilterTitle } from '../Filters/styles';

type List = {
    id: number;
    name: string;
};

interface IFilterOptionItemProps {
    titleMessage: string;
    placeholder: string;
    name: string;
    lists: List[] | undefined;
    mode?: 'tags' | 'multiple';
    useNameValue?: boolean;
}

const FilterOptionItem: React.FC<IFilterOptionItemProps> = ({
    titleMessage,
    placeholder,
    name,
    lists,
    mode,
    useNameValue,
}) => {
    const { t } = useTranslation();
    return (
        <StyledFilter>
            <FilterTitle>{t(titleMessage)}</FilterTitle>
            <Form.Item name={name} noStyle>
                <Select
                    mode={mode}
                    placeholder={placeholder}
                    style={{ width: 300 }}
                >
                    {lists?.map((list: List) => (
                        <Select.Option
                            key={list.id}
                            value={useNameValue ? list.name : list.id}
                        >
                            {list.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </StyledFilter>
    );
};

export default FilterOptionItem;
