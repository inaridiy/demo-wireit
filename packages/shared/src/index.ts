export interface Todo {
	id: number;
	title: string;
	completed: boolean;
	created_at: string;
}

export interface CreateTodoInput {
	title: string;
}

export interface UpdateTodoInput {
	title?: string;
	completed?: boolean;
}
