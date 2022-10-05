var instructionEl = document.querySelector("#instruction");
var startEl = document.querySelector(".start");
var timerEl = document.querySelector(".timer");
var choiceEl = document.querySelector(".choices");
var scoreEl = document.querySelector(".score");
var scoreSectionEl = document.querySelector("#scoreSection");
var scorelistEl = document.querySelector("#scorelist");
var usernameEl = document.querySelector("#username");
var saveEl = document.querySelector("#save");

var savedNames = [];
var savedScores = [];
var timer = 60;
var answer = "";
var questionList = [];
var count = 0;
var timeDisplay;

function quizStart () 
{
  document.querySelector(".description").classList.add("hidden");
  document.querySelector(".record").classList.add("hidden");
  choiceEl.classList.remove("hidden");
  countdown();
  startEl.setAttribute("style", "display: none");

  questionList[0] = ['What is 9 + 10?', '19', '910', '21', 'window', '3']
  questionList[1] = ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Justin Timberlake', 'Rick Astley', 'Justin Bieber', 'Rick Ross', '2'];
  questionList[2] = ['When was Harambe killed?', 'May 28th, 2016', 'May 17th, 2017', 'June 6th, 2006', 'Today', '1'];
  questionList[3] = ['Who is always hiding his pain?', 'Henry', 'Harry', 'Arnold', 'Harold', '4'];
  questionList[4] = ['In this famous meme, a blue car drifts into a exit. What exit number does he take?', '21', '12', '45', '112', '2'];
  nextQuestion(questionList[count]);
}

function countdown() 
{
  timeDisplay= setInterval(function () {
    timer--;
    timerEl.textContent = timer + " seconds left";
    if (timer === 0) 
    {
      clearInterval(timeDisplay);
      instructionEl.textContent = "Time is up!";
      choiceEl.classList.add("hidden");
      timer = 60;
      count = 0;
      startEl.setAttribute("style", "display: unset");
    }
  }, 1000);
}

function nextQuestion(input) {
  if (timer <= 0) 
  {
    result();
  } 
  else 
  {
    if (count < questionList.length) 
    {
    count = count + 1;
    instructionEl.textContent = input[0];
    for (let i = 1; i < input.length - 1; i++) 
    {
      choiceEl.children[i - 1].textContent = input[i];
    }
    answer = input[questionList.length];
    } 
    else result();
  }
}

function result() 
{
  clearInterval(timeDisplay);
  document.querySelector(".troll").classList.add("hidden");
  document.querySelector(".response").classList.add("hidden");
 
  instructionEl.textContent = "Your Score is: " + timer;
    choiceEl.classList.add("hidden");
    scoreEl.classList.remove("hidden");
    timerEl.textContent = "";
}

function submit()
 {
  var score = timer;
  var name = usernameEl.value.trim();
  if (name === "") 
  {
    return;
  }
  else if (JSON.parse(localStorage.getItem("historyName")) !== null && JSON.parse(localStorage.getItem("historyScore")) !== null) 
  {
    savedNames = JSON.parse(localStorage.getItem("historyName"));
    savedScores = JSON.parse(localStorage.getItem("historyScore"));
  }
  savedNames.push(name);
  savedScores.push(score);

  saveScore();
  scoreList();
}

function saveScore() 
{
  localStorage.setItem("historyName", JSON.stringify(savedNames));
  localStorage.setItem("historyScore", JSON.stringify(savedScores));
}

function scoreList() 
{
  scoreSectionEl.classList.remove("hidden");
  scoreEl.classList.add("hidden");
  scorelistEl.textContent = "";
  for (var i = 0; i < savedNames.length; i++) 
  {
    var initial = savedNames[i];
    var numberScore = savedScores[i];

    var li = document.createElement("li");
    li.textContent = initial + ": " + numberScore;
    li.setAttribute("data-index", i);

    scorelistEl.appendChild(li);
  }
}

function scoresBtn() 
{
  document.querySelector(".front").classList.add("hidden");
  document.querySelector(".troll").classList.add("hidden");
  savedNames = JSON.parse(localStorage.getItem("historyName"));
  savedScores = JSON.parse(localStorage.getItem("historyScore"));
  document.querySelector(".record").classList.add("hidden");
  scoreList();
}

function reset() 
{
  savedNames = [];
  savedScores = [];
  localStorage.clear();
  scoreList();
}

function reload() 
{
  document.location.reload();
}

choiceEl.addEventListener("click", function (event) 
{
  var element = event.target;
  var state = element.getAttribute("data-state");

  if(state == null)
  {
    return;
  }
  else if (state !== answer) 
  {
    timer-= 10;
    document.querySelector(".response").textContent = "Incorrect!";
    nextQuestion(questionList[count]);
  } else 
  {
    timer+= 5;
    document.querySelector(".response").textContent = "Correct!";
    nextQuestion(questionList[count]);
  }
});

startEl.addEventListener("click", quizStart);
scoreEl.classList.add("hidden");
choiceEl.classList.add("hidden");
scoreSectionEl.classList.add("hidden");
saveEl.addEventListener("click", submit);
document.querySelector(".record").addEventListener("click", scoresBtn);
document.querySelector("#reset").addEventListener("click", reset);
document.querySelector("#restart").addEventListener("click", reload);