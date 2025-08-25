import React from "react";
import { Button, theme } from "antd";
import { CaretLeft, CaretRight } from "phosphor-react";

interface CollapseButtonProps {
  collapsed: boolean;
  onToggle: () => void;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({ collapsed, onToggle }) => {
  const { token } = theme.useToken();

  return (
    <Button
      onClick={onToggle}
      icon={collapsed ? <CaretRight size={16} /> : <CaretLeft size={16} />}
      shape="circle"
      size="small"
      style={{
        position: "absolute",
        right: -12,
        color: token.colorBgContainer,
        backgroundColor: token.colorText,
      }}
    />
  );
};

export default CollapseButton;
