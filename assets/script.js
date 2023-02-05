//Declaring varialble to get the respective class IDs
var landingpage = document.getElementById("landing-page");
var startQuizz = document.getElementById("start-Quiz");
var quizquestion = document.getElementById("quiz-ques");
var question = document.getElementById("questions");
var timertext = document.getElementById("timer-text");
var btnback = document.querySelector(".btn-back")
var btnclearhsr = document.querySelector(".btn-clear")
var timercount;
var vhs = document.getElementById("vhs");
var answer1 = document.getElementById("choice1");
var answer2 = document.getElementById("choice2");
var answer3 = document.getElementById("choice3");
var answer4 = document.getElementById("choice4");
var checkAnswer = document.getElementById("check-answer");
var endpage = document.getElementById("end-page");
var finalscore = document.getElementById("final-score");
var initialsbox = document.getElementById("initials");
var submitscore = document.getElementById("sumbit-score");
var hsrpage = document.getElementById("hsr-page");
var hslist = document.getElementById("hs-list");
var end = document.getElementById("end");
var score = 0;
var QuesIndx = 0
var Questioncount=1
timertext.textContent =0;
var action = document.querySelectorAll(".Mchoices");

//Quiz questions set
var quizques = [
    { question: 'What is Javascript?', 
      answer: '1. Object-Based language', 
      MChoice: [ '1. Object-Based language',  '2. Assembly language', '3. Object-Oriented language',  '4. High-level language']
    },
    { question: 'Which of the following is not javascript data types?', 
      answer: '4. All of above', 
      MChoice: [ '1. Null type',  '2. Undefined type',  '3. Number type',  '4. All of above']
    },
    { question: 'Which one of the following also known as Conditional Expression:', 
      answer:  '4. immediate if', 
      MChoice: [ '1.  Alternative to if-else',  '2. Switch statement',  '3. If-then-else statement',  '4. immediate if']
    },
    { question: 'What syntax would call a function?', 
      answer: '4. immediate if', 
      MChoice: [ '1. var function',  '2. function',  '3. If-then-else statement',  '4. immediate if']
    },
    { question: 'What is function and var?', 
      answer: '3. Declaration statements', 
      MChoice: [ '1. Keywords',  '2. Data types',  '3. Declaration statements',  '4. Prototypes']
    },
    { question: 'What is DOM ?', 
      answer: '2. Document Object Model', 
      MChoice: ['1. Do Overnight Modules',  '2. Document Object Model',  '3. Divas Obviously Model',  '4. Do Oo Mo']
    },
    { question: 'Which of the following number object function returns the value of the number?', 
      answer: '2. valueOf()', 
      MChoice: [ '1. toString()',  '2. valueOf()',  '3. toLocaleString()',  '4. toPrecision()']
    },
  ];

  function start(){
    landingpage.style.display= "none";
    var elements = document.querySelectorAll(".Mchoices")
    elements.forEach(el=> el.style.display="block");
    QuesIndx =0
    setQuestion(QuesIndx)
    }

    function startTimer()
    {
       timercount =75;
        var timertick = setInterval(function() {
            timertext.textContent = timercount;
         timercount--

        if(timercount <=0){
          clearInterval(timertick);
          end.textContent = "All Done!!";
          gameOver();

         } else if (Questioncount >= quizques.length +1) {
          clearInterval(timertick);
          gameOver();            
         }
      
        },1000);
      }
      
      var setQuestion = function(n) {
        question.textContent = quizques[n].question;
        answer1.textContent = quizques[n].MChoice[0];
        answer2.textContent = quizques[n].MChoice[1];
        answer3.textContent = quizques[n].MChoice[2];
        answer4.textContent = quizques[n].MChoice[3];
        QuesIndx = n;
    }
  
//When answer choices are clicked, correct or wrong is displayed
function checkAnswers(event) {
  event.preventDefault();
  checkAnswer.style.display = "block";
  setTimeout(function () {
    checkAnswer.style.display = 'none';
  }, 1000);
  //console.log(quizques[QuesIndx].answer);
  //console.log(event.target.innerHTML);
  //console.log(event.target);
  var Picked = (event.target);
  if (quizques[QuesIndx].answer == Picked.innerHTML) {
    checkAnswer.textContent = "Correct ✅"; 
      score = score + 5;

  } else {
    score = score -1;
    timercount = timercount - 10;
    checkAnswer.textContent = "Wrong ❌";
  }
  //Next question is displayed
  //console.log(QuesIndx);
  //console.log(quizques.length -1);
  if (QuesIndx < quizques.length -1 ) {
    setQuestion(QuesIndx +1);
} else {
  gameOver();
}
Questioncount++;
}

function gameOver() {
//Displays Scores and stops the timer
  quizquestion.style.display = "none";
  endpage.style.display = "block";
  finalscore.textContent = "Your final score is : " + score ;
  timertext.style.display = "none"; 
};

// below function gets score from local storage
function results () {
  var userresults =localStorage.getItem("scorenow");
  if (userresults !== null ){
      updatedresults = JSON.parse(userresults);
      return updatedresults;
     } 
     else {updatedresults= [];
          }
      return updatedresults;
};

//Displays userscores to the Endpage
function saveScoreL (){
  hslist.innerHTML ="";
  hslist.style.display="block";
  var highScores = sort();   
// Top twenty scores will be displayed 
  var toptwenty = highScores.slice(0,20);
        for (var i = 0; i < toptwenty.length; i++) {
             var item = toptwenty[i];
             var p =document.createElement("p");
             p.textContent = item.user + " - " + item.score;
             p.setAttribute("data-index", i);
             hslist.appendChild(p);
}
};

function sort(){ var List = results();
  if (results == null ){
      return;
  } else{
  List.sort(function(a,b){
      return a.score - b.score;
  })
  return List;
}};

// Inital input and current quiz score is added to local storage.
function local (n) {
  var addedList = results();
  addedList.push(n);
  localStorage.setItem("scorenow", JSON.stringify(addedList));
};

// Inital input and current quiz score is saved to local storage.
function saveLocal () {
  var scoreItem ={
      user: initialsbox.value,
      score: score
  }
  local(scoreItem);
  saveScoreL();
}

//When Start Quiz button is clicked, 1 question at a time is displayed and timer starts
startQuizz.addEventListener("click",startTimer);
startQuizz.addEventListener("click",start);

//When any of answers are clicked, answer is validated to be correct or wrong
action.forEach(function(click){
click.addEventListener("click", checkAnswers);
});

//Onclick of Submit button, displays list of scores
  submitscore.addEventListener("click", function(event) {
  event.preventDefault();
  endpage.style.display = "none";
  landingpage.style.display = "none";
  quizquestion.style.display ="none";
  hsrpage .style.display = "block";
  
  saveLocal();
});

//On click of View Highscore button, list of score page is displayed
  vhs.addEventListener("click", function(event) {
    event.preventDefault();
    endpage.style.display = "none";
  landingpage.style.display = "none";
  quizquestion.style.display ="none";
  hsrpage .style.display = "block";
  
  saveScoreL();
});

//On click og Back button, Landing page is displayed
  btnback.addEventListener("click",function(event){
  endpage.style.display = "none";
  hsrpage.style.display = "none";
  quizquestion.style.display ="none";
  landingpage.style.display = "block";
  event.preventDefault();
  location.reload();
});

//On click of Clear high score button, list of scores is cleared
  btnclearhsr.addEventListener("click",function(event) {
  localStorage.clear();
  event.preventDefault();
  saveScoreL();
});
