import { fromJSON } from "postcss";
import TodoItem from "./todoItem";

class TodoGroup {
    #groupName;
    #groupDesc;
    #isActive;
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
     * @param {Number} priority - The priority of the todo item.
     */
	addTodo(title, description, dueDate, priority) {
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

    toggleActive() {
        this.#isActive = !this.#isActive;
    }

    isActive() {
        return this.#isActive;
    }

    toJSON() {
        return {
            groupName: this.#groupName,
            groupDesc: this.#groupDesc,
            isActive: this.#isActive,
            todos: this.todos.map(todo => todo.toJSON())
        };
    }

    static fromJSON(data) {
        const group = new TodoGroup(data.groupName, data.groupDesc);
        group.#isActive = data.isActive;
        group.todos = data.todos.map(itemData => TodoItem.fromJSON(itemData));
        return group;
    }
}

export default TodoGroup;
