export interface Decision {
  id: number;
  title: string;
  description: string;
  date: Date;
  pros: string[];
  cons: string[];
  rating: number;
  riskFactor: number;
  feasibility: number;
}
