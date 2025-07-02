import TodoGroup from "./todoGroup";

/**
 * Class responsible for rendering and updating the application UI elements on the DOM.
 */
class TodoUI {
	constructor(containerID) {
		this.appContainer = document.getElementById(containerID);
		this.#renderOverlay();
	}

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
			groupDelButton.innerHTML = `<span class="icon-[material-symbols--delete-outline]"></span>`;
			groupDelButton.className = "todo-group-del";
			const groupEditButton = document.createElement("button");
			groupEditButton.innerHTML = `<span class="icon-[material-symbols--edit-square-outline]"></span>`;
			groupEditButton.className = "todo-group-edit";
			const groupInfoButton = document.createElement("button");
			groupInfoButton.innerHTML = `<span class="icon-[material-symbols--info-outline]"></span>`;
			groupInfoButton.className = "todo-group-info";
			groupButtons.appendChild(groupInfoButton);
			groupButtons.appendChild(groupEditButton);
			groupButtons.appendChild(groupDelButton);
			groupItem.appendChild(groupButtons);
			groupItem.className = "todo-group-item";
			if (group.isActive())
			{
				groupItem.classList.add("group-active");
			}
			else
			{
				groupItem.classList.remove("group-active");
			}
			groupItem.setAttribute("data-index", index);
			todoGroupsList.appendChild(groupItem);
		});
	}

	renderTodoDiv() {
		const todosDiv = this.appContainer.querySelector(".todo-main");
		todosDiv.innerHTML = `
            <div class="todo-main-header">
                <button id="add-new-todo"><span class="icon-[material-symbols--add]"></span>New todo</button>
				<h2>📃Todos</h3>
            </div>
            <ul class="todo-list">
            </ul>
		`;
	}

	/**
	 * Renders the todo list section of the application given a todo group.
	 * @param {TodoGroup} todoGroup - The currently active group which contains the todo list.
	 */
	renderTodos(todoGroup) {
		const todoList = this.appContainer.querySelector(".todo-list");
		// Start by clearing the todo list from previous groups to update it with the current one.
		todoList.innerHTML = "";
		if (todoGroup === null) {
			return;
		}
		const todos = todoGroup.todos;
		todos.forEach((todo, index) => {
			const todoItem = document.createElement("li");
			todoItem.setAttribute("data-index", index);
			todoItem.classList.add("todo-item", "group/item");
			if (todo.isChecked())
			{
				todoItem.classList.add("checked");
			}
			else
			{
				todoItem.classList.remove("checked");
			}
			const todoInfo = document.createElement("div");
			todoInfo.classList.add("todo-info");
			const todoTitle = document.createElement("h3");
			todoTitle.innerHTML = `<button ${todo.isChecked() ? "disabled" : ""} class="todo-edit todo-edit-title"><span class="icon-[material-symbols--edit-square-outline]"></span></button>${todo.getTitle()}`;
			todoTitle.classList.add("todo-title", "group/edit");
			todoInfo.appendChild(todoTitle);
			const todoDesc = document.createElement("p");
			todoDesc.innerHTML = `<button ${todo.isChecked() ? "disabled" : ""} class="todo-edit todo-edit-desc"><span class="icon-[material-symbols--edit-square-outline]"></span></button>${
				todo.getDesc() ? todo.getDesc() : "No description"
			}`;
			todoDesc.classList.add("todo-desc", "group/edit");
			todoInfo.appendChild(todoDesc);
			const todoDueDate = document.createElement("p");
			todoDueDate.innerHTML = `<button ${todo.isChecked() ? "disabled" : ""} class="todo-edit todo-edit-date"><span class="icon-[material-symbols--edit-square-outline]"></span></button>Due Date: ${
				todo.getDueDate() ? todo.getDueDate() : "No due date"
			}`;
			todoDueDate.classList.add("todo-date", "group/edit");
			const todoCheck = document.createElement("button");
			todoCheck.classList.add("todo-check");
			if (todo.isChecked())
			{
				todoCheck.classList.add("checked");
			}
			else
			{
				todoCheck.classList.remove("checked");
			}
			todoCheck.innerHTML = `${!todo.isChecked() ? '<span class="icon-[mdi--checkbox-blank-outline]"></span>': '<span class="icon-[mdi--checkbox-outline]"></span>'}`;
			const todoDel = document.createElement("button");
			todoDel.className = "todo-del";
			todoDel.innerHTML = `<span class="icon-[mdi--remove]"></span>`;
			todoInfo.appendChild(todoDueDate);
			todoItem.appendChild(todoInfo);
			todoItem.appendChild(todoCheck);
			todoItem.appendChild(todoDel);
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
			<div class="dialog-header">
				<button class="close-dialog"><span class="icon-[mdi--close-circle-outline]"></span></button>
				<h2 class="dialog-title"></h2>
			</div>
			<div class="dialog-body"></div>
		</div>
		`;
		this.overlay.addEventListener("click", (e) => {
			if (
				e.target === e.currentTarget &&
				e.target.classList.contains("overlay-active")
			) {
				this.removeOverlay();
			}
		});
		const closeOverlayButton = document.querySelector(".close-dialog");
		closeOverlayButton.addEventListener("click", (e) => {
			this.removeOverlay();
		});
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
			<div class="dialog-header">
				<button class="close-dialog"><span class="icon-[mdi--close-circle-outline]"></span></button>
				<h2 class="dialog-title"></h2>
			</div>
			<div class="dialog-body"></div>
		</div>
		`;
		const closeOverlayButton = document.querySelector(".close-dialog");
		closeOverlayButton.addEventListener("click", (e) => {
			this.removeOverlay();
		});
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

	renderNoGroupsMessage() {
		const todosDiv = this.appContainer.querySelector(".todo-main");
		todosDiv.innerHTML = `
            <p class="no-groups-msg">No todo groups found. Start by creating a new todo group to add todos.</p>
		`;
	}

	renderAddTodoDialog(group) {
		this.#toggleOverlay();
		const dialogBody = document.querySelector(".dialog-body");
		const dialogTitle = document.querySelector(".dialog-title");
		dialogTitle.textContent = `Add todo to ${group.getGroupName()}`;
		dialogBody.innerHTML = `
		<form id="add-todo-form">
			<div>
				<label for="todo-name">Todo name:</label>
				<input type="text" name="todo-name" id="todo-name" required/>
			</div>
			<div>
				<label for="todo-desc">Briefly describe the todo item (optional):</label>
				<textarea class="resize-none" id="todo-desc"></textarea>
			</div>
			<div>
				<label for="todo-date">Due date (optional)</label>
				<input type="date" name="todo-date" id="todo-date"/>
			<button type="submit">Add todo</button>
		</form>
		`;

		const dueDateInput = document.getElementById("todo-date");
		const today = new Date();
		dueDateInput.min = today.toISOString().substring(0, 10);
		return document.getElementById("add-todo-form");
	}

	renderTodoEdit(todo, fieldType)
	{
		this.#toggleOverlay();
		const dialogBody = document.querySelector(".dialog-body");
		const dialogTitle = document.querySelector(".dialog-title");
		let fieldValue = "";
		let inputEl = "";
		switch (fieldType) {
			case "title":
				fieldValue = todo.getTitle();
				inputEl = `<input placeholder="${fieldValue}" type="text" name="todo-${fieldType}-input" id="todo-${fieldType}-input"/>`;
				break;
			case "desc":
				fieldValue = todo.getDesc();
				inputEl = `<textarea class="resize-none" placeholder="${fieldValue}" name="todo-${fieldType}-input" id="todo-${fieldType}-input"></textarea>`;
				break;
			case "date":
				fieldValue = todo.getDueDate();
				const today = new Date().toISOString().substring(0, 10);
				inputEl = `<input min="${today}" placeholder="${fieldValue}" type="date" name="todo-${fieldType}-input" id="todo-${fieldType}-input"/>`;
			default:
				break;
		}
		dialogTitle.textContent = `Edit todo's ${fieldType === "desc" ? "description" : fieldType}`;
		dialogBody.innerHTML = `
		<form id="todo-edit-form">
			<div>
				${inputEl}
			</div>
			<button type="submit">Edit ${fieldType === "desc" ? "description" : fieldType}</button>
		</form>
		`;
		return document.getElementById("todo-edit-form");
	}
}

export default TodoUI;
