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
                    this.currentGroup = this.todoGroups.at(-1);
                    console.log(this.currentGroup);
                }
            });
    }

    /** Adds event handlers to remove buttons for removing todo groups. */
    #addRemoveGroupHandlers()
    {
        const removeButtons = document.querySelectorAll(".todo-group-del");
        removeButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const groupItem = e.target.parentElement;
                const index = Number(groupItem.getAttribute("data-index"));
                this.todoGroups.splice(index, 1);
                e.target.parentElement.remove();
            })
        })
    }
}

export default TodoManager;