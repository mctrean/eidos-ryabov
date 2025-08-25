type SessionStatusName = "planned" | "completed" | "canceled";
type SessionTypeName = "accreditation" | "lesson" | "examination";

interface User {
  id: number;
  login: string;
  name: string;
  email: string;
  is_active?: boolean;
  role?: {
    id: number;
    name: string;
  };
  groups?: Group[];
}

interface Group {
  id: number;
  users: User[];
  teacher: User;
  name: string;
  speciality: string;
  is_active: boolean;
}

interface Room {
  id: number;
  name: string;
  devices: any[];
  responsible: User | null;
  description: string;
  address: string;
  is_active: boolean;
}

interface SessionType {
  id: number;
  name: SessionTypeName;
}

interface SessionStatus {
  id: number;
  name: SessionStatusName;
}

export interface ApiSession {
  id: number;
  rooms: Room[];
  groups: Group[];
  users: User[];
  type: SessionType;
  status: SessionStatus;
  module: string;
  start: string;
  end: string;
}

export interface ApiSessionsResponse {
  sessions: ApiSession[];
}

export type UiSessionStatus =
  | "scheduled"
  | "ongoing"
  | "completed"
  | "canceled";
export type UiSessionType = "lesson" | "exam" | "accreditation";

export interface StudySession {
  id: string;
  date: string;
  time: string;
  status: UiSessionStatus;
  courseName: string;
  sessionType: UiSessionType;
  rooms: string[];
  group: string;
}

export interface PaginationInfo {
  current: number;
  pageSize: number;
  total: number;
}

export const SESSION_STATUS_CONFIG = {
  scheduled: {
    label: "Запланировано",
    color: "#AFBFF5",
  },
  ongoing: {
    label: "Идет",
    color: "#FFDAA1",
  },
  completed: {
    label: "Завершено",
    color: "#91C893",
  },
  canceled: {
    label: "Отменено",
    color: "#FFB4A1",
  },
} as const;

export const SESSION_TYPE_LABELS = {
  lesson: "Урок",
  exam: "Экзамен",
  accreditation: "Аккредитация",
} as const;

export const STATUS_API_TO_UI_MAP: Record<SessionStatusName, UiSessionStatus> = {
  planned: "scheduled",
  completed: "completed",
  canceled: "canceled",
};

export const TYPE_API_TO_UI_MAP: Record<SessionTypeName, UiSessionType> = {
  lesson: "lesson",
  examination: "exam",
  accreditation: "accreditation",
};
