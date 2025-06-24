class TodoItem {
    /**
     * Constructor for creating a new todo item.
     * @param {string} title - The name of the new todo item.
     * @param {string} description - A brief description of the new todo item.
     * @param {Date} dueDate - A date object representing the date that the todo item is due.
     */
    constructor(title, description, dueDate)
    {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate
        this.isDone = false;
    }

    /**
     * Toggles the status of the todo item.
     */
    toggleItem() {
        this.isDone = !this.isDone;
    }

    /**
     * Gets the due date string of the todo item.
     * @returns The due date of the todo item as a string.
     */
    getDueDate() {
        return this.dueDate.toDateString();
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    setDesc(newDesc) {
        this.description = newDesc;
    }
}

export default TodoItem;