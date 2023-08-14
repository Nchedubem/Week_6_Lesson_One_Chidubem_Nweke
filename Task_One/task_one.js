class Task {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }
  }
  
  class TaskManager {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
  
    addTask(name) {
      const newTask = new Task(Date.now().toString(), name);
      this.tasks.push(newTask);
      this.saveTasks();
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
    }
  
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.displayTasks();
    }
  
    displayTasks() {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
  
      this.tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');
        taskItem.innerHTML = `
          <span class="taskName">${task.name}</span>
          <span class="taskActions">
          <span class="deleteBtn" data-id="${task.id}">Delete</span>
          </span>`;

        taskList.appendChild(taskItem);
      });
  
      this.attachListeners();
    }
  
    attachListeners() {
      const deleteBtns = document.getElementsByClassName('deleteBtn');
      Array.from(deleteBtns).forEach(btn => {
        btn.addEventListener('click', () => {
          const taskId = btn.getAttribute('data-id');
          this.deleteTask(taskId);
        });
      });
    }
  }
  
  const taskManager = new TaskManager();
  
  const taskForm = document.getElementById('taskForm');
  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
      taskManager.addTask(taskName);
      taskInput.value = '';
    }
  });