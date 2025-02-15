let questionURL = "https://opentdb.com/api.php?amount=10&difficulty="
let apikey = 'G9AuluhuBroHJZH514Or4Rztm4FgAHX67Ao98d9qH7IDjXwh4jGTt0Qi'
let score = 0
let qAnswered = 0
let gameFinished = false
const fetchArr = []
const answerArray = []


// load the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }, function(error) {
        console.log('Service Worker registration failed:', error);
      });
    });
  }  


// handle install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
}); 


function selectCategory(){
  let category = document.getElementById("selector").value
  fetchArr.push(category)
  console.log(category)
  document.getElementById("selector").style.display = "none"
  document.getElementsByClassName("fetch")[0].style.display = "inline"
  document.getElementsByClassName("fetch")[1].style.display = "inline"
  document.getElementsByClassName("fetch")[2].style.display = "inline"
}



function fetchEasy(){
    fetchArr.push("easy")
    fetchQuestions()
}

async function fetchMedium(){
  fetchArr.push("medium")
  fetchQuestions()
}


async function fetchHard(){
  fetchArr.push("hard")
  fetchQuestions()

}

async function fetchQuestions(){
  console.log(fetchArr)
  try{
    const response = await fetch(questionURL + "&category=" + fetchArr[0] + "&difficulty=" + fetchArr[1] + "&type=multiple")
    const data = await response.json()
    console.log(data)
    for(var b = 0; b < data.results.length; b++){
        var query = data.results[b].correct_answer //+ "  " + data.results[b].category
        fetchImage(query, b)
        }
    
        showQuestions(data)

    document.getElementById("buttons").style.display = "none";
    timer(75)
      }catch{
        alert("Fetch failed, check your internet connection or try again in 5 seconds")
      }
}


async function showQuestions(data){
    document.getElementById("main").innerHTML = ""
    document.getElementById("main").style.display = "block"

    document.getElementById("footer").style.display = "block"


    for(var l = 0; l < data.results.length; l++){
        answerArray.push(data.results[l].correct_answer)
    }


    let num = 0
    for(var a = 0; a < data.results.length; a++){
        var elemQuestion = document.createElement("div")
        elemQuestion.id = "q" + num
        elemQuestion.innerHTML += '<br>'

        document.getElementById("main").appendChild(elemQuestion)


        //https://coureywong.medium.com/how-to-shuffle-an-array-of-items-in-javascript-39b9efe4b567

        const shuffle = [...data.results[num].incorrect_answers, data.results[num].correct_answer]
        shuffle.sort(() => Math.random() - 0.5)

        //end

        elemQuestion.innerHTML += data.results[num].question + '<br> <br>' 
        for(var s = 0; s < shuffle.length; s++){
            var elemButton = document.createElement("button")
            elemButton.classList = "answers" + a
            elemButton.innerHTML += shuffle[s]
            document.getElementById("main").appendChild(elemButton)
            elemButton.addEventListener("click", (b) => buttonClick(b ))
                   
        }

        // elemQuestion.innerHTML += '<button class="correct">' + data.results[num].correct_answer + '</button>' + '<br>'
        // for(var i = 0; i < data.results[num].incorrect_answers.length; i++){
        //     elemQuestion.innerHTML += '<button class="incorrect">' + data.results[num].incorrect_answers[i] + '</button>' + '<br>'
        
        // }
        num = num + 1
    }  
    

}



//https://medium.com/star-gazers/how-to-work-pexels-api-with-javascript-9cda16bbece9





async function fetchImage(query, b){
    fetch('https://api.pexels.com/v1/search?per_page=1&query=' + query, {
        headers: {
            Authorization: apikey
        }
    })
    .then(resp => {
        return resp.json()
      })
      .then(data => {
        document.getElementById("q"+ b).innerHTML += '<img src=' + data.photos[0].src.medium + '>  '
        
      })
    }

//end

//https://medium.com/@codepicker57/building-an-interactive-quiz-with-html-css-and-javascript-efe9bd8129e2

function buttonClick(b){
    let selectedButton = b.target
    let elemClass = selectedButton.classList
    document.getElementsByClassName(elemClass.value)[0].style.display = "none"
    document.getElementsByClassName(elemClass.value)[1].style.display = "none"
    document.getElementsByClassName(elemClass.value)[2].style.display = "none"
    document.getElementsByClassName(elemClass.value)[3].style.display = "none"
    qAnswered++
    
    //https://www.freecodecamp.org/news/check-if-an-item-is-in-an-array-in-javascript-js-contains-with-array-includes/#:~:text=You%20can%20use%20the%20includes,the%20item%20doesn't%20exist.
    if(answerArray.includes(selectedButton.innerText)){
        //https://stackoverflow.com/questions/12953928/immediate-play-sound-on-button-click-in-html-page
        var correct = new Audio("correct.mp3")
        correct.play()
        score++
        //end
    }else{
        var incorrect = new Audio("incorrect.mp3")
        incorrect.play()
    }

    if(qAnswered == 10){
        finishGame(score)
    }
}

//end

function finishGame(score){
    document.getElementById("footer").style.display = "none"
    document.getElementById("main").innerHTML = "Your score: " + score
    document.getElementById("main").innerHTML += "<br>" + "Thanks for playing!"
    gameFinished = true
}

//https://www.freecodecamp.org/news/how-to-create-a-countdown-timer/ for base timer code + edits of my own

function timer(seconds) {
  let counter = seconds;

  const interval = setInterval(() => {
    document.getElementById("timer").style.display = "block"
    document.getElementById("timer").innerHTML = counter
    counter--;

    if(gameFinished == true){
      document.getElementById("timer").style.display = "none"
      clearInterval(interval);
    }

    if(counter < 10){
      document.getElementById("timer").style.backgroundColor = "red"
    }

    if (counter < 0 && gameFinished == false) {
      clearInterval(interval);
      document.getElementById("footer").style.display = "none"
      document.getElementById("main").innerHTML = "Out of time!"
      document.getElementById("timer").style.display = "none"
    }
  }, 1000);
}
