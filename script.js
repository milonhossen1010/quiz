//Get all elements
let startBtn = document.querySelector("#start_btn");
let restartBtn = document.querySelector("#restart");
let startSection = document.querySelector("#startSection");
let questionSection = document.querySelector("#questionSection");
let question = document.querySelector("#questionSection .question");
let nextBtn = document.querySelector("#next");
let count = document.querySelector(".quiz-modal__progress-current");
let result = document.querySelector("#result");
let correct_ans = document.querySelector("#correct_ans");
let incorrect_ans = document.querySelector("#incorrect_ans");
let score = document.querySelector(".quiz-modal__results-score");
let correctSound = document.querySelector("#correctSound");
let wrongSound = document.querySelector("#wrongSound");


//Start function
startBtn.onclick = e => {
  questionSection.style.display = "block";
  startSection.style.display = "none";
}

//Ajax request
let xmhttp = new XMLHttpRequest();
xmhttp.onload = function(){
  localStorage.questions = this.response;
}

xmhttp.open("GET", "questions.json");
xmhttp.send();

//Get question
function getQuestions(){
  return JSON.parse(localStorage.questions);
}
let all_questions = getQuestions();





//Load questions
function loadQuestion(index=0){
  question.innerHTML = `<header class="quiz-modal__header">${all_questions[index].question}</header>
  <main class="quiz-modal__body">
    <button  class="quiz-modal__option "  value="John">${all_questions[index].options[0]}</button>
    <button  class="quiz-modal__option" value="Solid Snake">${all_questions[index].options[1]}</button>
    <button  class="quiz-modal__option" value="David">${all_questions[index].options[2]}</button>
    <button  class="quiz-modal__option" value="Huey">${all_questions[index].options[3]}</button>
  </main>`;
  count.innerHTML = `<span>${all_questions[index].id}</span> / <span>${all_questions.length}</span>`;

  if(index==all_questions.length-1){
    nextBtn.innerHTML = "Finished";
  }else{
    nextBtn.innerHTML = "Next";
  }

  //Click the options
  let opt =  question.querySelectorAll("button.quiz-modal__option");

  for(let i=0; i< opt.length; i++){
    opt[i].setAttribute("onClick", "getAns(this, "+ index +")");
  }
 


}
loadQuestion();


//Set info
let item = 0;
let result_mark = 0;

//Next question
nextBtn.onclick = ()=> {
  //Audio pause
  correctSound.pause();
  correctSound.currentTime = 0;
  wrongSound.pause();
  wrongSound.currentTime = 0;

 //Add class next button
 nextBtn.classList.add("quiz-modal__btn--disabled");
 nextBtn.setAttribute("disabled", "");

  if(item<all_questions.length-1){
    item++; 
    loadQuestion(item);
    
  } else{
  
    result.style.display = "block";
    questionSection.style.display="none";
    
  }
  
}


//Get ans 
function getAns(ans, index){
  let opt =  question.querySelectorAll("button.quiz-modal__option");

  let user_ans = ans.textContent;
  let right_ans = all_questions[index].ans;
 
  //Correct ans
  if(user_ans == right_ans){
    result_mark += 1;
    ans.classList.add("quiz-modal__option--correct");
    correctSound.play();
  }else{
    ans.classList.add("quiz-modal__option--incorrect");
    wrongSound.play();
    for(let i=0; i< opt.length; i++){
      if(opt[i].textContent == right_ans){
        opt[i].classList.add("quiz-modal__option--correct");
      }
    }
  }

 //Disable options
 for(let i=0; i< opt.length; i++){
   opt[i].setAttribute("disabled", "");
 }

 //Remove next button class
 nextBtn.classList.remove("quiz-modal__btn--disabled");
 nextBtn.removeAttribute("disabled");

 //Result show
correct_ans.innerHTML=result_mark;
incorrect_ans.innerHTML=Math.floor(all_questions.length - result_mark);
score.innerHTML=Math.floor((result_mark /all_questions.length ) * 100 ) + "%";
  console.log(all_questions.length );
}


//Restart 
restartBtn.onclick = ()=>{
  questionSection.style.display = "block";
  result.style.display = "none";
  item=0;
  result_mark=0;
  
  loadQuestion();
}