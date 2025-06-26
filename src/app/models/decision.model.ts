export interface Decision {
  id: number;
  title: string;
  description: string;
  date: Date;
  pros: string[];
  cons: string[];
  priority: string;
  riskFactor: number;
  feasibility: number;
}
