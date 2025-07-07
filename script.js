const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const stats = document.getElementById("stats");
const completedMessage = document.getElementById("completed-message");

let todos = [];

function updateStats() {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;

  stats.textContent = `${total} task(s) total | ${completed} completed`;

  completedMessage.textContent =
    completed > 0
      ? `🎉 Great job! You've completed ${completed} task(s)!`
      : "";
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) {
    alert("Please enter a todo item.");
    return;
  }

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date(),
  };

  todos.unshift(newTodo);
  todoInput.value = "";
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");
    
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="toggleTodo(${todo.id})">✅</button>
        <button onclick="deleteTodo(${todo.id})">🗑️</button>
      </div>
    `;

    todoList.appendChild(li);
  });

  updateStats();
}

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodo();
});

updateStats();
