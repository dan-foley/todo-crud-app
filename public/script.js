const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (!task) return;

  // Add task to list (frontend only for now)
  const li = document.createElement('li');
  li.textContent = task;
  list.appendChild(li);

  input.value = '';
});