const quizTitleForm = document.querySelector("#quiz-title-form")
const quizTitle = document.querySelector("#quiz-title")
let quizTitleValue = quizTitle.value.trim()

const createQuizQuestionsDiv = document.querySelector("#create-quiz-questions")
const h2QuizTitle = document.querySelector("#h2-quiz-title")
const createQuestionForm = document.querySelector("#create-question-form")

const questionText = document.querySelector("#question-text")

const proposition1 = document.querySelector("#proposition1")
const proposition1Radio = document.querySelector("#proposition1Radio")

const proposition2 = document.querySelector("#proposition2")
const proposition2Radio = document.querySelector("#proposition2Radio")

const proposition3 = document.querySelector("#proposition3")
const proposition3Radio = document.querySelector("#proposition3Radio")

const proposition4 = document.querySelector("#proposition4")
const proposition4Radio = document.querySelector("#proposition4Radio")

const allQuizDiv = document.querySelector("#all-quiz-div")
const quizQuestion = document.querySelector("#one-question")



const allQuizContainer = document.querySelector("#all-quiz")
const oneQuizQuestions = document.querySelector("#one-quiz-questions")

const quiz = new Quiz(quizTitleValue)
quiz.displaysQuiz(allQuizContainer, allQuizDiv, quizQuestion, oneQuizQuestions)

quizTitleForm.addEventListener("submit", (e) => {
    e.preventDefault()
    quizTitleValue = quizTitle.value.trim()

    if (quizTitleValue === '') {
        alert('Enter a valid name for this quiz title')
        return
    }

    h2QuizTitle.textContent = `Quiz Title: ${quizTitleValue}`
    const quizNames = quiz.getQuizNames()
    if(!quizNames.includes(quizTitleValue)){
        quizNames.push(quizTitleValue)
    }
    quiz.saveQuizNames(quizNames)
    quiz.displaysQuiz(allQuizContainer, allQuizDiv, quizQuestion, oneQuizQuestions)
    createQuizQuestionsDiv.classList.remove('no-display')
    //oneQuizQuestions.classList.remove('no-display')
})

createQuestionForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const questionTextValue = questionText.value.trim()

    const proposition1Value = proposition1.value.trim()
    const proposition1RadioValue = proposition1Radio.checked

    const proposition2Value = proposition2.value.trim()
    const proposition2RadioValue = proposition2Radio.checked

    const proposition3Value = proposition3.value.trim()
    const proposition3RadioValue = proposition3Radio.checked

    const proposition4Value = proposition4.value.trim()
    const proposition4RadioValue = proposition4Radio.checked

    const propositionNumValidation = [
        proposition1Value,
        proposition2Value,
        proposition3Value,
        proposition4Value
    ]

    const proposition1Dict = {
        propoText: proposition1Value,
        isAnswer: proposition1RadioValue
    }

    const proposition2Dict = {
        propoText: proposition2Value,
        isAnswer: proposition2RadioValue
    }

    const proposition3Dict = {
        propoText: proposition3Value,
        isAnswer: proposition3RadioValue
    }

    const proposition4Dict = {
        propoText: proposition4Value,
        isAnswer: proposition4RadioValue
    }

    let validationCount = 0

    propositionNumValidation.forEach((propo) => {
        if (propo !== '') {
            validationCount ++
        }
    })

    if (questionTextValue === '') {
        alert("Hey! Enter a text for your this quiz-question!")
        return
    }

    if (validationCount < 2){
        alert("Enter minimum 2 propositions for your question!")
        return
    }

    let propo
    let propoRadio

    if (proposition1RadioValue){
        propo = proposition1Value
        propoRadio = proposition1RadioValue
    } else if (proposition2RadioValue){
        propo = proposition2Value
        propoRadio = proposition2RadioValue
    } else if (proposition3RadioValue){
        propo = proposition3Value
        propoRadio = proposition3RadioValue
    } else if (proposition4RadioValue){
        propo = proposition4Value
        propoRadio = proposition4RadioValue
    }

    if (!(proposition1RadioValue || proposition2RadioValue || proposition3RadioValue || proposition4RadioValue)){
        alert("Please check the radio for the good proposition(answer) for your question!")
        return
    }else{
        if (propo === '' && propoRadio === true){
            alert("Check the radio for a proposition with valid text value!")
            return
        }
    }

    const newQuiz = new Quiz(quizTitleValue)
    const newQuizQuestion = new Question(questionTextValue, proposition1Dict, proposition2Dict, proposition3Dict, proposition4Dict)
    const questionDict =  newQuizQuestion.addQuestion()
    newQuiz.saveQuizContainer(questionDict)
    newQuiz.displaysQuiz(allQuizContainer, allQuizDiv, quizQuestion, oneQuizQuestions)
    questionText.value = ''
    proposition1.value = ''
    proposition2.value = ''
    proposition3.value = ''
    proposition4.value = ''
    proposition1Radio.checked = false
    proposition2Radio.checked = false
    proposition3Radio.checked = false
    proposition4Radio.checked = false
})
