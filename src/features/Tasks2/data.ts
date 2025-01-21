export const taskLists = [
  {
    id: 1,
    name: "Work",
    tasks: [
      { id: 1, description: "Finish the presentation", isCompleted: false },
      { id: 2, description: "Submit the report", isCompleted: true },
      { id: 3, description: "Call the client", isCompleted: false },
    ],
    taskStats: {
      totalTasks: 3,
      completedTasks: 2,
    },
    startDate: new Date("2025-01-14T09:00:00"),
    endDate: new Date("2025-01-14T17:00:00"),
    members: [
      { id: 1, username: "John Doe" },
      { id: 2, username: "Jane Doe" },
    ],
    crop: {
      id: 1,
      name: "Tomato",
      growthLevel: 5,
      maxGrowthLevel: 10,
      imageUrl: "placeholder.af",
    },
  },
  {
    id: 2,
    name: "Personal",
    tasks: [
      { id: 1, description: "Buy groceries", isCompleted: false },
      { id: 2, description: "Pick up dry cleaning", isCompleted: true },
    ],
    taskStats: {
      totalTasks: 2,
      completedTasks: 1,
    },
    startDate: new Date("2025-01-15T10:00:00"),
    endDate: new Date("2025-01-15T15:00:00"),
    members: [{ id: 1, username: "John Doe" }],
    crop: {
      id: 2,
      name: "Lettuce",
      growthLevel: 3,
      maxGrowthLevel: 7,
      imageUrl: "placeholder.af",
    },
  },
  {
    id: 3,
    name: "Fitness",
    tasks: [
      { id: 1, description: "Morning yoga session", isCompleted: true },
      { id: 2, description: "Run 5 kilometers", isCompleted: true },
      { id: 3, description: "Strength training", isCompleted: false },
    ],
    taskStats: {
      totalTasks: 3,
      completedTasks: 2,
    },
    startDate: new Date("2025-01-16T06:30:00"),
    endDate: new Date("2025-01-16T08:30:00"),
    members: [{ id: 1, username: "Jane Doe" }],
    crop: {
      id: 3,
      name: "Carrot",
      growthLevel: 2,
      maxGrowthLevel: 5,
      imageUrl: "placeholder.af",
    },
  },
  {
    id: 4,
    name: "Hobbies",
    tasks: [
      { id: 1, description: "Complete the painting", isCompleted: false },
      { id: 2, description: "Practice guitar for 1 hour", isCompleted: false },
    ],
    taskStats: {
      totalTasks: 2,
      completedTasks: 0,
    },
    startDate: new Date("2025-01-17T14:00:00"),
    endDate: new Date("2025-01-17T18:00:00"),
    members: [
      { id: 1, username: "John Doe" },
      { id: 2, username: "Jane Doe" },
    ],
    crop: {
      id: 4,
      name: "Bell Pepper",
      growthLevel: 4,
      maxGrowthLevel: 8,
      imageUrl: "placeholder.af",
    },
  },
  {
    id: 5,
    name: "Home",
    tasks: [
      { id: 1, description: "Clean the living room", isCompleted: true },
      { id: 2, description: "Fix the leaky faucet", isCompleted: true },
      { id: 3, description: "Mow the lawn", isCompleted: false },
    ],
    taskStats: {
      totalTasks: 3,
      completedTasks: 2,
    },
    startDate: new Date("2025-01-18T09:30:00"),
    endDate: new Date("2025-01-18T12:30:00"),
    members: [{ id: 1, username: "Jane Doe" }],
    crop: {
      id: 5,
      name: "Cucumber",
      growthLevel: 6,
      maxGrowthLevel: 10,
      imageUrl: "placeholder.af",
    },
  },
];
