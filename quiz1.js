// // QUIZ DATA
// const quizData = [
//   { 
//     question: "1. HTML stands for?",
//     options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tag Making Language"],
//     answer: 0
//   },
//   {
//     question: "2. CSS stands for?",
//     options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheet", "Creative Style System"],
//     answer: 0
//   },
//   {
//     question: "3. Which tag is used for the largest heading?",
//     options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;head&gt;", "&lt;header&gt;"],
//     answer: 1
//   },
//   {
//     question: "4. Which HTML tag is used to create a link?",
//     options: ["&lt;header&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;click&gt;"],
//     answer: 1
//   },
//   {
//     question: "5. CSS property to change text color?",
//     options: ["font-color", "text-style", "color", "background-color"],
//     answer: 2
//   },
//   {
//     question: "6. HTML tag to insert an image?",
//     options: ["&lt;img&gt;", "&lt;pic&gt;", "&lt;image&gt;", "&lt;src&gt;"],
//     answer: 0
//   },
//   {
//     question: "7. CSS property to change font size?",
//     options: ["font-size", "text-size", "size", "font-style"],
//     answer: 0
//   },
//   {
//     question: "8. Which tag creates an Ordered list?",
//     options: ["&lt;ul&gt;", "&lt;list&gt;", "&lt;item&gt;", "&lt;ol&gt;"],
//     answer: 3
//   },
//   {
//     question: "9. Which CSS is correct syntax?",
//     options: ["body:color=red;", "body {color:red;}", "{body:color=red;}", "body = red;"],
//     answer: 1
//   },
//   {
//     question: "10. div is a ___ tag?",
//     options: ["Inline", "Self Closing", "Block", "Heading"],
//     answer: 2
//   }
// ];

// let currentIndex = 0;
// let userAnswers = {};
// const questionText = document.getElementById("question");
// const optionsBox = document.getElementById("options");
// const nextBtn = document.getElementById("nextBtn");
// const prevBtn = document.getElementById("prevBtn");
// const container = document.querySelector(".container");

// let timerSeconds = 120; //in a secend//
// let timerInterval;
// const timerText = document.getElementById("timer");

// // ---------------- Profile Picture ----------------
// const profilePic = document.getElementById("profilePic");
// const uploadInput = document.getElementById("uploadInput");
// if(localStorage.getItem("profileImage")) profilePic.src = localStorage.getItem("profileImage");
// profilePic.addEventListener("click",()=>uploadInput.click());
// uploadInput.addEventListener("change",function(){
//   const file = this.files[0];
//   const reader = new FileReader();
//   reader.onload = function(){ profilePic.src = reader.result; localStorage.setItem("profileImage", reader.result); };
//   reader.readAsDataURL(file);
// });

// // ---------------- Timer Functions ----------------
// function startTimer(){
//   if(timerInterval) clearInterval(timerInterval);
//   if(timerText) timerText.textContent = timerSeconds;
//   if(timerText) timerText.style.color="#d21e1eff";

//   timerInterval = setInterval(()=>{
//     timerSeconds--;
//     if(timerText) timerText.textContent = timerSeconds;
//     if(timerSeconds <= 10 && timerText) timerText.style.color="red";
//     if(timerSeconds <= 0){ clearInterval(timerInterval); Swal.fire("⏳ Time's up!","Your quiz time is over","warning"); showResult(); }
//   },1000);
// }

// // ---------------- Load Question ----------------
// function loadQuiz(){
//   const current = quizData[currentIndex];
//   questionText.textContent = current.question;
//   optionsBox.innerHTML = "";

//   current.options.forEach((opt,i)=>{
//     const div = document.createElement("div");
//     div.classList.add("option");
//     div.innerHTML = `<label><input type="radio" name="option" value="${i}"> ${opt}</label>`;
//     optionsBox.appendChild(div);
//   });

//   nextBtn.disabled = true;
//   prevBtn.disabled = currentIndex===0;

//   if(userAnswers[currentIndex]!==undefined){
//     document.querySelector(`input[value="${userAnswers[currentIndex]}"]`).checked=true;
//     nextBtn.disabled=false;
//   }
// }

// // ---------------- Option Select ----------------
// optionsBox.addEventListener("change",(e)=>{
//   userAnswers[currentIndex]=parseInt(e.target.value);
//   nextBtn.disabled=false;
// });

// // ---------------- Next Button ----------------
// nextBtn.addEventListener("click",()=>{
//   if(currentIndex<quizData.length-1){ currentIndex++; loadQuiz(); } 
//   else{ showResult(); }
// });

// // ---------------- Prev Button ----------------
// prevBtn.addEventListener("click",()=>{
//   if(currentIndex>0){ currentIndex--; loadQuiz(); }
// });

