export interface NavigationItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
  initials: string;
}

export interface AppConfig {
  version: string;
  language: string;
}

export * from "./studySessions";
