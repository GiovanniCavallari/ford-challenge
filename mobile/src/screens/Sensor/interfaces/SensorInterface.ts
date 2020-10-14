export interface ISensor {
  name: string;
  translation: string;
  value: number | boolean;
  configurations: {
    id: number;
    name: string;
    active: boolean;
    value: string;
    type: string;
    message: string;
    unit: string | null;
    direction: string | null;
    min: number;
    max: number;
  };
}
