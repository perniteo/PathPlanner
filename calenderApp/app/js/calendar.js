class Calendar {

  constructor(container) {
    this.container = container;
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth(); // 0~11
    this.schedules = {}; // 샘플 일정: { "2025-12-01": [{title:"회의"}] }

    this.renderMonthSelect();
    this.render();
    this.attachControls();
  }

  renderMonthSelect() {
    const select = document.getElementById("month-select");
    for (let m = 0; m < 12; m++) {
      const option = document.createElement("option");
      option.value = m;
      option.textContent = `${m + 1}월`;
      if (m === this.month) option.selected = true;
      select.appendChild(option);
    }

    select.addEventListener("change", (e) => {
      this.month = parseInt(e.target.value);
      this.render();
    });
  }

  // prev/next 버튼 이벤트
  attachControls() {
    document.getElementById("prev-month").addEventListener("click", () => {
      this.month--;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
      document.getElementById("month-select").value = this.month;
      this.render();
    });

    document.getElementById("next-month").addEventListener("click", () => {
      this.month++;
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
      document.getElementById("month-select").value = this.month;
      this.render();
    });
  }

  highlightSelectedCell() {
    this.container.querySelectorAll(".date-cell").forEach(cell => {
      cell.classList.remove("selected");
        if(cell.dataset.date === selectedDate) cell.classList.add("selected");
    });
  }

  render() {
    this.container.innerHTML = ""; // 초기화

    // 요일 표시
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const header = document.createElement("div");
    header.className = "calendar-weekdays";
    weekdays.forEach(d => header.appendChild(Object.assign(document.createElement("div"), {textContent:d})));
    this.container.appendChild(header);

    // 날짜 그리기
    const grid = document.createElement("div");
    grid.className = "calendar-grid";

    const firstDay = new Date(this.year, this.month, 1).getDay();
    const lastDate = new Date(this.year, this.month + 1, 0).getDate();

    // 빈 칸
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement("div"));

    // 날짜 셀
    for (let d = 1; d <= lastDate; d++) {
      const cell = document.createElement("div");
      cell.className = "date-cell";
      const dateStr = `${this.year}-${String(this.month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      cell.dataset.date = dateStr;
      cell.textContent = d;

      cell.addEventListener("click", () => {
        selectedDate = dateStr;      // main.js 전역 변수
        renderTodos();               // 선택된 날짜 Todo 렌더링
        this.highlightSelectedCell();// 하이라이트 표시
      });

      grid.appendChild(cell);
    }

    this.container.appendChild(grid);
  }
}

// 초기화
const calendarContainer = document.getElementById("calendar-container");
const calendar = new Calendar(calendarContainer);

// 샘플 일정
calendar.schedules["2025-12-03"] = [{title:"회의"}, {title:"점심"}];
calendar.schedules["2025-12-15"] = [{title:"출장"}];
calendar.render();