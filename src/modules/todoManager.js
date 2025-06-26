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
    
                if (addGroupForm.checkValidity())
                {
                    const groupNameInput = document.getElementById("group-name");
                    const groupDescInput = document.getElementById("group-desc");
                    const groupName = groupNameInput.value;
                    const groupDesc = groupDescInput.value;
    
                    const todoGroup = new TodoGroup(groupName, groupDesc);
                    this.todoGroups.push(todoGroup);
                    this.todoUI.removeOverlay();
                    this.todoUI.renderGroups(this.todoGroups);
                    this.#addRemoveGroupHandlers();
                    this.#addEditGroupHandlers();
                    this.currentGroup = this.todoGroups.at(-1);
                }
            });
    }

    /** Adds event handlers to remove buttons for removing todo groups. */
    #addRemoveGroupHandlers()
    {
        const removeButtons = document.querySelectorAll(".todo-group-del");
        removeButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const groupItem = e.target.closest("li[data-index]");
                const index = Number(groupItem.getAttribute("data-index"));
                this.todoGroups.splice(index, 1);
                groupItem.remove();
            })
        })
    }

    /** Adds event handlers to edit buttons for editing info of todo groups. */
    #addEditGroupHandlers()
    {
        //TODO: Implement this function.
        const editButtons = document.querySelectorAll(".todo-group-edit");
        editButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const groupItem = e.target.closest("li[data-index]");
                const index = Number(groupItem.getAttribute("data-index"));
                const groupToEdit = this.todoGroups[index];
                const editGroupForm = this.todoUI.renderEditGroupDialog(groupToEdit);
                this.#addEditGroupSubmitHandler(editGroupForm, index)
            })
        })
    }

    /**
     * Adds event handler when submitting the edit group form.
     * When validated, the todo group is edited and the todo groups are updated.
     * @param {Node} editGroupForm - The form that contains the new data to be validated.
     * @param {Number} index - The index of the group to edit in the todoGroups array.
     */
    #addEditGroupSubmitHandler(editGroupForm, index)
    {
        editGroupForm.addEventListener("submit", (e) => {
                e.preventDefault();
    
                if (editGroupForm.checkValidity())
                {
                    const groupNameInput = document.getElementById("group-name");
                    const groupDescInput = document.getElementById("group-desc");
                    const groupName = groupNameInput.value;
                    const groupDesc = groupDescInput.value;
    
                    const groupToEdit = this.todoGroups[index];
                    groupToEdit.setGroupName(groupName);
                    groupToEdit.setGroupDesc(groupDesc);
                    this.todoUI.renderGroups(this.todoGroups);
                    this.#addRemoveGroupHandlers();
                }
        })
    }
}

export default TodoManager;