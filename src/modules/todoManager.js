import TodoGroup from "./todoGroup";
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

	// TODO: add event handlers for UI elements (switching groups and toggling todos)
	// TODO: add functionality to add, edit, and remove todos and todo groups.

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
				console.log(this.currentGroup);
				console.log(this.currentGroupEl);
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
				} else {
					const groupIndex = this.todoGroups.indexOf(this.currentGroup);
					this.currentGroupEl = document.querySelector(
						`li[data-index="${groupIndex}"]`
					);
					this.currentGroupEl.classList.toggle("group-active");
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
				if (groupSelected !== this.currentGroupEl) {
					this.currentGroupEl.classList.toggle("group-active");
					this.currentGroupEl = groupSelected;
					this.currentGroup = this.todoGroups[groupIndex];
					this.currentGroupEl.classList.toggle("group-active");
				}
                console.log(this.currentGroup);
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
}

export default TodoManager;
