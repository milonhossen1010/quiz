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
startBtn.onclick = (e) => {
  questionSection.style.display = "block";
  startSection.style.display = "none";
  getQuestions();
  timeCountDown(10);
};

//Ajax request
let xmhttp = new XMLHttpRequest();
xmhttp.onload = function () {
  localStorage.questions = this.response;
};

xmhttp.open("GET", "questions.json");
xmhttp.send();

//Get question
function getQuestions() {
  let data = [
    {
      id: "1",
      question: "ঈমান কমা-বাড়া সম্পর্কে আকিদা কী?",
      ans: "কমে এবং বাড়ে",
      options: [
        "কমে কিন্তু বাড়ে না",
        "কমে এবং বাড়ে",
        "কমে না কিন্তু বাড়ে",
        "কমে না, বাড়েও না",
      ],
    },
    {
      id: "2",
      question:
        "কুরআনে এমন কিসের কথা বর্ণিত হয়েছে যে শ্বাস ছাড়ে কিন্তু প্রাণ নেই?",
      ans: "সকাল",
      options: ["সূর্য", "চাঁদ", "সকাল", "রাত"],
    },
    {
      id: "3",
      question: "ইয়াতিমের সম্পদ আত্মসাৎ করা কী খাওয়ার নামান্ত?",
      ans: "আগুন",
      options: ["ময়লা-আবর্জনা", "কয়লা", "আগুন", "পাথর"],
    },
    {
      id: "4",
      question:
        "কোন পাখির মাধ্যমে আল্লাহ তা’আলা মানবজাতিকে দাফন শিক্ষা দিয়েছেন?",
      ans: "কাক",
      options: ["ঘুঘু", "হুদহুদ", "কবুতর", "কাক"],
    },
    {
      id: "5",
      question:
        "রাসুলূরল্লাহ সা. কত সময়ের মাধ্যে সম্পূর্ণ কুরআন তিলাওয়াত খতম করতে নিষেধ করেছেন?",
      ans: "৩ দিনের কম সময়ে",
      options: [
        "১ দিনের কম সময়ে",
        "২ দিনের কম সময়ে",
        "৩ দিনের কম সময়ে",
        "১ সপ্তাহের কমে",
      ],
    },
    {
      id: "6",
      question: "কোন ব্যক্তির ঘাড় কিয়ামতের দিন সবচেয়ে লম্বা হবে?",
      ans: "মুয়াযযিনের",
      options: ["আলিমের", "ইমামের", "বিনয়ী ব্যক্তির", "মুয়াযযিনের"],
    },
    {
      id: "7",
      question: "কথা সত্য উদ্দেশ্য খারাপ-এটি কাদেরকে উদ্দেশ্য করে বলা হয়?",
      ans: "খারেজি",
      options: ["শিয়া", "খারেজি", "আহালে কুরআন", "কাদিয়ানী"],
    },
    {
      id: "8",
      question: "ঈসা আ. শেষে জামানায় আগমন করে নিম্নের কোন কাজটি করবেন?",
      ans: "সবগুলো",
      options: [
        "দাজ্জালকে হত্য করবেন",
        "ক্রশ ভেঙ্গে ফেলবেন এবং দাজ্জালকে হত্য করবেন",
        "দাজ্জালকে হত্য করবেন এবন শুকর নিধণ করবেন",
        "সবগুলো",
      ],
    },
    {
      id: "9",
      question: "বই খোলা রাখলে শয়তান পড়ে- এটি মূলত কি?",
      ans: "কুসংস্কার",
      options: ["কুসংস্কার", "বিদা’আত", "হাদিসের কথা", "মনীষীর উক্তি"],
    },
    {
      id: "10",
      question: "আহারের সময় সালাম দেওয়ার বিধান কী?",
      ans: "জায়িয",
      options: ["বিদ’আত", "জায়িয", "হারাম", "মাকরুহ"],
    },
  ];

  return data;
}

let all_questions = getQuestions();

