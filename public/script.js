const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// ---------- Functions ---------- //

// Render todos to the list
function renderTodos(todos) {
  list.innerHTML = ''; // clear current list
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.task;

    // Add completed style
    if (todo.completed) {
      li.style.textDecoration = 'line-through';
    }

    // Toggle completed on click
    li.addEventListener('click', async () => {
      await fetch(`/api/todos/${todo._id}`, {
        method: 'PUT'
      });
      loadTodos();
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', async (e) => {
      e.stopPropagation(); // prevent toggle
      await fetch(`/api/todos/${todo._id}`, {
        method: 'DELETE'
      });
      loadTodos();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Load todos from server
async function loadTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();
  renderTodos(todos);
}

// Add new todo
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (!task) return;

  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });

  input.value = '';
  loadTodos();
});

// Initial load
loadTodos();