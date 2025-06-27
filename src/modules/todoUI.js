import TodoGroup from "./todoGroup";

/**
 * Class responsible for rendering and updating the application UI elements on the DOM.
 */
class TodoUI {
	constructor(containerID) {
		this.appContainer = document.getElementById(containerID);
		this.#renderOverlay();
	}

	// TODO: add methods to render a window for adding and editing todo groups and todo items.
	// TODO: add UI elements to add, edit and remove todos and todo groups in the renderMethods.

	/**
	 * Renders the todo groups section of the application
	 * @param {Array} todoGroups - An array of todo groups.
	 */
	renderGroups(todoGroups) {
		const todoGroupsList = this.appContainer.querySelector(".todo-groups-list");
		// Start by clearing the groups list in order to update it.
		todoGroupsList.innerHTML = "";
		todoGroups.forEach((group, index) => {
			const groupItem = document.createElement("li");
			const groupNameEl = document.createElement("h3");
			groupNameEl.textContent = group.getGroupName();
			groupItem.appendChild(groupNameEl);
			const groupButtons = document.createElement("div");
			groupButtons.className = "todo-group-buttons";
			const groupDelButton = document.createElement("button");
			groupDelButton.innerHTML  = `<span class="icon-[material-symbols--delete-outline]"></span>`;
			groupDelButton.className = "todo-group-del";
			const groupEditButton = document.createElement("button");
			groupEditButton.innerHTML = `<span class="icon-[material-symbols--edit-square-outline]"></span>`;
			groupEditButton.className = "todo-group-edit";
			const groupInfoButton = document.createElement("button");
			groupInfoButton.innerHTML = `<span class="icon-[material-symbols--info-outline]"></span>`
			groupInfoButton.className = "todo-group-info";
			groupButtons.appendChild(groupInfoButton);
			groupButtons.appendChild(groupEditButton);
			groupButtons.appendChild(groupDelButton);
			groupItem.appendChild(groupButtons);
			groupItem.className = "todo-group-item";
			groupItem.setAttribute("data-index", index);
			todoGroupsList.appendChild(groupItem);
		});
	}

	/**
	 * Renders the todo list section of the application given a todo group.
	 * @param {TodoGroup} todoGroup - The currently active group which contains the todo list.
	 */
	renderTodos(todoGroup) {
		const todoList = this.appContainer.querySelector(".todo-list");
		// Start by clearing the todo list from previous groups to update it with the current one.
		todoList.innerHTML = "";
		const todos = todoGroup.todos;
		todos.forEach((todo, index) => {
			const todoItem = document.createElement("li");
			todoItem.setAttribute("data-index", index);
			todoItem.className = "todo-item";
			const todoTitle = document.createElement("h3");
			todoTitle.textContent = todo.title;
			todoTitle.className = "todo-title";
			todoItem.appendChild(todoTitle);
			const todoDesc = document.createElement("p");
			todoDesc.textContent = todo.description;
			todoDesc.className = "todo-desc";
			todoItem.appendChild(todoDesc);
			const todoDueDate = document.createElement("p");
			todoDueDate.textContent = `Due Date: ${
				todo.dueDate ? todo.getDueDate() : "No due date"
			}`;
			todoItem.appendChild(todoDueDate);
			todoList.appendChild(todoItem);
		});
	}

	/**
	 * Renders a blank overlay in order to display add, edit, and remove dialogs
	 */
	#renderOverlay() {
		this.overlay = document.createElement("div");
		this.overlay.classList.add("overlay");
		document.body.appendChild(this.overlay);
		this.overlay.innerHTML = `
		<div class="dialog">
			<h2 class="dialog-title"></h2>
			<div class="dialog-body"></div>
		</div>
		`;
		this.overlay.addEventListener("click", (e) => {
			if (e.target === e.currentTarget && e.target.classList.contains("overlay-active"))
			{
				this.removeOverlay();
			}
		})
	}

	/**
	 * Toggles the visibility of the overlay.
	 */
	#toggleOverlay() {
		this.overlay.classList.toggle("overlay-active");
	}

	/** Clears the content of the overlay */
	#clearOverlay() {
		this.overlay.innerHTML = `
		<div class="dialog">
			<h2 class="dialog-title"></h2>
			<div class="dialog-body"></div>
		</div>
		`;
	}

	/** Hides the overlay and clears its content */
	removeOverlay() {
		this.#toggleOverlay();
		this.#clearOverlay();
	}

	renderAddGroupDialog() {
		this.#toggleOverlay();
		const dialogBody = document.querySelector(".dialog-body");
		const dialogTitle = document.querySelector(".dialog-title");
		dialogTitle.textContent = "Add a new group";
		dialogBody.innerHTML = `
		<form id="add-group-form">
			<div>
				<label for="group-name">Group name:</label>
				<input type="text" name="group-name" id="group-name" required/>
			</div>
			<div>
				<label for="group-desc">Briefly describe the group (optional):</label>
				<textarea class="resize-none" id="group-desc"></textarea>
			</div>
			<button type="submit">Add group</button>
		</form>
		`;
		return document.getElementById("add-group-form");
	}

	renderEditGroupDialog(groupToEdit) {
		this.#toggleOverlay();
		const dialogBody = document.querySelector(".dialog-body");
		const dialogTitle = document.querySelector(".dialog-title");
		dialogTitle.textContent = "Edit group";
		dialogBody.innerHTML = `
		<form id="edit-group-form">
			<div>
				<label for="group-name">Group name:</label>
				<input placeholder="${groupToEdit.getGroupName()}" type="text" name="group-name" id="group-name"/>
			</div>
			<div>
				<label for="group-desc">Briefly describe the group (optional):</label>
				<textarea placeholder="${groupToEdit.getGroupDesc()}" class="resize-none" id="group-desc"></textarea>
			</div>
			<button type="submit">Edit group</button>
		</form>
		`;
		return document.getElementById("edit-group-form");
	}

	renderGroupInfo(group) {
		//TODO: Implement this function.
		this.#toggleOverlay();
		const dialogBody = document.querySelector(".dialog-body");
		const dialogTitle = document.querySelector(".dialog-title");
		dialogTitle.textContent = "Group Information";
		dialogBody.innerHTML = `
		<div class="group-info">
			<div>
				<h3>Group Name:</h3>
				<p>${group.getGroupName()}</p>
			</div>
			<div>
				<h3>Group Description:</h3>
				<p>${group.getGroupDesc() ? group.getGroupDesc() : "No description."}</p>
			</div>
		</div>
		`;
	}
}

export default TodoUI;
