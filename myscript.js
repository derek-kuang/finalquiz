let questionURL =  "questions.json" //"https://opentdb.com/api.php?amount=10&difficulty="
let apikey = 'G9AuluhuBroHJZH514Or4Rztm4FgAHX67Ao98d9qH7IDjXwh4jGTt0Qi'
let score = 0
const answerArray = []




async function fetchEasy(){
    const response = await fetch(questionURL) //+ "easy")
    const data = await response.json()
    console.log(data)
    for(var b = 0; b < data.results.length; b++){
        var query = data.results[b].correct_answer //+ "  " + data.results[b].category
        console.log(query)
        fetchImage(query, b)
        }
    
        showQuestions(data)

    document.getElementById("buttons").style.display = "none";

}








async function fetchMedium(){
    const response = await fetch(questionURL + "medium")
    const data = await response.json()
    console.log(data)
    for(var b = 0; b < data.results.length; b++){
        var query = data.results[b].correct_answer //+ "  " + data.results[b].category
        console.log(query)
        fetchImage(query, b)
        }
    
        showQuestions(data)

        document.getElementById("buttons").style.display = "none";

}


async function fetchHard(){
    const response = await fetch(questionURL + "hard")
    const data = await response.json()
    console.log(data)
    
    for(var b = 0; b < data.results.length; b++){
    var query = data.results[b].correct_answer //+ "  " + data.results[b].category
    console.log(query)
    await fetchImage(query, b)
    
    }

    await showQuestions(data)

    document.getElementById("buttons").style.display = "none";


}




async function showQuestions(data){
    document.getElementById("main").innerHTML = ""
    console.log("data")
    console.log(data)


    for(var l = 0; l < data.results.length; l++){
        answerArray.push(data.results[l].correct_answer)
    }

    console.log(answerArray)

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

        console.log(shuffle)
        elemQuestion.innerHTML += data.results[num].question + '<br> <br>' 
        for(var s = 0; s < shuffle.length; s++){
            var elemButton = document.createElement("button")
            elemButton.id = "answers"
            elemButton.innerText += shuffle[s]
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
        console.log("data")
        console.log(data)
        document.getElementById("q"+ b).innerHTML += '<img src=' + data.photos[0].src.medium + '>  '
        
      })
    }

//end

//https://medium.com/@codepicker57/building-an-interactive-quiz-with-html-css-and-javascript-efe9bd8129e2

function buttonClick(b){
    let selectedButton = b.target
    //https://www.freecodecamp.org/news/check-if-an-item-is-in-an-array-in-javascript-js-contains-with-array-includes/#:~:text=You%20can%20use%20the%20includes,the%20item%20doesn't%20exist.
    if(answerArray.includes(selectedButton.innerText)){
        score++
    }
    //end
    console.log(selectedButton.innerText)
    console.log(score)
}

//end