// // ---------------- Show Result ----------------
// function showResult(){
//   clearInterval(timerInterval);
//   let score=0;
//   quizData.forEach((q,i)=>{ if(userAnswers[i]===q.answer) score++; });
//   if(score===10){
//     Swal.fire({ title:"🎉 Congratulations! 🎉", text:"Perfect Score! 10 / 10", background:"#d6e5eaff", icon:"success", showConfirmButton:true });
//   } else{
//     Swal.fire({ title:"Quiz Completed!", text:`Your Score: ${score} / 10`, icon:"info",background:"#eedc12ff", showConfirmButton:true });
//   }
//   showResultButtons();
// }

// // ---------------- Show Result Buttons ----------------
// function showResultButtons(){
//   container.innerHTML+=`
//     <div id="resultBtns" style="margin-top:20px; text-align:center;">
//       <button id="seeAnswersBtn" style="background:#3498db; color:white; padding:10px 20px; border:none; border-radius:6px; margin:5px;">See Your Answers</button>
//       <button id="restartBtn" style="background:#27ae60; color:white; padding:10px 20px; border:none; border-radius:6px; margin:5px;">Start Quiz Again</button>
//     </div>
//   `;
//   document.getElementById("seeAnswersBtn").onclick=showAnswers;
//   document.getElementById("restartBtn").onclick=restartQuiz;
// }

// // ---------------- Show Answers ----------------
// function showAnswers(){
//   container.innerHTML="<h2>📘 Your Answers Review</h2>";
//   quizData.forEach((q,i)=>{
//     const userAns=userAnswers[i];
//     const correct=q.answer;
//     container.innerHTML+=`
//       <div style="margin:10px 0; padding:15px; background:#f3f3f3; border-radius:10px;">
//         <h3>${q.question}</h3>
//         ${q.options.map((opt,j)=>{
//           let color="";
//           if(j===correct) color="background:#c8ffc8;";
//           if(j===userAns && userAns!==correct) color="background:#ffbdbd;";
//           return `<p style="padding:8px; border-radius:5px; ${color}">${opt}</p>`;
//         }).join("")}
//       </div>
//     `;
//   });
//   container.innerHTML+=`<button onclick="restartQuiz()" style="padding:12px 20px; background:#27ae60; color:white; border:none; border-radius:6px; margin-top:20px;">Start Quiz Again</button>`;
// }

// // ---------------- Restart Quiz ----------------
// function restartQuiz(){ location.reload(); }

// // ---------------- Popup before quiz ----------------
// Swal.fire({
//   title:"Are you Ready for Quiz?",
//   text:"You will have 2 minutes to complete the quiz!",
//   icon:"question",
//   background:"#c1dce6ff",
//   showCancelButton:true,
//   confirmButtonText:"Yes, Start Quiz",
// }).then((result)=>{
//   if(result.isConfirmed){
//     loadQuiz();
//     startTimer(); // start overall timer
//   } else{
//     Swal.fire("Quiz Cancelled","You can start again later","info");
//   }
// });

// ---------------- Quiz Data ----------------
const quizData = [
  { question: "1. HTML stands for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tag Making Language"], answer: 0 },
  { question: "2. CSS stands for?", options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheet", "Creative Style System"], answer: 0 },
  { question: "3. Which tag is used for the largest heading?", options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;head&gt;", "&lt;header&gt;"], answer: 1 },
  { question: "4. Which HTML tag is used to create a link?", options: ["&lt;header&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;click&gt;"], answer: 1 },
  { question: "5. CSS property to change text color?", options: ["font-color", "text-style", "color", "background-color"], answer: 2 },
  { question: "6. HTML tag to insert an image?", options: ["&lt;img&gt;", "&lt;pic&gt;", "&lt;image&gt;", "&lt;src&gt;"], answer: 0 },
  { question: "7. CSS property to change font size?", options: ["font-size", "text-size", "size", "font-style"], answer: 0 },
  { question: "8. Which tag creates an Ordered list?", options: ["&lt;ul&gt;", "&lt;list&gt;", "&lt;item&gt;", "&lt;ol&gt;"], answer: 3 },
  { question: "9. Which CSS is correct syntax?", options: ["body:color=red;", "body {color:red;}", "{body:color=red;}", "body = red;"], answer: 1 },
  { question: "10. div is a ___ tag?", options: ["Inline", "Self Closing", "Block", "Heading"], answer: 2 }
];

let currentIndex = 0;
let userAnswers = {};
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const container = document.querySelector(".container");

let timerSeconds = 120;
let timerInterval;
const timerText = document.getElementById("timer");

// ---------------- Profile Picture ----------------
const profilePic = document.getElementById("profilePic");
const uploadInput = document.getElementById("uploadInput");
if (localStorage.getItem("profileImage")) profilePic.src = localStorage.getItem("profileImage");
profilePic.addEventListener("click", () => uploadInput.click());
uploadInput.addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function () { profilePic.src = reader.result; localStorage.setItem("profileImage", reader.result); };
  reader.readAsDataURL(file);
});

