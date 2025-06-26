import TodoItem from "./todoItem";

class TodoGroup {
    #groupName;
    #groupDesc;
	constructor(groupName, groupDesc) {
		this.#groupName = groupName;
		this.#groupDesc = groupDesc;
		this.todos = [];
	}

    /**
     * Adds a new todo item to the todo list within this group
     * @param {Object} todoObj - Todo objects which includes properties for title, description, and optionally a due date. 
     */
	addTodo({title, description, dueDate = null}) {
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
}

export default TodoGroup;
