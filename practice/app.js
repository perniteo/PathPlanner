
console.log("Hello from JavaScript!");
alert("프론트엔드 프로젝트 시작!");

const button = document.getElementById("myButton");

button.addEventListener("click", () => {
alert("버튼을 클릭했네?");
alert("버튼을 클릭했네???6");
alert("버튼을 클릭했네???5");
alert("버튼을 클릭했네???4");
alert("버튼을 클릭했네???3");
alert("버튼을 클릭했네???2");
alert("버튼을 클릭했네???1");
console.log("버튼 클릭 했대");})

button.addEventListener("click", () => {
alert("버튼을 클릭했네??");
console.log("버튼 클릭 했대");})

let counter = 0;

const countDisplay = document.getElementById("count");

document.getElementById("plusBtn").addEventListener("click", () => {
counter++;
countDisplay.innerText = counter;})

document.getElementById("minusBtn").addEventListener("click", () => {
counter--;
countDisplay.innerText = counter;})