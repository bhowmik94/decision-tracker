import { Timestamp } from "firebase/firestore";

export type Priority = 'critical' | 'important' | 'moderate' | 'optional';

export interface Decision {
  id: number;
  title: string;
  description: string;
  date: Date | Timestamp; // Using Date or Timestamp for Firestore compatibility
  pros: string[];
  cons: string[];
  priority: Priority;
  riskFactor: number;
  feasibility: number;
}
