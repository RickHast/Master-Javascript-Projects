const optionsContainer = document.querySelector('#options-container')

const generatePasswordRadio = document.querySelector('#gene-pass-input')
const verifyPasswordSecurityRadio = document.querySelector('#verify-pass-input')

generatePasswordRadio.addEventListener('click', (e) => {
    const generatePasswordRadioValue = generatePasswordRadio.checked
    optionsContainer.textContent = ''
    checkboxesContainer.textContent = ''
    renderGeneratePasswordOption()

})

verifyPasswordSecurityRadio.addEventListener('click', (e) => {
    const passwordOutput = document.querySelector('#password-output')
    optionsContainer.textContent = ''
    checkboxesContainer.textContent = ''
    passwordOutput.textContent = ''

    addChekboxes()
    passwordOutput.classList.remove('appears')
    testingInput()
})

/*
    const imgCode = charCode(1, 7)
    const currentImg = `images/${imgCode}.jpeg`

    document.body.style.backgroundImage = `url(${currentImg})`
*/

