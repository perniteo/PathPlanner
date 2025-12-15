const calendarGrid = document.querySelector(".calendar-grid");

function createDates(year, month, gridElement) {

  gridElement.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 빈 칸 추가
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    gridElement.appendChild(emptyCell);
  }

  // 날짜 추가
  for (let d = 1; d <= lastDate; d++) {
    const dateCell = document.createElement("div");
    dateCell.classList.add("date-cell");
    dateCell.textContent = d;
    dateCell.dataset.date = `${year}-${month + 1}-${d}`;
    gridElement.appendChild(dateCell);
  }
}

const grid1 = document.getElementById("c1");
const grid2 = document.getElementById("c2");

createDates(2025, 11, grid1);
createDates(2025, 12, grid2);
