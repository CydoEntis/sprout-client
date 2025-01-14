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

export type TaskMember = {
    userId: number;
    username: string;
    role: string;
}

export type Crop = {
    id: number;
    name: string;
    growthLevel: number;
    maxGrowthLevel: number
}

export type PurchasableCrop = {
    cost: number
} & Crop

export type SellableCrop = {
    value: number;
} & Crop;

export type PlantedCrop = {
    x: number;
    y: number;
} & Crop;