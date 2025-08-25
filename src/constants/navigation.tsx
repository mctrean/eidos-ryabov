import {
  CalendarBlank,
  Door,
  Gear,
  GraduationCap,
  Student,
  UserList,
  VideoCamera,
  ArchiveBox,
} from "phosphor-react";
import type { NavigationItem } from "../types";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    key: "schedule",
    label: "Расписание",
    icon: <CalendarBlank size={24} />,
    path: "/schedule",
  },
  {
    key: "study-sessions",
    label: "Учебные сессии",
    icon: <GraduationCap size={24} />,
    path: "/study-sessions",
  },
  {
    key: "room-list",
    label: "Список комнат",
    icon: <Door size={24} />,
    path: "/room-list",
  },
  {
    key: "users",
    label: "Пользователи",
    icon: <Student size={24} />,
    path: "/users",
  },
  {
    key: "study-groups",
    label: "Учебные группы",
    icon: <UserList size={24} />,
    path: "/study-groups",
  },
  {
    key: "device-list",
    label: "Список устройств",
    icon: <VideoCamera size={24} />,
    path: "/device-list",
  },
  {
    key: "system-settings",
    label: "Настройки системы",
    icon: <Gear size={24} />,
    path: "/system-settings",
  },
  {
    key: "archive",
    label: "Архив",
    icon: <ArchiveBox size={24} />,
    path: "/archive",
  },
];
