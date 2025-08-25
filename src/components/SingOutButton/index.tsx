import React from "react";
import { Button } from "antd";
import { SignOut } from "phosphor-react";

interface SignOutButtonProps {
  onLogout: () => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ onLogout }) => {
  return (
    <Button
      type="text"
      icon={<SignOut size={24} />}
      onClick={onLogout}
      style={{
        justifyContent: "flex-start",
        padding: "24px 12px",
        borderRadius: 12,
      }}
    >
      Выйти
    </Button>
  );
};

export default SignOutButton;
