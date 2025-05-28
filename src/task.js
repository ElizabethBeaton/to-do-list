export default class Task {
    constructor(title, dueDate, priority) {
        this.id = Date.now();
        this.title = title;
        this.dueDate = dueDate
        this.priority = priority
    }
}