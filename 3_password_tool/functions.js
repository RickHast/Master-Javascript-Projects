
const passwordOptionsContainer = document.querySelector('#options-container')

const checkboxesContainer = document.querySelector('#checkboxes-container')

// popup 

const togglePopup = function () {
    let popup = document.querySelector('#popup-overlay')
    popup.classList.toggle('open')
}

const popup = function (titleMessage, bodyMessage) {
    const realPopup = document.querySelector('.popup-content')
    realPopup.textContent = ''
    const popupTitle = document.createElement('h2')
    popupTitle.textContent = titleMessage

    const popupBody = document.createElement('p')
    popupBody.textContent = bodyMessage

    const closeButton = document.createElement('button')
    closeButton.textContent = 'Close'
    closeButton.addEventListener('click', (e) => {
        togglePopup()
    })

    realPopup.appendChild(popupTitle)
    realPopup.appendChild(popupBody)
    realPopup.appendChild(closeButton)

}


// Password Generator functions
const choosePasswordLength = function (inputId){
    const lengthInput = document.createElement("input")
    lengthInput.id = inputId
    lengthInput.setAttribute('type', 'number')
    lengthInput.placeholder = 'Enter a number'

    passwordOptionsContainer.appendChild(lengthInput)
}

const inputChecboxs = function (label, checkboxId) {
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.id = checkboxId

    const checkboxLabel = document.createElement('label')
    checkboxLabel.textContent = label

    const checkboxDiv = document.createElement('div')
    checkboxDiv.appendChild(checkbox)
    checkboxDiv.appendChild(checkboxLabel)
    checkboxDiv.id = 'check-id'

    checkboxesContainer.appendChild(checkboxDiv)
}

const generateButton = function () {
    const button = document.createElement('button')
    button.textContent = 'Generate'
    button.addEventListener('click', (e) => {
        generatePassword() 
        togglePopup()
    })

    passwordOptionsContainer.appendChild(button)
}

function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
        function () {
            popup('Password copied !', 'The password is actually copied in your clipboard')
        },
        function () {
            popup('Error: the password isn\'t copied', 'Retry please')
            return
        } 
    )
}

const copyPasswordIntoClipboard = function (finalPassword) {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state == "granted" || result.state == "prompt") {
            updateClipboard(finalPassword)
        }
    })
}

const charCode = function (min, max) {
    const code = Math.floor(Math.random() * (max - min + 1))+ min

    return code
}
const addCharPass = function (password, code) {
    const char = String.fromCharCode(code)
    password.push(char)
}

const caseFunction = function (password, principal, other1, other2, other3) {
    if(principal !== 0){
        addCharPass(password, principal)
    }else if(other1 !== 0){
        addCharPass(password, other1)
    }else if(other2 !== 0){
        addCharPass(password, other2)
    }else if(other3 !== 0){
        addCharPass(password, other3)
    }
}

const addChekboxes = function () {
    const checkboxesContainer = document.querySelector('#checkboxes-container')
    checkboxesContainer.classList.add('appears')
}

const addPasswordOutput = function () {
    const passwordOutput = document.querySelector('#password-output')
    passwordOutput.classList.add('appears')
}