// ---------------- Timer Functions ----------------
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  if (timerText) timerText.textContent = timerSeconds;
  if (timerText) timerText.style.color = "#27ae60";
  timerInterval = setInterval(() => {
    timerSeconds--;
    if (timerText) timerText.textContent = timerSeconds;
    if (timerSeconds <= 10 && timerText) timerText.style.color = "red";
    if (timerSeconds <= 0) { clearInterval(timerInterval); Swal.fire("⏳ Time's up!", "Your quiz time is over", "warning"); showResult(); }
  }, 1000);
}

// ---------------- Load Question ----------------
function loadQuiz() {
  const current = quizData[currentIndex];
  questionText.textContent = current.question;
  optionsBox.innerHTML = "";

  current.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.innerHTML = `<label><input type="radio" name="option" value="${i}"> ${opt}</label>`;
    optionsBox.appendChild(div);
  });

  nextBtn.disabled = true;
  prevBtn.disabled = currentIndex === 0;

  if (userAnswers[currentIndex] !== undefined) {
    document.querySelector(`input[value="${userAnswers[currentIndex]}"]`).checked = true;
    nextBtn.disabled = false;
  }
}

// ---------------- Option Select ----------------
optionsBox.addEventListener("change", (e) => {
  userAnswers[currentIndex] = parseInt(e.target.value);
  nextBtn.disabled = false;
});

// ---------------- Next Button ----------------
nextBtn.addEventListener("click", () => {
  if (currentIndex < quizData.length - 1) { currentIndex++; loadQuiz(); }
  else { showResult(); }
});

// ---------------- Prev Button ----------------
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) { currentIndex--; loadQuiz(); }
});

// ---------------- Show Result ----------------
function showResult() {
  clearInterval(timerInterval);
  let score = 0;
  quizData.forEach((q, i) => { if (userAnswers[i] === q.answer) score++; });
  Swal.fire({ title: "Quiz Completed!", text: `Your Score: ${score} / 10`, icon: "info", background: "#eedc12ff", showConfirmButton: true });
  showResultButtons();
}

// ---------------- Show Result Buttons ----------------
function showResultButtons() {
  container.innerHTML += `
    <div id="resultBtns" style="margin-top:20px; text-align:center;">
      <button id="seeAnswersBtn" style="background:#3498db; color:white; padding:10px 20px; border:none; border-radius:6px; margin:5px;">See Your Answers</button>
      <button id="restartBtn" style="background:#27ae60; color:white; padding:10px 20px; border:none; border-radius:6px; margin:5px;">Start Quiz Again</button>
    </div>
  `;
  document.getElementById("seeAnswersBtn").onclick = showAnswers;
  document.getElementById("restartBtn").onclick = restartQuiz;
}

// ---------------- Show Answers ----------------
function showAnswers() {
  container.innerHTML = "<h2>📘 Your Answers Review</h2>";
  quizData.forEach((q, i) => {
    const userAns = userAnswers[i];
    const correct = q.answer;
    container.innerHTML += `
      <div style="margin:10px 0; padding:15px; background:#f3f3f3; border-radius:10px;">
        <h3>${q.question}</h3>
        ${q.options.map((opt, j) => {
      let color = "";
      if (j === correct) color = "background:#c8ffc8;";
      if (j === userAns && userAns !== correct) color = "background:#ffbdbd;";
      return `<p style="padding:8px; border-radius:5px; ${color}">${opt}</p>`;
    }).join("")}
      </div>
    `;
  });
  container.innerHTML += `<button onclick="restartQuiz()" style="padding:12px 20px; background:#27ae60; color:white; border:none; border-radius:6px; margin-top:20px;">Start Quiz Again</button>`;
}

// ---------------- Restart Quiz ----------------
function restartQuiz() { location.reload(); }

// ---------------- Popup before quiz ----------------
Swal.fire({
  title: "Are you Ready for Quiz?",
  text: "You will have 2 minutes to complete the quiz!",
  icon: "question",
  background: "#c1dce6ff",
  showCancelButton: true,
  confirmButtonText: "Yes, Start Quiz",
}).then((result) => {
  if (result.isConfirmed) {
    loadQuiz();
    startTimer();
  } else {
    Swal.fire("Quiz Cancelled", "You can start again later", "info");
  }
});

