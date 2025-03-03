export const baseUrl = import.meta.env.VITE_API_URL;

const endpoints = {
	auth: "/auth",
	category: "/category",
	taskList: "/task-list",
	taskListItem: "/task-list-item",
};

export default endpoints;