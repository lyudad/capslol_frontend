import { Button, Form, Input, Row, Tooltip, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import {
  Font,
  FontTitle,
  Hr,
  ProposalCard,
  Section,
  StyledInput,
  StyledTextArea,
  StyledTooltip,
  Wrapper,
} from "./styles";

const SendProposal: React.FC = () => {
  return (
    <Wrapper>
      <ProposalCard>
        <Font fs="22" color="#ffff">
          Terms
        </Font>
        <Section>
          <FontTitle color="#fff" fs="18">
            What is the rate you'd like to bid for this job?
          </FontTitle>

          <Row justify="space-between">
            <FontTitle color="#9aaa97" fs="16">
              Your profile rate: $4.00/hr
            </FontTitle>
            <FontTitle color="#9aaa97" fs="16">
              Client’s budget: $5.00 - $20.00/hr{" "}
            </FontTitle>
          </Row>

          <Row justify="space-between">
            <FontTitle color="#fff" fs="16">
              Hourly Rate
            </FontTitle>
            <Tooltip
              trigger={["focus"]}
              title={"title"}
              placement="topLeft"
              overlayClassName="numeric-input"
            >
              <StyledInput
                // {...this.props}
                // onChange={this.onChange}
                // onBlur={this.onBlur}
                prefix="$"
                suffix="/hr"
                maxLength={25}
              />
            </Tooltip>
          </Row>

          <Hr />

          <Row justify="space-between">
            <FontTitle color="#fff" fs="16">
              20% GetJob Service Fee
            </FontTitle>
            <div></div>
          </Row>

          <Hr />

          <Row justify="space-between">
            <FontTitle color="#fff" fs="16">
              You'll receive
            </FontTitle>
            <Tooltip
              trigger={["focus"]}
              title={"title"}
              placement="topLeft"
              overlayClassName="numeric-input"
            >
              <StyledInput
                // {...this.props}
                // onChange={this.onChange}
                // onBlur={this.onBlur}
                prefix="$"
                suffix="/hr"
                maxLength={25}
              />
            </Tooltip>
          </Row>
        </Section>
      </ProposalCard>
      <ProposalCard>
        <Font fs="22" color="#ffff">
          Letter
        </Font>
        <Section>
          <FontTitle color="#fff" fs="16" mb="15">
            Cover Letter
          </FontTitle>

          <StyledTooltip
            trigger={["focus"]}
            title={"title"}
            placement="topLeft"
            overlayClassName="numeric-input"
          >
            <StyledTextArea
              showCount
              maxLength={100}
              style={{ height: 120 }}
              // onChange={onChange}
            />
          </StyledTooltip>

          <Form.Item
            name="Attachments"
            label="Upload"
            valuePropName="fileList"
            // getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Section>
      </ProposalCard>
    </Wrapper>
  );
};

export default SendProposal;
