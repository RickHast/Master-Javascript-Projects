const amountInput = document.querySelector('#amount-input')
const categorySelect = document.querySelector('#category-select')
const description = document.querySelector('#description')
const generalTotal = document.querySelector('#general-total')
const expensesListDiv = document.querySelector('#expense-list')
const selectFilter = document.querySelector('#filter-select')

const options = Array.from(categorySelect.options)

const categoryList = []

options.forEach((option) => {
    categoryList.push(option.value)
})
const expenseTracker = new ExpenseTracker(categoryList)
const expensesList = expenseTracker.getExpenses(generalTotal)

expensesListDiv.textContent = ''
expensesList.forEach((expense) => {
    expense.displayExpenses(expensesListDiv)
})

expenseTracker.categoryFilter(selectFilter, expensesListDiv, generalTotal)

document.querySelector("#form").addEventListener('submit', (e) => {
    e.preventDefault()
    const amountInputValue = amountInput.value
    const categorySelectValue = categorySelect.value
    const descriptionValue = description.value
    const id = crypto.randomUUID()
    if (amountInputValue === '' || parseInt(amountInputValue) <= 0){
        alert('Please Enter a number greater than 0 for the amount')
    }else {
        const expenseDate = new Date().getTime()
        const newExpenseTracker = new ExpenseTracker(categoryList)

        const newExpensesList = newExpenseTracker.getExpenses(generalTotal)

        let existCounter = 0
        newExpensesList.forEach((expense) => {
            if (expense.description !== descriptionValue || expense.category !== categorySelectValue || expense.amount !== amountInputValue){
                existCounter += 1
            }
        })

        if (existCounter === newExpensesList.length) {
            const newExpense = new Expense(amountInputValue, categorySelectValue, descriptionValue, id, expenseDate)
            newExpense.saveExpenses(newExpensesList)
        }else{
            alert('This Expense already exist in the expenses list!')
        }

        const newExpTrack = new ExpenseTracker(categoryList)
        const newExpList = newExpTrack.getExpenses(generalTotal)

        expensesListDiv.textContent = ''
        newExpList.forEach((expense) => {
            expense.displayExpenses(expensesListDiv)
        })
    }
})
