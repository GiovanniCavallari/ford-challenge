export interface IAlert {
  id: number;
  date: string;
  title: string;
  sensor: string;
  opened: boolean;
  translation: string;
  description: string;
  solutions: string[];
  carChassis: number;
}
