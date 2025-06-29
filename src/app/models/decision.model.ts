import { Timestamp } from "firebase/firestore";

export type Priority = 'critical' | 'important' | 'moderate' | 'optional';

export interface Decision {
  id: string; // Unique identifier for the decision
  title: string;
  description: string;
  date: Date | Timestamp; // Using Date or Timestamp for Firestore compatibility
  pros: string[];
  cons: string[];
  priority: Priority;
  riskFactor: number;
  feasibility: number;
}
