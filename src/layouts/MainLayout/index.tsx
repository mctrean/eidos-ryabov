import React from "react";
import { ConfigProvider, Layout } from "antd";
import AppSidebar from "../../components/AppSidebar";
import type { UserProfile, AppConfig } from "../../types";
import { antdTheme } from "../../theme";

const { Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  user: UserProfile;
  config: AppConfig;
  onLogout?: () => void;
  onLanguageChange?: (language: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  user,
  config,
  onLogout,
  onLanguageChange,
}) => {
  return (
    <ConfigProvider theme={antdTheme}>
      <Layout style={{height: 940, width: 1920}}>
        <Sider width={274} theme="light">
          <AppSidebar
            user={user}
            config={config}
            onLogout={onLogout}
            onLanguageChange={onLanguageChange}
          />
        </Sider>
        <Layout>
          <Content style={{padding: 8}}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
