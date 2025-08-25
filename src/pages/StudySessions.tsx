import React, { useState, useMemo, useEffect } from "react";
import { Flex, Space, Spin, message, theme } from "antd";
import PageHeader from "../components/PageHeader";
import SessionsControls from "../components/SessionsControls";
import StudySessionsTable from "../components/StudySessionsTable";
import type { StudySession, PaginationInfo, SortDirection } from "../types/studySessions";
import {
  loadAndAdaptSessionsData,
  filterSessionsBySearch,
} from "../utils/sessionDataAdapter";

const StudySessions: React.FC = () => {
  const { token } = theme.useToken();

  const [sessionsData, setSessionsData] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

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

        const sortedData = sortSessionsByTime(adaptedData, "desc");
        setSessionsData(sortedData);
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

  const sortSessionsByTime = (data: StudySession[], direction: SortDirection): StudySession[] => {
    return [...data].sort((a, b) => {
      const timeA = Date.parse(a.startDateTime);
      const timeB = Date.parse(b.startDateTime);

      return direction === "asc" ? timeA - timeB : timeB - timeA;
    });
  };

  const filteredData = useMemo(() => {
    const filtered = searchValue ? filterSessionsBySearch(sessionsData, searchValue) : sessionsData;
    return sortSessionsByTime(filtered, sortDirection);
  }, [sessionsData, searchValue, sortDirection]);

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

  const handleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
  };

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
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </Flex>
  );
};

export default StudySessions;
