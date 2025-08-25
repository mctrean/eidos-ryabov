import React from "react";
import { Breadcrumb, Space, Typography } from "antd";
import type { BreadcrumbProps } from "antd";

const { Title } = Typography;

interface PageHeaderProps {
  title: string;
  extra?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, extra }) => {
  return (
    <Space
      align="center"
      style={{
        paddingBottom: 24,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Space align="center" size="middle">
        <Title level={3} style={{ margin: 0 }}>
          {title}
        </Title>
      </Space>
      {extra}
    </Space>
  );
};

export default PageHeader;
