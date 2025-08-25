import React, { HTMLAttributes } from "react";
import { Table, Typography, Space, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { CaretDown, CaretUp } from "phosphor-react";
import StatusBadge from "../StatusBadge";
import {
  type StudySession,
  SESSION_TYPE_LABELS,
  type UiSessionType,
  type PaginationInfo,
  type SortDirection,
} from "../../types/studySessions";

const { Text } = Typography;

interface StudySessionsTableProps {
  data: StudySession[];
  loading?: boolean;
  pagination?: PaginationInfo | false;
  onPageChange?: (page: number, pageSize: number) => void;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

const StudySessionsTable: React.FC<StudySessionsTableProps> = ({
  data,
  loading = false,
  pagination,
  onPageChange,
  sortDirection = "desc",
  onSort,
}) => {
  const columns: ColumnsType<StudySession> = [
    {
      title: (
        <Space align="center">
          <Text style={{ fontWeight: 700, fontSize: 17, color: "#2F3144" }}>
            Дата и время
          </Text>
          <Button
            size="large"
            type="text"
            icon={sortDirection === "desc" ? <CaretDown /> : <CaretUp />}
            onClick={onSort}
          />
        </Space>
      ),
      dataIndex: "date",
      key: "datetime",
      width: 206,
      render: (_, record) => (
        <Text style={{ fontSize: 15, color: "#2F3144" }}>
          {record.date}, {record.time}
        </Text>
      ),
    },
    {
      title: (
        <Text style={{ fontWeight: 700, fontSize: 17, color: "#2F3144" }}>
          Статус
        </Text>
      ),
      dataIndex: "status",
      key: "status",
      width: 155,
      render: (status) => <StatusBadge status={status} />,
    },
    {
      title: (
        <Text style={{ fontWeight: 700, fontSize: 17, color: "#2F3144" }}>
          Название учебного модуля
        </Text>
      ),
      dataIndex: "courseName",
      key: "courseName",
      width: 516,
      render: (text) => (
        <Text style={{ fontSize: 15, color: "#2F3144", lineHeight: "24px" }}>
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text style={{ fontWeight: 700, fontSize: 17, color: "#2F3144" }}>
          Тип сессии
        </Text>
      ),
      dataIndex: "sessionType",
      key: "sessionType",
      width: 146,
      render: (type: UiSessionType) => (
        <Text style={{ fontSize: 15, color: "#2F3144" }}>
          {SESSION_TYPE_LABELS[type]}
        </Text>
      ),
    },
    {
      title: (
        <Text style={{ fontWeight: 700, fontSize: 17, color: "#2F3144" }}>
          Комната
        </Text>
      ),
      dataIndex: "rooms",
      key: "rooms",
      width: 312,
      render: (rooms: string[]) => (
        <Text style={{ fontSize: 15, color: "#2F3144", lineHeight: "24px" }}>
          {rooms.join(", ")}
        </Text>
      ),
    },
    {
      title: (
        <Text style={{ fontWeight: 700, fontSize: 17, color: "#2F3144" }}>
          Группа
        </Text>
      ),
      dataIndex: "group",
      key: "group",
      render: (text) => (
        <Text style={{ fontSize: 15, color: "#2F3144" }}>{text}</Text>
      ),
    },
  ];

  const tableProps: TableProps<StudySession> = {
    dataSource: data,
    columns,
    loading,
    bordered: false,
    rowKey: "rowKey",
    pagination: pagination
      ? {
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: onPageChange,
          showSizeChanger: false,
          showQuickJumper: false,
          position: ["bottomLeft"],
        }
      : false,
    rowClassName: (_, index) =>
      index % 2 === 0 ? "table-row-even" : "table-row-odd",
    components: {
      body: {
        row: (props: HTMLAttributes<HTMLTableRowElement>) => (
          <tr {...props} style={{ height: 64, ...props.style }} />
        ),
        cell: (props: any) => {
          const colKey = props["data-col-key"];
          const isCenter = colKey === "datetime" || colKey === "status";
          return (
            <td
              {...props}
              style={{
                padding: "0 8px",
                border: "none",
                textAlign: isCenter ? "center" : "left",
                verticalAlign: "middle",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  textOverflow: "ellipsis",
                  lineHeight: "32px",
                  wordBreak: "break-word",
                }}
              >
                {props.children}
              </div>
            </td>
          );
        },
      },
    },
  };

  return (
    <>
      <div style={{ border: "1px solid #d9d9d9", borderRadius: 12 }}>
        <Table {...tableProps} />
      </div>
      <style>
        {`
        .table-row-even {
          background-color: #ffffff;
        }
        .table-row-odd {
          background-color: #F4F4F4;
        }
        .ant-table-pagination {
          background-color: #F5F7F9;
          padding: 8px 16px;
          margin: 0 !important;
          height: 52px;
        }
        .ant-pagination .ant-pagination-item,
        .ant-pagination .ant-pagination-prev .ant-pagination-item-link,
        .ant-pagination .ant-pagination-next .ant-pagination-item-link {
          border-radius: 6px !important;
        }
      `}
      </style>
    </>
  );
};

export default StudySessionsTable;
