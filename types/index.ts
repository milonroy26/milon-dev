export interface SafeAdmin {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  techStack: string[];
  keyFeatures?: string[];
  liveLink?: string | null;
  githubLink?: string | null;
  challenges?: string | null;
  futurePlans?: string | null;
  order: number;
}

export type SkillCategory = "FRONTEND" | "BACKEND" | "TOOLS";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  percentage: number;
  icon?: string | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
