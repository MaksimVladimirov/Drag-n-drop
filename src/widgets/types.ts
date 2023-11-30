export type Id = string | number;

export type Column = {
  status: string
};

export type Task = {
  id: Id;
  taskStatus: Id;
  content: string;
};
