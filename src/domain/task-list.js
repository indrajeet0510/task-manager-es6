export class TaskList {
    constructor(key) {
        this.tasks = new Map();
        this.counter = 0;
        this.key = key;
    }

    addTask(task, key) {
        task.id = ++this.counter;
        task.key = this.key;
        this.tasks[task.id] = task;
    }

    removeTask(taskId) {
        delete this.tasks[taskId];
    }

    getAllTasks() {
        return Object.values(this.tasks);
    }
}

export default TaskList;