import React from "react";
import { Button, theme } from "antd";
import { CaretLeft } from "phosphor-react";

const CollapseButton: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Button
      variant="filled"
      icon={<CaretLeft size={16} />}
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
