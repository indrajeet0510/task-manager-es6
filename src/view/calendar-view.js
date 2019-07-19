import Task from '../domain/task';
import TaskManager from '../business/task-manager';
import Calendar from '../business/calendar';

const CSS_CLASS_ACTIVE = ' active';

export class CalendarView {
    constructor() {
        const daysContainer = document.getElementById('daysContainer');
        
        const cal = new Calendar();
        const daysList = cal.getDays(new Date(), 20);

        this.taskManager = new TaskManager();

        for (let day of daysList) {
            (() => {
                // this.generateDummyTasksForDay(day);

                const dayEl = document.createElement('li');
                dayEl.className = 'day';
                dayEl.setAttribute('key', day.key);
                dayEl.appendChild(this.createDayInfoEl(day));

                const tasksList = this.taskManager.getTasks(day.key);

                const smTextEl = document.createTextNode(`Total tasks: ${tasksList.length}`);
                const smEl = document.createElement('small');
                smEl.appendChild(smTextEl);

                dayEl.appendChild(smEl);
                dayEl.appendChild(this.createTaskInputEl(day));
                dayEl.addEventListener('click', this.dayElEventListener.bind(this));
                daysContainer.appendChild(dayEl);
            })(day);
        }
    }

    dayElEventListener(e) {
        if (e.currentTarget.className.includes(CSS_CLASS_ACTIVE)) {
            const listEl = e.currentTarget.querySelectorAll('.task-list');
            taskListEl = e.currentTarget.removeChild(listEl[0]);
            e.currentTarget.className = e.currentTarget.className.replace(CSS_CLASS_ACTIVE, '');
            return;
        }
        const key = e.currentTarget.getAttribute('key');
        const tasksList = this.taskManager.getTasks(key);
        let taskListEl = this.createTaskList(tasksList);
        e.currentTarget.className += CSS_CLASS_ACTIVE;
        taskListEl = e.currentTarget.appendChild(taskListEl);
        console.log('mouseeneter', key);
    }

    getTaskManager() {
        return this.taskManager;
    }

    /// 

    createDayInfoEl(day, dayTaskList) {
        const dayInfoEl = document.createElement('h2');
        const dayTextNode = document.createTextNode(`
        ${day.day}, ${((day.month < 10) ? '0' : '') + day.month} ${((day.date < 10) ? '0' : '') + day.date}, ${day._d.getFullYear()}
    `);
        dayInfoEl.classList.add('day-info');
        dayInfoEl.appendChild(dayTextNode);
        return dayInfoEl;
    }
    
    createTaskInputEl(day) {
        const titleInputEl = document.createElement('input');
        titleInputEl.type = 'text';
        titleInputEl.setAttribute('placeholder', 'Enter task title');
        titleInputEl.setAttribute('name', 'taskTitle');
        titleInputEl.addEventListener('click', (e) => e.stopPropagation());
    
        const descInputEl = document.createElement('textarea');
        descInputEl.setAttribute('placeholder', 'Enter task description');
        descInputEl.setAttribute('name', 'taskDesc');
        descInputEl.addEventListener('click', (e) => e.stopPropagation());
    
        const submitBtnTxtEl = document.createTextNode('Add task');
        const submitBtnEl = document.createElement('button');
        submitBtnEl.appendChild(submitBtnTxtEl);
    
        submitBtnEl.addEventListener('click', this.submitBtnListener.bind(this));
    
        const dFrag = document.createElement('div');
        dFrag.classList.add('input-container');
        dFrag.setAttribute('key', day.key);
        dFrag.appendChild(titleInputEl);
        dFrag.appendChild(descInputEl);
        dFrag.appendChild(submitBtnEl);
    
        return dFrag;
    }
    
    createTaskList(taskList) {
        let taskListFragment = null;
        if(typeof document.createDocumentFragment === 'function') {
            taskListFragment = document.createDocumentFragment();
        }
        const taskListEl = document.createElement('ul');
        taskListEl.classList.add('task-list');
    
        if (taskListFragment) {
            taskListFragment.appendChild(taskListEl);
        }
    
        for(const task of taskList) {
        
            taskListEl.prepend(this.createTaskEl(task));
        }
    
        return taskListFragment || taskListEl;
    }
    
    
    
    createTaskEl(task) {
            const taskEl = document.createElement('li');
            taskEl.classList.add('task');
            console.log(task.title);
            
            const titleTextNode = document.createTextNode(`${task.title}`);
            const titleEl = document.createElement('h3');
            titleEl.appendChild(titleTextNode);
    
            const descTextNode = document.createTextNode(`${task.desc}`);
            const descEl = document.createElement('p');
            descEl.appendChild(descTextNode);
    
            const btnText = document.createTextNode('Delete');
            const deleteBtnEl = document.createElement('button');
            deleteBtnEl.appendChild(btnText);
            
    
            deleteBtnEl.addEventListener('click', this.deleteBtnListener.bind(this));
    
            taskEl.appendChild(titleEl);
            taskEl.appendChild(descEl);
            taskEl.appendChild(deleteBtnEl);
            taskEl.setAttribute('key', task.key);
            taskEl.setAttribute('taskId', task.id);
            return taskEl;
    }
    
    deleteBtnListener(e) {
        console.log(e.currentTarget);
        const key = e.currentTarget.parentNode.getAttribute('key');
        const taskId = e.currentTarget.parentNode.getAttribute('taskId');
    
        console.log('tasks before deletion',this.taskManager.getTasks(key));
        
        this.taskManager.deleteTask(key, taskId);
    
        const totalTasks = this.taskManager.getTasks(key);
        e.currentTarget.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].nodeValue = `Total tasks: ${totalTasks.length}`;
        e.currentTarget.removeEventListener('click', this.deleteBtnListener.bind(this));
        e.currentTarget.parentNode.remove();
        e.stopPropagation();
        console.log('tasks after deletion',this.taskManager.getTasks(key));
        
    }
    
    submitBtnListener(e) {
        e.stopPropagation();
        const t = e.currentTarget.parentNode;
        const title = t.childNodes[0].value;
        const desc = t.childNodes[1].value;
        
        if (title && desc) {
            if (title.trim() && desc.trim()){
                t.childNodes[0].value = '';
                t.childNodes[1].value = '';
            } else {
                return;
            }
        } else {
            return;
        }
    
        const newTask = new Task(null, title, desc, true);
        this.taskManager.addTask(t.getAttribute('key'), newTask);
        const tasks = this.taskManager.getTasks(t.getAttribute('key'));
        t.parentNode.childNodes[1].childNodes[0].nodeValue = `Total tasks: ${tasks.length}`;
        console.log(tasks);
        console.log(t.parentNode);
        const ulList = t.parentNode.parentNode.querySelectorAll('.task-list');
        if (ulList && ulList[0]) {
            ulList[0].prepend(this.createTaskEl(tasks[tasks.length - 1]));
        }
    }

    generateDummyTasksForDay(day) {
        for(let i = 0; i < 7; i++) {
            const task = new Task(null, `Task ${i+1}`, `Description for task ${i+1}`, true);
            console.log(task);
            this.taskManager.addTask(day.key, task);
        }
    }
    ///
}

export default CalendarView;