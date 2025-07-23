import TodoGroup from "./todoGroup";

/**
 * Class for managing todo groups and todo lists within each group.
 */
class TodoManager {
	constructor(todoGroups = []) {
		this.todoGroups = todoGroups;
		this.currentGroup = this.todoGroups.find((g) => g.isActive()) || null;
		this.onStateChange = () => {};
	}

	bindOnStateChange(callback) {
		this.onStateChange = callback;
	}

	addGroup(name, desc) {
		const newGroup = new TodoGroup(name, desc);
		if (this.todoGroups.length === 0) {
			newGroup.toggleActive();
			this.currentGroup = newGroup;
		}
		this.todoGroups.push(newGroup);
		this.onStateChange();
	}

	removeGroup(index) {
		const removedGroup = this.todoGroups[index];
		this.todoGroups.splice(index, 1);
		if (this.currentGroup === removedGroup) {
			this.currentGroup = null;
		}
		this.onStateChange();
	}

	editGroup(group, name, desc) {
		group.setGroupName(name);
		group.setGroupDesc(desc);
		this.onStateChange();
	}

	switchGroup(index) {
		const selectedGroup = this.todoGroups[index];
		if (this.currentGroup === selectedGroup) {
			return;
		}

		if (this.currentGroup) {
			this.currentGroup.toggleActive();
		}
		this.currentGroup = selectedGroup;
		this.currentGroup.toggleActive();
		this.onStateChange();
	}

	clearGroups() {
		this.todoGroups = [];
		this.currentGroup = null;
		this.onStateChange();
	}

	addTodo(name, desc, date, prio) {
		this.currentGroup.addTodo(name, desc, date, prio);
		this.onStateChange();
	}

	removeTodo(index) {
		this.currentGroup.removeTodo(index);
		this.onStateChange();
	}

	editTodo(todo, fieldType, value) {
		switch (fieldType) {
			case "title":
				todo.setTitle(value);
				break;
			case "desc":
				todo.setDesc(value);
				break;
			case "prio":
				todo.setPrio(Number(value));
				break;
			case "date":
				todo.setDate(value);
				break;
			default:
				break;
		}
		this.onStateChange();
	}

	toggleTodo(index) {
		const todo = this.currentGroup.getTodo(index);
		todo.toggleItem();
		this.onStateChange();
	}

	clearTodos() {
		if (this.currentGroup) {
			this.currentGroup.todos = [];
			this.onStateChange();
		}
	}
}

export default TodoManager;
