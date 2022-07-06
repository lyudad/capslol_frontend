import React from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { validateEntryNumber } from 'constants/validate';
import { FormItem } from '../styles';
import { IValidateInputProps } from '../interfaces';

const ValidateInput: React.FC<IValidateInputProps> = ({
    propsValue,
    onChange,
    width,
    propsDefaultValue,
}) => {
    const { t } = useTranslation();

    return (
        <FormItem
            label=""
            name="hourRate"
            style={{ width: `${width}%` }}
            rules={[
                {
                    required: true,
                    message: `${t('Proposal.errorRate')}`,
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value) {
                            return Promise.reject(
                                new Error(t('Proposal.amountError'))
                            );
                        }

                        const matched =
                            getFieldValue('hourRate').match(
                                validateEntryNumber
                            );
                        if (!matched) {
                            return Promise.reject(
                                new Error(t('Proposal.amountError'))
                            );
                        }
                        return Promise.resolve();
                    },
                }),
            ]}
        >
            <Input
                value={propsValue}
                prefix="$"
                defaultValue={propsDefaultValue}
                placeholder={t('Proposal.amountPlaceholder')}
                maxLength={2}
                onChange={onChange}
                min={1}
                max={50}
            />
        </FormItem>
    );
};

export default ValidateInput;
