import React from "react";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Funnel, FunnelSimple } from "phosphor-react";

interface SessionsControlsProps {
  searchValue?: string;
  onSearch?: (value: string) => void;
}

const SessionsControls: React.FC<SessionsControlsProps> = ({
  searchValue,
  onSearch,
}) => {
  return (
    <Space size={14} style={{ width: "100%", justifyContent: "flex-end" }}>
      <Input
        placeholder="Поиск"
        value={searchValue}
        onChange={(e) => onSearch?.(e.target.value)}
        style={{
          width: 260,
          height: 44,
          borderRadius: 12,
          border: "1px solid #E0E0E0",
          padding: "0 16px 0 8px",
          fontSize: 13,
          fontFamily: "Manrope",
        }}
        prefix={<SearchOutlined style={{ color: "#999999" }} />}
      />

      <Button
        style={{ border: 0 }}
        size="large"
        type="default"
        icon={<Funnel />}
      />
      <Button
        style={{ border: 0 }}
        size="large"
        type="default"
        icon={<FunnelSimple />}
      />
      <Button size="large" type="primary">
        Создать
      </Button>
    </Space>
  );
};

export default SessionsControls;
