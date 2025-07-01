import TodoGroup from "./todoGroup";
import TodoItem from "./todoItem";
import TodoUI from "./todoUI";

/**
 * Class for managing todo groups and todo lists within each group.
 * Includes methods for adding, editing, and
 */
class TodoManager {
	constructor(containerID) {
		this.todoUI = new TodoUI(containerID);
		this.todoGroups = [];
		this.currentGroup = null;
		this.currentGroupEl = null;
		this.#addNewGroupHandler();
	}

    // TODO: add functionality for toggling todos in a todo list
	// TODO: add functionality for editing and removing todos

	/**
	 * Adds a handler for the button responsible for creating a new todo group
	 */
	#addNewGroupHandler() {
		const addTodoGroupButton = document.getElementById("add-new-group");
		addTodoGroupButton.addEventListener("click", (e) => {
			// Opens add group window
			const addGroupForm = this.todoUI.renderAddGroupDialog();
			this.#addNewGroupSubmitHandler(addGroupForm);
		});
	}

	/** Adds a handler for submitting the form for adding a new group. */
	#addNewGroupSubmitHandler(addGroupForm) {
		addGroupForm.addEventListener("submit", (e) => {
			e.preventDefault();

			if (addGroupForm.checkValidity()) {
				const groupNameInput = document.getElementById("group-name");
				const groupDescInput = document.getElementById("group-desc");
				const groupName = groupNameInput.value;
				const groupDesc = groupDescInput.value;

				if (this.todoGroups.length === 0)
				{
					this.todoUI.renderTodoDiv();
					this.#addNewTodoHandler();
				}

				const todoGroup = new TodoGroup(groupName, groupDesc);
				this.todoGroups.push(todoGroup);
				this.todoUI.removeOverlay();
				this.#renderAndAddHandlers();
				if (this.currentGroup === null && this.currentGroupEl === null) {
					this.currentGroup = this.todoGroups.at(-1);
					this.currentGroupEl = document.querySelector(
						`li[data-index="${this.todoGroups.length - 1}"]`
					);
				} else {
					const groupIndex = this.todoGroups.indexOf(this.currentGroup);
					this.currentGroupEl = document.querySelector(
						`li[data-index="${groupIndex}"]`
					);
				}
				this.currentGroupEl.classList.toggle("group-active");
			}
		});
	}

	/** Adds event handlers to remove buttons for removing todo groups. */
	#addRemoveGroupHandlers() {
		const removeButtons = document.querySelectorAll(".todo-group-del");
		removeButtons.forEach((button) => {
			button.addEventListener("click", (e) => {
				e.stopPropagation();

                const groupItem = e.target.closest("li[data-index]");
				const index = Number(groupItem.getAttribute("data-index"));
				this.todoGroups.splice(index, 1);
                this.#renderAndAddHandlers();
				if (groupItem === this.currentGroupEl) {
					this.currentGroup = null;
					this.currentGroupEl = null;
				}
				this.todoUI.renderTodos(this.currentGroup);
				if (this.todoGroups.length === 0)
				{
					this.todoUI.renderNoGroupsMessage();
				}
			});
		});
	}

	/** Adds event handlers to edit buttons for editing info of todo groups. */
	#addEditGroupHandlers() {
		const editButtons = document.querySelectorAll(".todo-group-edit");
		editButtons.forEach((button) => {
			button.addEventListener("click", (e) => {
				e.stopPropagation();
				const groupItem = e.target.closest("li[data-index]");
				const index = Number(groupItem.getAttribute("data-index"));
				const groupToEdit = this.todoGroups[index];
				const editGroupForm = this.todoUI.renderEditGroupDialog(groupToEdit);
				this.#addEditGroupSubmitHandler(editGroupForm, index);
			});
		});
	}

	/**
	 * Adds event handler when submitting the edit group form.
	 * When validated, the todo group is edited and the todo groups are updated.
	 * @param {Node} editGroupForm - The form that contains the new data to be validated.
	 * @param {Number} index - The index of the group to edit in the todoGroups array.
	 */
	#addEditGroupSubmitHandler(editGroupForm, index) {
		editGroupForm.addEventListener("submit", (e) => {
			e.preventDefault();

			if (editGroupForm.checkValidity()) {
				const groupNameInput = document.getElementById("group-name");
				const groupDescInput = document.getElementById("group-desc");
				const groupName =
					groupNameInput.value !== ""
						? groupNameInput.value
						: groupNameInput.placeholder;
				const groupDesc = groupDescInput.value;

				const groupToEdit = this.todoGroups[index];
				groupToEdit.setGroupName(groupName);
				groupToEdit.setGroupDesc(groupDesc);
				this.todoUI.removeOverlay();
                this.#renderAndAddHandlers();
                this.currentGroupEl = document.querySelector(`li[data-index="${index}"]`);
				this.currentGroupEl.classList.toggle("group-active");
			}
		});
	}

    /** Adds event handlers for info buttons to display a todo group info. */
	#addGroupInfoHandlers() {
		const infoButtons = document.querySelectorAll(".todo-group-info");

		infoButtons.forEach((button) => {
			button.addEventListener("click", (e) => {
				e.stopPropagation();
				const groupItem = e.target.closest("li[data-index]");
				const index = groupItem.getAttribute("data-index");
				const groupToEdit = this.todoGroups[index];
				this.todoUI.renderGroupInfo(groupToEdit);
			});
		});
	}

    /** Adds event handlers to todo group items to allow switching between them.  */
	#addGroupSwitchHandlers() {
		const groupItems = document.querySelectorAll(".todo-group-item");

		groupItems.forEach((groupItem) => {
			groupItem.addEventListener("click", (e) => {
				e.stopPropagation();

				const groupSelected = e.target.closest("li[data-index]");
				const groupIndex = Number(groupSelected.getAttribute("data-index"));
				if (this.currentGroupEl === groupSelected)
				{
					return;
				}
				if (this.currentGroupEl) {
					this.currentGroupEl.classList.toggle("group-active");
				}
				this.currentGroupEl = groupSelected;
				this.currentGroup = this.todoGroups[groupIndex];
				this.currentGroupEl.classList.toggle("group-active");
				this.todoUI.renderTodos(this.currentGroup);
				this.#addTodoEditHandlers();
			});
		});
	}

    /** Renders the groups and adds event handlers to each one */
	#renderAndAddHandlers() {
		this.todoUI.renderGroups(this.todoGroups);
		this.#addRemoveGroupHandlers();
		this.#addEditGroupHandlers();
		this.#addGroupInfoHandlers();
        this.#addGroupSwitchHandlers();
	}

	#addNewTodoHandler() {
		const todoButton = document.getElementById("add-new-todo");
		todoButton.addEventListener("click", (e) => {
			const todoForm = this.todoUI.renderAddTodoDialog(this.currentGroup);
			this.#addNewTodoSubmitHandler(todoForm);
		})
	}

	#addNewTodoSubmitHandler(todoForm) {
		todoForm.addEventListener("submit", (e) => {
			e.preventDefault();

			if (todoForm.checkValidity())
			{
				const todoNameInput = document.getElementById("todo-name");
				const todoDescInput = document.getElementById("todo-desc");
				const todoDueDate = document.getElementById("todo-date");
				const todoName = todoNameInput.value;
				const todoDesc = todoDescInput.value;
				const todoDate = todoDueDate.value ? new Date (todoDueDate.value) : null;

				this.currentGroup.addTodo(todoName, todoDesc, todoDate);
				this.todoUI.removeOverlay();
				this.todoUI.renderTodos(this.currentGroup);
				this.#addTodoEditHandlers();
			}
		})
	}

	#addTodoEditHandlers()
	{
		const todoItems = document.querySelectorAll(".todo-item");

		todoItems.forEach((todoItem) => {
			const todoIndex = Number(todoItem.getAttribute("data-index"));
			const todo = this.currentGroup.getTodo(todoIndex);
			const editButtons = todoItem.querySelectorAll(".todo-edit");
			editButtons.forEach((editButton) => {
				let fieldType = "";
				if (editButton.classList.contains("todo-edit-title"))
				{
					fieldType = "title";
				}
				else if (editButton.classList.contains("todo-edit-desc"))
				{
					fieldType = "desc";
				}
				else if (editButton.classList.contains("todo-edit-date"))
				{
					fieldType = "date";
				}
				editButton.addEventListener("click", (e) => {
					e.stopPropagation();

					const todoEditForm = this.todoUI.renderTodoEdit(todo, fieldType);
					this.#addTodoEditSubmitHandler(todoEditForm, todo, fieldType);
				})
			})
		})
	}

	#addTodoEditSubmitHandler(todoEditForm, todo, fieldType)
	{
		todoEditForm.addEventListener("submit", (e) => {
			e.preventDefault();

			if (todoEditForm.checkValidity())
			{
				const fieldInput = document.getElementById(`todo-${fieldType}-input`);
				const fieldValue = fieldInput.value ? fieldInput.value : fieldInput.placeholder;

				switch (fieldType) {
					case "title":
						todo.setTitle(fieldValue);
						break;
					case "desc":
						todo.setDesc(fieldValue);
						break;
					case "date":
						todo.setDate(fieldValue);
						break;
					default:
						break;
				}
				this.todoUI.removeOverlay();
				this.todoUI.renderTodos(this.currentGroup);
				this.#addTodoEditHandlers();
			}
		})
	}
}

export default TodoManager;
