## 구현 내용

### 1. Calendar.js

- **클래스 구조**
    - `constructor(container)` : 초기 상태 세팅, render 호출
    - `render()` : 달력 UI 렌더링
    - `attachControls()` : 이전/다음 달 버튼 이벤트
    - `renderMonthSelect()` : 월 선택 select 박스
    - `highlightSelectedCell()` : 선택된 날짜 하이라이트 유지

- **주요 변경 사항**
    - `todos` 직접 참조 제거 → main.js에서 상태 관리
    - 날짜 클릭 시 `selectedDate` 전역 변수 사용 → render 후 selected 유지
    - highlight 시 has-schedule 유지 → classList.add/remove 사용
    - 월 변경, select 변경 시 render 호출 → month/year 상태 업데이트 후 render

---

### 2. main.js

- **전역 상태**
```js
let selectedDate = null;
let todos = {}; // { "2025-12-13": [{id, text, completed}] }
```
--- 

- **LocalStorage 처리**

  - loadTodos() : 저장된 todos 불러오기

  - saveTodos() : todos를 localStorage에 저장

- **초기화**

    - Calendar 초기화

    - 오늘 날짜 선택 후 selectedDate 세팅

    - renderTodos() 호출

    - Calendar.highlightSelectedCell() 호출

    - Calendar.render() 호출 후 todos 존재하면 has-schedule 표시

- **클릭 이벤트 처리**

    - Calendar 클릭 → selectedDate 업데이트 → renderTodos() 호출 → highlightSelectedCell() 호출

    - Todo CRUD 시 render 후 has-schedule 클래스 갱신

### 3. todo.js

CRUD 구현

| 기능 | 구현 방식 |

|------|-----------|

| Create | 입력값 + 날짜 기준 todos 배열에 push |

| Read | renderTodos()에서 selectedDate 기준 목록 렌더 |

| Update (완료 체크) | todos 배열에서 completed true/false로 갱신, render 후 has-schedule 유지 |

| Delete | 해당 id의 todo 제거, render 후 has-schedule 갱신 |

반복 기능

반복 주기 설정 가능 (선택적, MVP 수준은 간단한 daily/weekly 등)

### 4. UI 구성
   UI 요소	구현 사항
   달력 날짜 셀	.date-cell 생성, 클릭 이벤트 바인딩
   selected 날짜	selected 클래스 추가, render() 시 항상 체크
   has-schedule	todos 존재 시 class 추가, render() 후 main.js에서 처리
   Todo 목록	선택된 날짜 기준 ul에 li 생성, 완료 체크 버튼, 삭제 버튼 포함
### 5. 사소한 버그/수정 사항

calendarContainer 중복 선언 → main.js에서는 절대 재선언하지 않음

selectedDate, todos 전역 선언 → Calendar.js 클릭 이벤트에서 참조 가능

render() 시 기존 DOM 초기화 문제 → selected 유지, has-schedule main.js에서 갱신

highlightSelectedCell()에서 classList만 사용 → 다른 class 유지

### 6. 현재 구조 특징

Calendar는 UI 렌더 + 월 이동 + 클릭 이벤트만 담당

Todo는 상태 관리 + CRUD 담당

main.js는 전역 상태 관리 + Calendar ↔ Todo 연동

LocalStorage 연동으로 데이터 영속성 확보

render() 최소화 구조는 추후 리팩토링 예정

### 7. 다음 단계 아이디어

반복 일정 기능 정교화

완료 체크 시 시각적 효과 추가

달력 ↔ Todo 반반 연동 개선 (selected 날짜만 update)

render() 최소화 구조 리팩토링 → DOM 전체 초기화 제거

UI 개선 (모바일 반응형, 달력 디자인)

### 8. Notes

현재 MVP 기준으로 render()가 달력 전체를 초기화하지만, selected 하이라이트와 has-schedule 유지하도록 처리

추후 refactoring 시, 필요한 부분만 update하는 구조로 변경 예정