// ===================
// Todo 렌더링
// ===================
function renderTodos() {
  const listEl = document.getElementById("todoList");
  const titleEl = document.getElementById("selected-date-text");

  listEl.innerHTML = "";

  if (!selectedDate) {
    titleEl.textContent = "날짜를 선택하세요";
    return;
  }

  titleEl.textContent = selectedDate;

  const dayTodos = todos[selectedDate] || [];

  dayTodos.forEach(todo => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.onchange = () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
      calendar.render(); // 달력에 완료 체크 반영
    };

    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.completed) span.style.textDecoration = "line-through";

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => deleteTodo(todo.id);

    li.append(checkbox, span, delBtn);
    listEl.appendChild(li);
  });

  // 달력에 has-schedule 표시
  calendar.render();
}

// ===================
// Todo 추가
// ===================
document.getElementById("addTodoBtn").onclick = () => {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (!selectedDate || !text) return;

  if (!todos[selectedDate]) todos[selectedDate] = [];

  todos[selectedDate].push({
    id: Date.now(),
    text,
    completed: false
  });

  input.value = "";
  saveTodos();
  renderTodos();
};

// ===================
// Todo 삭제
// ===================
function deleteTodo(id) {
  todos[selectedDate] = todos[selectedDate].filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}
