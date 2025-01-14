export type TaskList = {
  name: string;
  description: string;
  tasks: Task[];
  totalTasks: number;
  compeledTasks: number;
  startDate: Date;
  endDate: Date;
  crop: Crop
};

export type TaskStats = {
  totalTasks: number;
  completedTasks: number;
}

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
    imageUrl: string;
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