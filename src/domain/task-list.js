/**
 * TaskList: Provides functionality for list of tasks for an individual day
 */

export class TaskList {
    constructor(key) {
        this.tasks = new Map();
        this.counter = 0;
        this.key = key;
    }

    /**
     * Add a task based on key (key represents a formatted date in YYYY-MM-DD format)
     * @param {Task} task 
     * @param {string} key 
     */
    addTask(task, key) {
        task.id = ++this.counter;
        task.key = this.key;
        this.tasks[task.id] = task;
    }

    /**
     * Removes a task form the task list
     * @param {string} taskId 
     */
    removeTask(taskId) {
        delete this.tasks[taskId];
    }

    /**
     * Return all the tasks from this list
     */
    getAllTasks() {
        return Object.values(this.tasks);
    }
}

export default TaskList;