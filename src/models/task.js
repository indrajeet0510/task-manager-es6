export class Task {
    constructor(id, title, desc, status) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.status = status;
    }

    toggleStatus() {
        this.status = !this.status;
    }
}

export default Task;