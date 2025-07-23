import TodoGroup from "./todoGroup";
import TodoManager from "./todoManager";
import TodoUI from "./todoUI";

class TodoApp {
	constructor(containerID) {
		this.containerID = containerID;
		this.todoManager = null;
		this.todoUI = null;
	}

	initialize() {
		const todoGroups = this.loadFromStorage();
		this.todoManager = new TodoManager(todoGroups);
		this.todoUI = new TodoUI(this.containerID, this.todoManager);

		this.todoManager.bindOnStateChange(() => {
			this.todoUI.render(
				this.todoManager.todoGroups,
				this.todoManager.currentGroup
			);
			this.saveToStorage();
		});

		this.todoUI.initialize();
		// Initial render
		this.todoUI.render(
			this.todoManager.todoGroups,
			this.todoManager.currentGroup
		);
	}

	loadFromStorage() {
		const groupsString = localStorage.getItem("todoGroups");
		if (groupsString && groupsString !== "[]") {
			const groupsData = JSON.parse(groupsString);
			return groupsData.map((groupData) => TodoGroup.fromJSON(groupData));
		}
		return [];
	}

	saveToStorage() {
		if (this.todoManager) {
			const todoGroups = this.todoManager.todoGroups.map((group) =>
				group.toJSON()
			);
			const todoJSON = JSON.stringify(todoGroups);
			localStorage.setItem("todoGroups", todoJSON);
		}
	}
}

export default TodoApp;