const generatePassword = function () {
    const passwordLengthIpnutValue = document.querySelector('#pass-length-input').value
    const uppercaseValue = document.querySelector('#uppercase').checked
    const lowercaseValue = document.querySelector('#lowercase').checked
    const numbers = document.querySelector('#numbers').checked
    const symboles = document.querySelector('#symboles').checked

    if (passwordLengthIpnutValue > 40){
        popup('Password Length Error: ', 'Your password length must be smaller than 50')
        return
    }

    const password = []

    let upperCode = 0
    let lowerCode = 0
    let numCode = 0
    let symCode = 0


    if (!(uppercaseValue || lowercaseValue || numbers || symboles)){
        popup('Letters Error', 'You must Checked one checkbox to Generate your password')
        return
    }

    if (passwordLengthIpnutValue === '0' || passwordLengthIpnutValue === '') {
        popup("Password Lenght Error", 'Please enter a number superior than 0 for the password length in the input !')
        return
    }

    // Math.floor(Math.random() * (max - min + 1)) + min

    for (let i = 0; i < passwordLengthIpnutValue; i++){
        const rand = Math.floor(Math.random() * 4) + 1

        
        if (uppercaseValue){
            upperCode = charCode(65, 90)
        }
        
        if(lowercaseValue){
            lowerCode = charCode(97, 122)
        }

        if(numbers){
            numCode = charCode(48, 57)
        }

        if(symboles){
            symCode = charCode(33, 47)
        }
        
        switch (rand) {
            case 1:
                caseFunction(password, upperCode, lowerCode, numCode, symCode)
                break

            case 2:
                caseFunction(password, lowerCode, upperCode, numCode, symCode)
                break

            case 3:
                caseFunction(password, numCode, lowerCode, upperCode, symCode)
                break

            case 4:
                caseFunction(password, symCode, lowerCode, numCode, upperCode)
                break
        }

    }

    const finalPassword = password.join("")
    if (finalPassword !== "") {
        addPasswordOutput()
        const passwordOutput = document.querySelector('#password-output')
        passwordOutput.textContent = ''

        const h2 = document.createElement('h2')
        h2.textContent = 'This is your password:'

        const p = document.createElement('p')
        p.textContent = finalPassword

        const copyButton = document.createElement('button')
        copyButton.textContent = 'Copy'
        copyButton.addEventListener('click', (e) => {
            copyPasswordIntoClipboard(finalPassword)
            togglePopup()
        })

        passwordOutput.appendChild(h2)
        passwordOutput.appendChild(p)
        passwordOutput.appendChild(copyButton)

        popup('your Password is generate', 'Go and click on the copy button to copy')

    }

}

    // Render Generate Password Option
const renderGeneratePasswordOption = function () {
    choosePasswordLength('pass-length-input')
    inputChecboxs('Uppercase letter', 'uppercase')
    inputChecboxs('Lowercase letter', 'lowercase')
    inputChecboxs('Numbers', 'numbers')
    inputChecboxs('Symboles', 'symboles')
    addChekboxes()
    generateButton()
}

// Password sécurity tester functions

const testingInput = function () {
    const h2 = document.createElement('h2')
    h2.textContent = 'Here you can test your password Strength'

    const p = document.createElement('p')
    p.textContent = 'Just enter your password in the input'

    const input = document.createElement('input')
    input.placeholder = 'Enter your password here'
    input.addEventListener('input', (e) => {
        testingFuntion(e.target.value)
    })

    checkboxesContainer.appendChild(h2)
    checkboxesContainer.appendChild(p)
    checkboxesContainer.appendChild(input)
}

const testingFuntion = function (userPassword) {

    const password = userPassword
    const passwordLength = password.length

    let lengthGrade = ''
    let lengthColor = ''

    if (passwordLength > 0){
        lengthGrade = 'Very Short'
        lengthColor = 'red'
    }
    
    if (passwordLength >= 8){
        lengthGrade = 'Short'
        lengthColor = 'crimson'
    }
    
    if (passwordLength >= 12){
        lengthGrade = 'Medium'
        lengthColor = 'orange'
    }
    
    if (passwordLength >= 18){
        lengthGrade = 'Big'
        lengthColor = 'yellow'
    }
    
    if (passwordLength >= 25){
        lengthGrade = 'Very big'
        lengthColor = 'green'
    }

    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumbers = /[0-9]/.test(password)
    const hasSymbols = /[!@?#$%^&*]/.test(password)

    let securityGrade = ''
    let securityStyle = ''

    let SecurityNum = 0

    if(hasUppercase){
        SecurityNum += 1
    }

    if(hasLowercase){
        SecurityNum += 1
    }

    if(hasNumbers){
        SecurityNum += 1
    }

    if(hasSymbols){
        SecurityNum += 1
    }

    switch (SecurityNum) {
        case 1:
            securityGrade = 'Very Weak'
            securityStyle = 'red'
            break
        case 2:
            securityGrade = 'Weak'
            securityStyle = 'orange'
            break
        case 3:
            securityGrade = 'Medium'
            securityStyle = 'yellow'
            break
        case 4:
            securityGrade = 'Strong'
            securityStyle = 'green'
            break
    }

    const securityContainer = document.querySelector('#security-container')
    securityContainer.textContent = ''

    if (passwordLength !== 0){
        const firstMessage = document.createElement('p')
        firstMessage.textContent = `Your password length is ${lengthGrade}`
        firstMessage.style.color = lengthColor

        const secondMessage = document.createElement('p')
        secondMessage.textContent = `Your password Sécurity is ${securityGrade}`
        secondMessage.style.color = securityStyle

        securityContainer.appendChild(firstMessage)
        securityContainer.appendChild(secondMessage)
    }
}
