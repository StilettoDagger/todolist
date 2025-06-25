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

    addTodoGroup() {
        // Opens add group window
        
    }
}

export default TodoManager;