import TodoGroup from "./todoGroup";
import TodoManager from "./todoManager";

class TodoApp {
    constructor(containerID)
    {
        this.containerID = containerID;
        this.todoManager = null;
    }

    initialize()
    {
        this.loadFromStorage();
        this.todoManager.initialize();
    }

    loadFromStorage()
    {
        const groupsString = localStorage.getItem("todoGroups");
        if (groupsString && groupsString !== "[]")
        {
            const groupsData = JSON.parse(groupsString);
            const todoGroups = groupsData.map(groupData => TodoGroup.fromJSON(groupData));
            this.todoManager = new TodoManager(this.containerID, todoGroups);
            
        }
        else
        {
            this.todoManager = new TodoManager(this.containerID);
        }
    }

    saveToStorage()
    {
        if (this.todoManager)
        {
            const todoGroups = this.todoManager.todoGroups.map(group => group.toJSON())
            const todoJSON = JSON.stringify(todoGroups);
            localStorage.setItem("todoGroups", todoJSON);
        }
    }
}

export default TodoApp;