//Load questions
function loadQuestion(index = 0) {
  question.innerHTML = `<header index="${index}" style="padding-right: 120px;" class="quiz-modal__header">${all_questions[index].question} <span style="position: absolute;right: 30px;">Time : <span class="count_time"> 10</span>s</span></header>
  <main class="quiz-modal__body">
    <button  class="quiz-modal__option "  value="John">${all_questions[index].options[0]}</button>
    <button  class="quiz-modal__option" value="Solid Snake">${all_questions[index].options[1]}</button>
    <button  class="quiz-modal__option" value="David">${all_questions[index].options[2]}</button>
    <button  class="quiz-modal__option" value="Huey">${all_questions[index].options[3]}</button>
  </main>`;
  count.innerHTML = `<span>${all_questions[index].id}</span> / <span>${all_questions.length}</span>`;

  if (index == all_questions.length - 1) {
    nextBtn.innerHTML = "Finished";
  } else {
    nextBtn.innerHTML = "Next";
  }

  //Click the options
  let opt = question.querySelectorAll("button.quiz-modal__option");

  for (let i = 0; i < opt.length; i++) {
    opt[i].setAttribute("onClick", "getAns(this, " + index + ")");
  }
}
loadQuestion(0);

//Set info
let item = 0;
let result_mark = 0;

//Next question
nextBtn.onclick = () => {
  //Audio pause
  correctSound.pause();
  correctSound.currentTime = 0;
  wrongSound.pause();
  wrongSound.currentTime = 0;

  //Add class next button
  nextBtn.classList.add("quiz-modal__btn--disabled");
  nextBtn.setAttribute("disabled", "");

  if (item < all_questions.length - 1) {
    item++;
    loadQuestion(item);
  } else {
    result.style.display = "block";
    questionSection.style.display = "none";
  }

  timeCountDown(10);
};
// timeCountDown(10);

//Get ans
function getAns(ans, index) {
  clearInterval(setIn);
  let opt = question.querySelectorAll("button.quiz-modal__option");
  let user_ans = ans.textContent;
  let right_ans = all_questions[index].ans;

  //Correct ans
  if (user_ans == right_ans) {
    result_mark += 1;
    ans.classList.add("quiz-modal__option--correct");
    correctSound.play();
  } else {
    ans.classList.add("quiz-modal__option--incorrect");
    wrongSound.play();
    for (let i = 0; i < opt.length; i++) {
      if (opt[i].textContent == right_ans) {
        opt[i].classList.add("quiz-modal__option--correct");
      }
    }
  }

  //Disable options
  for (let i = 0; i < opt.length; i++) {
    opt[i].setAttribute("disabled", "");
  }

  //Remove next button class
  nextBtn.classList.remove("quiz-modal__btn--disabled");
  nextBtn.removeAttribute("disabled");

  //Result show
  correct_ans.innerHTML = result_mark;
  incorrect_ans.innerHTML = Math.floor(all_questions.length - result_mark);
  score.innerHTML =
    Math.floor((result_mark / all_questions.length) * 100) + "%";
}

//Restart
restartBtn.onclick = () => {
  // questionSection.style.display = "block";
  // result.style.display = "none";
  item = 0;
  result_mark = 0;
  timeCountDown(10);
  loadQuestion();
  location.reload();
};

let setIn;
//Time count
function timeCountDown(timeIndex) {
  let timeCount = document.querySelector(".count_time");
  let question_index = document.querySelector(".quiz-modal__header");
  question_index.getAttribute("index");

  setIn = setInterval(function () {
    timeCount.innerHTML = timeIndex;
    timeIndex--;

    let opt = question.querySelectorAll("button.quiz-modal__option");
    let right_ans = all_questions[question_index.getAttribute("index")].ans;

    if (timeIndex < 0) {
      clearInterval(setIn);
      //Disable options
      for (let i = 0; i < opt.length; i++) {
        opt[i].setAttribute("disabled", "");
        console.log(opt[i].innerText);
      }
      //Remove next button class
      nextBtn.classList.remove("quiz-modal__btn--disabled");
      nextBtn.removeAttribute("disabled");

      //Right answare show
      // let user_ans = all_questions[question_index.getAttribute("index")].ans;
   
      
      //Correct ans
      // if(user_ans == right_ans){
      //   ans.classList.add("quiz-modal__option--correct");

      // }else{
      //   ans.classList.add("quiz-modal__option--incorrect");

      //   for(let i=0; i< opt.length; i++){
      //     if(opt[i].textContent == right_ans){
      //       opt[i].classList.add("quiz-modal__option--correct");
      //     }
      //   }
      // }
    }
  }, 1000);
}
