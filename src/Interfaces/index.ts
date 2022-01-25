
export interface InputInterface {
  id: number;
  type: string;
  label: string;
  value: string | number | boolean;
  options: null | Array<any>
};