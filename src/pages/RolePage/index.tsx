import * as React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, IdcardOutlined } from "@ant-design/icons";
import { Col, Row, Tag } from "antd";
import { useLazySelectRoleQuery } from "store/apis/auth";

const RolePage: React.FC = () => {
  const [fetchRole] = useLazySelectRoleQuery();

  return (
    <Row justify="space-between">
      <Col span={24}>
        <h1 style={{ color: "#fff" }}>Choose role:</h1>
      </Col>
      <Row>
        <Tag icon={<UserOutlined />} onClick={() => fetchRole(0)}>
          Freelancer
        </Tag>
        <Tag icon={<IdcardOutlined />} onClick={() => fetchRole(0)}>
          Freelancer
        </Tag>
      </Row>
      <Col span={24}>
        <Link to="/">Go home</Link>
      </Col>
    </Row>
  );
};

export default RolePage;
