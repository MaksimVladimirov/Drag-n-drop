export type Id = string | number;

export type Column = {
  status: string;
};

export type Task = {
  id: Id;
  taskStatus: string;
  content: string;
  userName: string
};
