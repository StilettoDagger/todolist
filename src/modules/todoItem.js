import {differenceInCalendarDays, format} from 'date-fns';

class TodoItem {
    /**
     * Constructor for creating a new todo item.
     * @param {string} title - The name of the new todo item.
     * @param {string} description - A brief description of the new todo item.
     * @param {Date} dueDate - A date object representing the date that the todo item is due.
     */
    #title;
    #description;
    #dueDate;
    #isDone;
    #priority
    #isOverdue
    constructor(title, description, dueDate, priority)
    {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate
        this.#isDone = false;
        this.#priority = priority;
        this.#isOverdue = false;
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
     * Gets the priority status of the todo item
     * @returns The priority of the todo item as a string.
    */
    getPrio() {
        switch(this.#priority)
        {
            case 0:
                return "Low";
            case 1:
                return "Normal";
            case 2:
                return "High";
            default:
                return "Normal";
        }
    }

    /**
     * Gets the due date string of the todo item.
     * @returns The due date of the todo item as a string.
    */
    getDueDate() {
        return this.#dueDate ? format(this.#dueDate, "PPP") : null;
    }

    /**
     * Checks the overdue status of a todo item.
     * @returns true if the todo task is overdue and false if it is not 
     */
    getOverdueStatus() {
        const today = new Date();
        this.#isOverdue = today > this.#dueDate;
        return this.#isOverdue;
    }

    /**
     * Gets the remaining time for the todo item before it is overdue.
     * @returns a string of the remaining time between now and the date the todo item is due.
     * and returns the string "Overdue!" if it is overdue
     */
    getRemainingTime() {
        if (this.#dueDate)
        {
            if (!this.getOverdueStatus())
            {
                return `${differenceInCalendarDays(this.#dueDate, new Date())} days left`;
            }
            else
            {
                return "Overdue!"
            }
        }
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

    setPrio(newPrio) {
        this.#priority = newPrio;
    }

    setDate(newDate) {
        if (!newDate || newDate === "null")
        {
            this.#dueDate = null;
        }
        else
        {
            this.#dueDate = new Date(newDate);
        }
    }

    toJSON() {
        return {
            title: this.#title,
            description: this.#description,
            dueDate: this.#dueDate,
            isDone: this.#isDone,
            priority: this.#priority
        };
    }

    static fromJSON(data) {
        const item = new TodoItem(data.title, data.description, data.dueDate, data.priority);
        item.#isDone = data.isDone;
        item.#dueDate = data.dueDate ? new Date(data.dueDate) : null;
        return item;
    }

}

export default TodoItem;