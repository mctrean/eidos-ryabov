import React from "react";
import { Button, Flex, Typography } from "antd";
import { CaretDown } from "phosphor-react";
import Flag from "../../assets/svg/flag.svg";

const { Text } = Typography;

interface LanguageSelectorProps {
  language: string;
  onChange?: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language }) => {
  return (
    <Button
      style={{
        padding: "24px 12px",
        borderRadius: 12,
        background: "transparent",
      }}
    >
      <Flex align="center" gap={12} style={{ width: "100%" }}>
        <Flag />
        <Text>{language}</Text>
        <CaretDown style={{ marginLeft: "auto" }} size={24} />
      </Flex>
    </Button>
  );
};

export default LanguageSelector;
