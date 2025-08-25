import React from "react";
import { Flex, Menu, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/svg/logo.svg";
import UserProfile from "../UserProfile";
import LanguageSelector from "../LanguageSelector";
import { NAVIGATION_ITEMS } from "../../constants/navigation";
import type { UserProfile as UserProfileType, AppConfig } from "../../types";
import SignOutButton from "../SingOutButton";
import CollapseButton from "../CollapseButton";

const { Text, Title } = Typography;

interface AppSidebarProps {
  user: UserProfileType;
  config: AppConfig;
  collapsed: boolean;
  onLogout?: () => void;
  onLanguageChange?: (language: string) => void;
  onToggleCollapse: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  user,
  config,
  collapsed,
  onLogout,
  onLanguageChange,
  onToggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = NAVIGATION_ITEMS.map((item, index, arr) => ({
    key: item.path,
    label: item.label,
    icon: item.icon,
    style: { marginBottom: index === arr.length - 1 ? 0 : 4 },
  }));

  return (
    <Flex
      vertical
      style={{
        width: "100%",
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        height: "100%",
      }}
    >
      <Flex
        align="center"
        justify="center"
        gap={14}
        style={{
          height: 84,
          position: "relative",
        }}
      >
        { !collapsed && <Logo /> }
        { !collapsed && <Title level={3} style={{ margin: 0 }}>
          Сим Центр
        </Title> }
        <CollapseButton collapsed={collapsed} onToggle={onToggleCollapse} />
      </Flex>
      <Flex
        vertical
        justify="space-between"
        style={{
          height: "calc(100% - 84px)",
          padding: collapsed ? "12px 8px" : "0 12px 18px 12px",
        }}
      >
        <Menu
          inlineIndent={12}
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(String(key))}
          items={menuItems}
          inlineCollapsed={collapsed}
          style={{
            border: "none",
            fontWeight: 800,
          }}
        />

        {!collapsed && <Flex vertical gap={18}>
          <UserProfile user={user} />

          <Flex vertical>
            <SignOutButton onLogout={onLogout!} />

            <LanguageSelector
              language={config.language}
              onChange={onLanguageChange}
            />
          </Flex>

          <Text
            style={{
              fontSize: 12,
              textAlign: "left",
              opacity: 0.6,
            }}
          >
            Версия {config.version}
          </Text>
        </Flex>}
      </Flex>
    </Flex>
  );
};

export default AppSidebar;
