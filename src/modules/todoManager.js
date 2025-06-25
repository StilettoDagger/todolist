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
        this.currentGroup;
    }

    // TODO: add event handlers for UI elements (switching groups and toggling todos)
    // TODO: add functionality to add, edit, and remove todos and todo groups.

 
    /**
     * Renders the dialog to add a new todo group
     * then adds an event handler when submitting the dialog
     * to create a new TodoGroup and push it to the todoGroups array.
     */
    addTodoGroup() {
        // Opens add group window
        const addGroupForm = this.todoUI.renderAddGroupDialog();
		addGroupForm.addEventListener("submit", (e) => {
			e.preventDefault();

			if (addGroupForm.checkValidity())
			{
				const groupNameInput = document.getElementById("group-name");
				const groupDescInput = document.getElementById("group-desc");
				const groupName = groupNameInput.value;
				const groupDesc = groupDescInput.value;

                const todoGroup = new TodoGroup(groupName, groupDesc);
                this.todoGroups.push(todoGroup);
                this.todoUI.removeOverlay();
			}
		});
    }

    /**
     * Add event handlers for removing todo groups
     */
    removeTodoGroupHandlers()
    {
        // TODO: Implement this function
    }
}

export default TodoManager;