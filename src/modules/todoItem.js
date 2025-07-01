class TodoItem {
    #title;
    #description;
    #dueDate;
    #isDone
    /**
     * Constructor for creating a new todo item.
     * @param {string} title - The name of the new todo item.
     * @param {string} description - A brief description of the new todo item.
     * @param {Date} dueDate - A date object representing the date that the todo item is due.
     */
    constructor(title, description, dueDate)
    {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate
        this.#isDone = false;
    }

    /**
     * Toggles the status of the todo item.
     * @returns a boolean value representing 'done' status.
     */
    toggleItem() {
        this.#isDone = !this.#isDone;
        return this.#isDone
    }
    
    /** Gets the title of the todo item. */
    getTitle() {
        return this.#title;
    }

    /** Gets the description of the todo item. */
    getDesc() {
        return this.#description;
    }
    /**
     * Gets the due date string of the todo item.
     * @returns The due date of the todo item as a string.
    */
    getDueDate() {
        return this.#dueDate ? this.#dueDate.toDateString() : null;
    }

    isChecked() {
        return this.#isDone;
    }

    setTitle(newTitle) {
        this.#title = newTitle;
    }

    setDesc(newDesc) {
        this.#description = newDesc;
    }

    setDate(newDate) {
        if (newDate === "null")
        {
            this.#dueDate = null;
        }
        else
        {
            this.#dueDate = new Date(newDate);
        }
    }

}

export default TodoItem;