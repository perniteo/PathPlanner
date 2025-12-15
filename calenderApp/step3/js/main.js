// ===================
// 상태 정의
// ===================
let selectedDate = null;
let todos = {}; // { "2025-12-13": [{id, text, completed}] }

// ===================
// LocalStorage 처리
// ===================
function loadTodos() {
  const data = localStorage.getItem("todos");
  todos = data ? JSON.parse(data) : {};
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ===================
// 초기화
// ===================
loadTodos();


// 초기 선택 날짜를 오늘로 세팅
const todayStr = `${calendar.year}-${String(calendar.month + 1).padStart(2,'0')}-${String(calendar.today.getDate()).padStart(2,'0')}`;
selectedDate = todayStr;


calendar.highlightSelectedCell();
calendar.render(); // 달력 그리기
renderTodos();

// Todo 존재하면 표시
Object.keys(todos).forEach(dateStr => {
  const cell = document.querySelector(`.date-cell[data-date='${dateStr}']`);
  if(cell) cell.classList.add('has-schedule');
});
