export enum DiffKeys {
  create,
  update,
  remove,
};

export interface Action {
  type: DiffKeys;
  key: string;
  value: any;
}