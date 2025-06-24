import TodoGroup from "./todoGroup";

class TodoUI {
    constructor(containerID) {
        this.appContainer = document.getElementById(containerID);
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
            groupItem.textContent = group.groupName;
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
            const todoTitle = document.createElement("h3");
            todoTitle.textContent = todo.title;
            todoTitle.className = "todo-title";
            todoItem.appendChild(todoTitle);
            const todoDesc = document.createElement("p");
            todoDesc.textContent = todo.description;
            todoDesc.className = "todo-desc";
            todoItem.appendChild(todoDesc);
            const todoDueDate = document.createElement("p");
            todoDueDate.textContent = `Due Date: ${todo.dueDate ? todo.getDueDate() : "No due date"}`;           
            todoItem.appendChild(todoDueDate);
            todoList.appendChild(todoItem);
        });
    }
}