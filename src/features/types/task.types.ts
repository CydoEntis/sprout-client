export type TaskList = {
  name: string;
  //   description: string;
  tasks: Task[];
  taskStats: TaskStats;
  startDate: Date;
  endDate: Date;
  members: TaskMember[];
  crop: Crop;
};

export type TaskStats = {
  totalTasks: number;
  completedTasks: number;
};

export type Task = {
  id: number;
  description: string;
  isCompleted: boolean;
};

export type TaskMember = {
  id: number;
  username: string;
//   role: string;
};

export type Crop = {
  id: number;
  name: string;
  growthLevel: number;
  maxGrowthLevel: number;
  imageUrl: string;
};

export type PurchasableCrop = {
  cost: number;
} & Crop;

export type SellableCrop = {
  value: number;
} & Crop;

export type PlantedCrop = {
  x: number;
  y: number;
} & Crop;
