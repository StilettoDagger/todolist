import TodoItem from "./todoItem";

class TodoGroup {
    #groupName;
    #groupDesc;
    #isActive
	constructor(groupName, groupDesc) {
		this.#groupName = groupName;
		this.#groupDesc = groupDesc;
		this.todos = [];
        this.#isActive = false;
	}

    /**
     * Adds a new todo item to the todo list within this group
     * @param {string} title - The name of the todo item.
     * @param {string} description - The description of the todo item.
     * @param {string} dueDate - The due date of the todo item.
     */
	addTodo(title, description, dueDate) {
        const todoItem = new TodoItem(title, description, dueDate);
        this.todos.push(todoItem);
    }

    /**
     * Removes a todo item given its index in the todos array.
     * @param {Number} index - The index of the todo item to be removed in the todos array.
     */
    removeTodo(index) {
        this.todos.splice(index, 1);
    }

    setGroupName(newName) {
        this.#groupName = newName;
    }

    setGroupDesc(newDesc) {
        this.#groupDesc = newDesc;
    }

    getGroupName() {
        return this.#groupName;
    }

    getGroupDesc() {
        return this.#groupDesc;
    }

    getTodo(index) {
        return this.todos[index];
    }

    isActive() {
        return this.#isActive;
    }

    toggleActive() {
        this.#isActive = !this.#isActive;
    }
}

export default TodoGroup;
