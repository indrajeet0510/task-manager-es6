import { Task } from "../domain/task";
import { TaskList } from "../domain/task-list";

export class TaskManager {
    constructor() {
        this.dateTaskMap = new Map();
    }

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

    getTasks(key) {
        const taskList = this.dateTaskMap[key];
        if(taskList instanceof TaskList) {
            return taskList.getAllTasks();
        } else {
            return [];
        }
    }

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