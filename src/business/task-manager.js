import { Task } from "../domain/task";
import { TaskList } from "../domain/task-list";

/**
 * TaskManager: Manages tasks for all the days
 */
export class TaskManager {
    constructor() {
        this.dateTaskMap = new Map();
    }

    /**
     * Create a new task
     * @param {string} key 
     * @param {Task} task 
     */
    addTask(key, task) {
        if (task instanceof Task) {
            if(!this.dateTaskMap[key]) {
                this.dateTaskMap[key] = new TaskList(key);
                this.dateTaskMap[key].addTask(task);
            } else {
                this.dateTaskMap[key].addTask(task);
            }
        }
    }

    /**
     * Get all tasks for a given day (key is basically a formatted date string in format of YYYY-MM-DD)
     * @param {string} key 
     */
    getTasks(key) {
        const taskList = this.dateTaskMap[key];
        if(taskList instanceof TaskList) {
            return taskList.getAllTasks();
        } else {
            return [];
        }
    }

    /**
     * Deletes a task based on key and taskId
     * @param {string} key 
     * @param {string} taskId 
     */
    deleteTask(key, taskId) {
        const taskList = this.dateTaskMap[key];
        if(taskList instanceof TaskList) {
            return taskList.removeTask(taskId);
        } else {
            return false;
        }
    }
}

export default TaskManager;