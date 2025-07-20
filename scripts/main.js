document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addButton = document.getElementById('addButton');
  const taskList = document.getElementById('taskList');


  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-item';

      const leftDiv = document.createElement('div');
      leftDiv.className = 'task-left';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const span = document.createElement('span');
      span.textContent = task.name;
      span.className = 'task-name';
      if (task.completed) span.classList.add('completed');

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.innerHTML = '❌';
      deleteButton.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      leftDiv.appendChild(checkbox);
      leftDiv.appendChild(span);
      li.appendChild(leftDiv);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  };

  const addTask = () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
      tasks.push({ name: taskName, completed: false });
      taskInput.value = '';
      saveTasks();
      renderTasks();
    }
  };

  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  renderTasks(); 
});
