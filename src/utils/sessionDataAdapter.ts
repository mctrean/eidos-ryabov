import {
  type ApiSession,
  type ApiSessionsResponse,
  type StudySession,
  STATUS_API_TO_UI_MAP,
  TYPE_API_TO_UI_MAP,
} from "../types/studySessions";

const loadSessionsData = async (): Promise<ApiSession[]> => {
  try {
    const response = await fetch("/data1.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiSessionsResponse = await response.json();
    return data.sessions || [];
  } catch (error) {
    console.error("Ошибка при загрузке данных сессий:", error);
    return [];
  }
};

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const formatTimeRange = (start: string, end: string): string => {
  return `${formatTime(start)} - ${formatTime(end)}`;
};

const getRoomNames = (rooms: ApiSession["rooms"]): string[] => {
  return rooms
    .filter((room) => room.is_active && room.name)
    .map((room) => room.name);
};

const getGroupNames = (groups: ApiSession["groups"]): string => {
  const activeGroups = groups
    .filter((group) => group.is_active && group.name)
    .map((group) => group.name);

  return activeGroups.length > 0 ? activeGroups.join(", ") : "Без группы";
};

const adaptApiSessionToStudySession = (
  apiSession: ApiSession,
): StudySession => {
  const date = formatDate(apiSession.start);
  const time = formatTimeRange(apiSession.start, apiSession.end);
  const rooms = getRoomNames(apiSession.rooms);
  const group = getGroupNames(apiSession.groups);

  const uiStatus = STATUS_API_TO_UI_MAP[apiSession.status.name] || "scheduled";
  const uiType = TYPE_API_TO_UI_MAP[apiSession.type.name] || "lesson";

  return {
    id: apiSession.id.toString(),
    date,
    time,
    status: uiStatus,
    courseName: apiSession.module || "Не указано",
    sessionType: uiType,
    rooms,
    group,
    startDateTime: apiSession.start, // Сохраняем исходную ISO строку для сортировки
  };
};

const adaptApiSessionsToStudySessions = (
  apiSessions: ApiSession[],
): StudySession[] => {
  return apiSessions.map(adaptApiSessionToStudySession);
};

export const loadAndAdaptSessionsData = async (): Promise<StudySession[]> => {
  const apiSessions = await loadSessionsData();
  return adaptApiSessionsToStudySessions(apiSessions);
};

export const filterSessionsBySearch = (
  sessions: StudySession[],
  searchQuery: string,
): StudySession[] => {
  if (!searchQuery.trim()) {
    return sessions;
  }

  const query = searchQuery.toLowerCase();
  return sessions.filter((session) =>
    session.courseName.toLowerCase().includes(query),
  );
};
