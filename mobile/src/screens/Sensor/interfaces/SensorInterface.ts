export interface ISensor {
  name: string;
  value: number | boolean;
  configurations: {
    id: number;
    name: string;
    active: boolean;
    value: string;
    type: string;
    message: string;
    unit: string;
    direction: string;
  };
}
