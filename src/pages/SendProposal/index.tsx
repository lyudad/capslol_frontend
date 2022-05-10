import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  Block,
  Font,
  FontTitle,
  Hr,
  ProposalCard,
  Section,
  StyledButton,
  StyledInput,
  StyledTextArea,
  UploadForm,
  Wrapper,
  FormItem,
} from "./styles";
import { colors } from "constants/index";

const SendProposal: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <FontTitle color={colors.textWhite} fs="30" mb="30">
        {t("Proposal.title")}
      </FontTitle>

      <Form>
        <ProposalCard>
          <Font color={colors.textWhite} fs="22">
            {t("Proposal.subTitle")}
          </Font>
          <Section>
            <FontTitle color={colors.textWhite} fs="18">
              {t("Proposal.jobQuestion")}
            </FontTitle>

            <Row justify="space-between">
              <FontTitle color={colors.textGrey} fs="16">
                {t("Proposal.youRate")}
              </FontTitle>
              <FontTitle color={colors.textGrey} fs="16">
                {t("Proposal.jobOwnerRate")}
              </FontTitle>
            </Row>

            <Row justify="space-between">
              <FontTitle color={colors.textWhite} fs="16">
                {t("Proposal.hourlyRate")}
              </FontTitle>
              <FormItem
                label=""
                name="jobOwnerValue"
                rules={[
                  {
                    pattern: /^(?:\d*)$/,
                    message: `${t("Proposal.error.number")}`,
                  },
                  {
                    pattern: /^[\d]{0,50}$/,
                    message: `${t("Proposal.error.length")}`,
                  },
                ]}
                validateTrigger="onBlur"
              >
                <StyledInput
                  // {...this.props}
                  // onChange={this.onChange}
                  // onBlur={this.onBlur}
                  prefix="$"
                  suffix="/hr"
                  maxLength={4}
                />
              </FormItem>
            </Row>

            <Hr />

            <Row justify="space-between">
              <FontTitle color={colors.textWhite} fs="16">
                {t("Proposal.getJobRate")}
              </FontTitle>
              <div></div>
            </Row>

            <Hr />

            <Row justify="space-between">
              <FontTitle color={colors.textWhite} fs="16">
                {t("Proposal.gotRate")}
              </FontTitle>
              <FormItem
                label=""
                name="freelancerValue"
                rules={[
                  {
                    pattern: /^(?:\d*)$/,
                    message: `${t("Proposal.error.number")}`,
                  },
                  {
                    pattern: /^[\d]{0,50}$/,
                    message: `${t("Proposal.error.length")}`,
                  },
                ]}
                validateTrigger="onBlur"
              >
                <StyledInput
                  // {...this.props}
                  // onChange={this.onChange}
                  // onBlur={this.onBlur}
                  prefix="$"
                  suffix="/hr"
                  maxLength={4}
                />
              </FormItem>
            </Row>
          </Section>
        </ProposalCard>
        <ProposalCard>
          <Font fs="22" color={colors.textWhite}>
            {t("Proposal.letterTitle")}
          </Font>
          <Section>
            <Block>
              <FontTitle color={colors.textWhite} fs="16" mb="15">
                {t("Proposal.coverLetterTitle")}
              </FontTitle>

              <StyledTextArea
                maxLength={500}
                style={{ height: 150 }}
                // onChange={onChange}
              />
            </Block>

            <Block>
              <FontTitle color={colors.textWhite} fs="16" mb="15">
                {t("Proposal.uploadTitle")}
              </FontTitle>

              <UploadForm
                name="Attachments"
                valuePropName="fileList"
                // getValueFromEvent={normFile}
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>
                    {t("Proposal.uploadBtnText")}
                  </Button>
                </Upload>
              </UploadForm>
            </Block>
          </Section>
        </ProposalCard>
      </Form>

      <StyledButton>{t("Proposal.submitBtnText")}</StyledButton>
    </Wrapper>
  );
};

export default SendProposal;
