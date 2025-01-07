let questionURL = "https://opentdb.com/api.php?amount=10&difficulty="


async function fetchEasy(){
    const response = await fetch(questionURL + "easy")
    const data = await response.json()
    console.log(data)
    showEasy(data)
}

async function fetchMedium(){
    const responseMedium = await fetch(questionURL + "medium")
    const dataMedium = await responseMedium.json()
    console.log(dataMedium)
}

async function fetchHard(){
    const responseHard = await fetch(questionURL + "hard")
    const dataHard = await responseHard.json()
    console.log(dataHard)
}

function showEasy(data){
    document.getElementById("question").innerHTML = data.results[0].question
    document.getElementById("answers").innerHTML = data.results[0].correct_answer + '<br>' 
    for(var i = 0; i < data.results[0].incorrect_answers.length; i++){
        document.getElementById("answers").innerHTML += data.results[0].incorrect_answers[i] + '<br>'
    }
}