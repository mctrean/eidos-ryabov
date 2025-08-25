import React, { useState, useMemo, useEffect } from "react";
import { Flex, Space, Spin, message, theme } from "antd";
import PageHeader from "../components/PageHeader";
import SessionsControls from "../components/SessionsControls";
import StudySessionsTable from "../components/StudySessionsTable";
import type { StudySession, PaginationInfo } from "../types/studySessions";
import {
  loadAndAdaptSessionsData,
  filterSessionsBySearch,
} from "../utils/sessionDataAdapter";

const StudySessions: React.FC = () => {
  const { token } = theme.useToken();

  const [sessionsData, setSessionsData] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const [pagination, setPagination] = useState<PaginationInfo>({
    current: 1,
    pageSize: 11,
    total: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadAndAdaptSessionsData();

        const adaptedData = data.map((s, index) => ({
          ...s,
          rowKey: `${s.id ?? "session"}-${index}`,
        }));

        setSessionsData(adaptedData);
        setPagination((prev) => ({ ...prev, total: adaptedData.length }));
      } catch (error) {
        console.error(error);
        message.error("Не удалось загрузить данные сессий");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchValue) return sessionsData;
    return filterSessionsBySearch(sessionsData, searchValue);
  }, [sessionsData, searchValue]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredData.length,
      current: 1,
    }));
  }, [filteredData.length]);

  const handleSearch = (value: string) => setSearchValue(value);

  const handlePageChange = (page: number, pageSize: number) =>
    setPagination((prev) => ({ ...prev, current: page, pageSize }));

  if (loading) {
    return (
      <Space direction="vertical" size={24} style={{ width: "100%" }}>
        <PageHeader title="Учебные сессии" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 400,
          }}
        >
          <Spin size="large" />
        </div>
      </Space>
    );
  }

  return (
    <Flex
      vertical
      justify="flex-start"
      align="flex"
      style={{
        height: 940,
        width: 1630,
        background: token.colorBgContainer,
        borderRadius: 12,
        padding: 24,
      }}
    >
      <PageHeader
        title="Учебные сессии"
        extra={
          <SessionsControls searchValue={searchValue} onSearch={handleSearch} />
        }
      />
      <StudySessionsTable
        data={filteredData}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </Flex>
  );
};

export default StudySessions;
