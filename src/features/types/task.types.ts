export type TaskList = {
  name: string;
  description: string;
  tasks: Task[];
  totalTasks: number;
  compeledTasks: number;
};

export type Task = {
  description: string;
  isCompleted: boolean;
};
