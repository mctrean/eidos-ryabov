import React from "react";
import { Avatar, Flex, Typography } from "antd";
import type { UserProfile as UserProfileType } from "../../types";

const { Text } = Typography;

interface UserProfileProps {
  user: UserProfileType;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        padding: 12,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.12)',
      }}
    >
      <Flex vertical>
        <Text style={{ fontWeight: 800 }}>{user.name}</Text>
        <Text type="secondary" style={{ fontWeight: 500 }}>
          {user.role}
        </Text>
      </Flex>
      <Avatar size={48} style={{ background: '#2B4EC5' }}>
        {user.initials}
      </Avatar>
    </Flex>
  );
};

export default UserProfile;
