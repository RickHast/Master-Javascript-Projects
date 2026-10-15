class Quiz {
    constructor (quizTitle) {
        this.quizTitle = quizTitle
    }

    getQuizContainer() {
        const JSONQuiz = localStorage.getItem('quiz')
        const quizContainer = JSON.parse(JSONQuiz)

        if (quizContainer === null){
            return {}
        }else {
            return quizContainer
        }
    }

    saveQuizContainer(quizQuestionDict) {
        const quizContainer = this.getQuizContainer()
        if (quizQuestionDict === ''){
            return
        }
        if (quizContainer[this.quizTitle] === undefined){
            // Spread
            quizContainer[this.quizTitle] = [{...quizQuestionDict}]
            alert("New Question added successfully")
        } else {
            let count = 0
            quizContainer[this.quizTitle].forEach((questionDict) => {
                if (questionDict.questionText !== quizQuestionDict.questionText){
                    count++
                }
            })

            if (count === quizContainer[this.quizTitle].length){
                // Spread
                alert("New Question added successfully")
                quizContainer[this.quizTitle].push({...quizQuestionDict})
            } else {
                alert('this question already Exist in this quiz')
            }
        }

        const JSONQuiz = JSON.stringify(quizContainer)
        localStorage.setItem('quiz', JSONQuiz)
    }

    getQuizNames() {
        const JSONQuizNames = localStorage.getItem("quizNames")
        const quizNames = JSON.parse(JSONQuizNames)

        if (quizNames === null) {
            return []
        } else {
            return quizNames
        }
    }

    saveQuizNames(quizNames) {
        const JSONQuizNames = JSON.stringify(quizNames)
        localStorage.setItem("quizNames", JSONQuizNames)
    }

    deleteQuiz(quizTitle) {
        const quizContainer = this.getQuizContainer()
        delete quizContainer[quizTitle]
        // Spread
        const quizNames = [...this.getQuizNames()]
        const newQuizNames = quizNames.filter((names) => names !== quizTitle)

        const JSONQuiz = JSON.stringify(quizContainer)
        localStorage.setItem('quiz', JSONQuiz)

        const score = this.getScore()
        delete score[quizTitle]
        this.saveScore(score)

        const JSONQuizNames = JSON.stringify(newQuizNames)
        localStorage.setItem('quizNames', JSONQuizNames)
    }

    propositionsSetup(el, propoText, isAnswer, answered, goodAnswer, oneQuizQuestions) {
        el.textContent = propoText
        el.addEventListener('click', (e) => {
            if (!answered.clicked) {
                if (isAnswer) {
                    el.textContent = `${propoText} ✔️`
                    el.style.color = 'aquamarine'
                    answered.currentScore++
                } else {
                    el.textContent = `${propoText} ❌`
                    el.style.color = 'lightsalmon'
                    const goodAnswerEl = document.createElement('p')
                    goodAnswerEl.textContent = `Correct Answer : ${goodAnswer[0].propoText}`
                    oneQuizQuestions.appendChild(goodAnswerEl)
                }
                
                answered.clicked = true
            }
            
        })
    }

    currentQuestion(oneQuizQuestions, quizTitle, nextQuestionButton, actualQuestion, currentScore, questionsListLength) {
        oneQuizQuestions.textContent = ''
        const h2Title = document.createElement('h2')
        h2Title.textContent = quizTitle
        oneQuizQuestions.appendChild(h2Title)

        if (actualQuestion === undefined) {
            const h3Message = document.createElement('h3')
            const h3SecondMessage = document.createElement('h3')
            const score = this.getScore()
            const currentQuizScores = score[quizTitle]
            const pourcentage = Math.floor((currentScore/questionsListLength) * 100)
            h3Message.textContent = `Quiz Completed as ${pourcentage}%`
            h3SecondMessage.textContent = `You completed ${currentScore}/${questionsListLength} questions`

            const returnToTheLobby = document.createElement('button')
            returnToTheLobby.addEventListener('click', (e) => {
                location.reload()
            })
            returnToTheLobby.textContent = 'Return to the menu'
            oneQuizQuestions.appendChild(h3Message)
            oneQuizQuestions.appendChild(h3SecondMessage)
            oneQuizQuestions.appendChild(returnToTheLobby)

            if (currentQuizScores.length === 5){
                currentQuizScores.shift()
            }

            currentQuizScores.push({
                currentScore: currentScore,
                questionsListLength: questionsListLength
            })
            score[quizTitle] = currentQuizScores
            this.saveScore(score)
            return
        }

        // Rest
        const {questionText, ...propositions} = actualQuestion
        
        const questionDiv = document.createElement('div')
        const textQuestion = document.createElement('h3')
        textQuestion.textContent = questionText
        const answered  = {clicked: false, currentScore: currentScore}

        const propositionsDiv = document.createElement('div')
        propositionsDiv.classList.add('proposition-div')


        const goodAnswer = Object.values(propositions).filter((propo) => propo.isAnswer)

        for (let i = 0; i < Object.values(propositions).length; i++) {
            const propo = Object.values(propositions)
            if (propo[i].propoText !== '') {
                const propositionEl = document.createElement('p')
                // Destructuring
                const { propoText, isAnswer } = propo[i]
                this.propositionsSetup(propositionEl, propoText, isAnswer, answered, goodAnswer, oneQuizQuestions)
                propositionsDiv.appendChild(propositionEl)
                propositionEl.classList.add('proposition')
            }
        }

        questionDiv.appendChild(textQuestion)
        questionDiv.appendChild(propositionsDiv)

        oneQuizQuestions.appendChild(questionDiv)
        oneQuizQuestions.appendChild(nextQuestionButton)
        return answered
    }

    shuffleQuestionsList(questionLsit) {
        // spread
        const shuffled = [...questionLsit]

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }

        return shuffled
    }

    displayQuestions(oneQuizQuestions, quizTitle) {
        const actualQuiz = this.getQuizContainer()
        const questionsList = this.shuffleQuestionsList(actualQuiz[quizTitle])

        const questionsListLength = questionsList.length
        let currentIndex = 0
        let actualQuestion = questionsList[currentIndex]

        let currentScore = 0

        const nextQuestionButton = document.createElement('button')
        nextQuestionButton.textContent = 'Next Question'

        let answered = this.currentQuestion(oneQuizQuestions, quizTitle, nextQuestionButton, actualQuestion, currentScore, questionsListLength)

        nextQuestionButton.addEventListener('click', (e) => {
            if (currentIndex <= questionsListLength - 1) {
                if (answered.clicked) {
                    currentIndex++
                    currentScore = answered.currentScore
                    actualQuestion = questionsList[currentIndex]
                    answered = this.currentQuestion(oneQuizQuestions, quizTitle, nextQuestionButton, actualQuestion, currentScore, questionsListLength)
                }else{
                    alert('Select a proposition first!')
                }
            }else {
                return
            }            
        })
    }

    displaysQuiz(allQuizContainer, allQuizDiv, quizQuestion, oneQuizQuestions) {
        allQuizContainer.textContent = ''
        // spread
        const quizNames = [...this.getQuizNames()]
        const h2 = document.createElement('h2')
        if (quizNames.length === 0) {
            h2.textContent = "You haven't any quiz here. Add a quiz if you want!"
        } else {
            h2.textContent = `There are ${quizNames.length} quiz in the quiz Builder`
        }
        allQuizContainer.appendChild(h2)
        
        quizNames.forEach((names) => {
            const nameIndex = quizNames.indexOf(names) + 1
            const quizDiv = document.createElement('div')
            quizDiv.classList.add("quiz-div")

            const titleDiv = document.createElement('div')
            titleDiv.classList.add("title-div")
            const quizTitle = document.createElement('h3')
            quizTitle.textContent = `${nameIndex}. ${names}`

            const lastFiveScoresDiv = document.createElement('div')
            lastFiveScoresDiv.classList.add("last-scores-div")
            const score = this.getScore()
            const fivesScores = score[names]
            const h3Message = document.createElement('h3')

            const quiz = this.getQuizContainer()
            const questionsList = quiz[names]

            if (fivesScores === undefined) {
                h3Message.textContent = "You don't have any recent score in this quiz"
                lastFiveScoresDiv.appendChild(h3Message)
            }else{
                if (fivesScores.length === 0){
                    h3Message.textContent = "You don't have any recent score in this quiz"
                    lastFiveScoresDiv.appendChild(h3Message)
                }else {
                    h3Message.textContent = 'Recent 5 scores: '
                    lastFiveScoresDiv.appendChild(h3Message)
                    const scoresDiv = document.createElement('div')
                    scoresDiv.classList.add("scores-div")
                    fivesScores.forEach((aScore) => {
                        const p = document.createElement('p')
                        const pourcentage = Math.floor((aScore.currentScore / aScore.questionsListLength) * 100)
                        p.textContent = `${pourcentage}%`
                        scoresDiv.appendChild(p)
                    })
                    lastFiveScoresDiv.appendChild(scoresDiv)
                }
            }

            const removeQuizButton = document.createElement('button')

            titleDiv.addEventListener('click', (e) => {
                if (questionsList === undefined){
                    alert("Have no question in this quiz, Enter his title in the createQuiz and add a question to it!")
                    return
                }
                this.displayQuestions(oneQuizQuestions, names)

                const score = this.getScore()
                if (score[names] === undefined) {
                    score[names] = []
                    this.saveScore(score)
                }

                allQuizDiv.classList.add('no-display')
                quizQuestion.classList.remove('no-display')
            })

            removeQuizButton.textContent = 'Remove this Quiz'
            removeQuizButton.addEventListener('click', (e) => {
                this.deleteQuiz(names)
                location.reload()
            })

            titleDiv.appendChild(quizTitle)

            quizDiv.appendChild(titleDiv)
            quizDiv.appendChild(lastFiveScoresDiv)
            quizDiv.appendChild(removeQuizButton)

            allQuizContainer.appendChild(quizDiv)
        })
    }

    getScore() {
        const JSONScore = localStorage.getItem('score')
        const score = JSON.parse(JSONScore)

        if (score === null){
            return {}
        } else {
            return score
        }
    }

    saveScore(score) {
        const JSONScore = JSON.stringify(score)
        localStorage.setItem('score', JSONScore)
    }
}

class Question {
    constructor(questionText, proposition1, proposition2, proposition3, proposition4) {
        this.questionText = questionText,
        this.proposition1 = proposition1,
        this.proposition2 = proposition2,
        this.proposition3 = proposition3,
        this.proposition4 = proposition4
    }

    addQuestion() {
        const questionDict = {
            questionText: this.questionText,
            proposition1: this.proposition1,
            proposition2: this.proposition2,
            proposition3: this.proposition3,
            proposition4: this.proposition4
        }

        return questionDict
    }
}