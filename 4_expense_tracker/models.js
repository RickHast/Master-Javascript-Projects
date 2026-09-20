class Expense{
    constructor(amount, category, description, id, date) {
        this.amount = amount
        this.category = category
        this.description = description
        this.date = date
        this.id = id
    }

    // for the save in localStorage, use [{expense1}, {expense2}, {expsne3}, {expsne4}]

    saveExpenses(Expenses) {
        Expenses.push({
            amount: this.amount,
            category: this.category,
            description: this.description,
            date: this.date,
            id: this.id,
        })

        const JSONExpenses = JSON.stringify(Expenses)

        localStorage.setItem('Expenses', JSONExpenses)
    }

    displayExpenses(expensesListDiv) {
        
        const expenseDiv = document.createElement('div')

        const expenseDate = document.createElement('h3')
        expenseDate.textContent = `${new Date(this.date)}`

        const expenseDescription = document.createElement('p')
        expenseDescription.textContent = `Desciption: ${this.description}`

        const expenseAmount = document.createElement('p')
        expenseAmount.textContent = `Amount: ${this.amount} FCFA`

        const expenseCategory = document.createElement('p')
        expenseCategory.textContent = `Category: ${this.category}`

        const deleteExpense = document.createElement('button')
        deleteExpense.textContent = 'Delete This Expense'

        deleteExpense.addEventListener('click', (e) => {
            const expId = this.id

            const JSONExpenses = localStorage.getItem('Expenses')
            const expenses = JSON.parse(JSONExpenses)

            const filteredExp = expenses.filter((exp) => {
                return exp.id !== expId
            })
            const newJSONExpenses = JSON.stringify(filteredExp)
            localStorage.setItem('Expenses', newJSONExpenses)
            location.reload()
        })

        expenseDiv.appendChild(expenseDate)
        expenseDiv.appendChild(expenseDescription)
        expenseDiv.appendChild(expenseAmount)
        expenseDiv.appendChild(expenseCategory)
        expenseDiv.appendChild(deleteExpense)
        expensesListDiv.appendChild(expenseDiv)
    }

}

class ExpenseTracker{
    constructor(categoryList) {
        this.categoryList = categoryList
    }
    
    getTotalsExpenses() {
        const JSONExpenses = localStorage.getItem('Expenses')
        const expenses = JSON.parse(JSONExpenses)
        let total = 0
        expenses.forEach((expense) => {
            total += parseFloat(expense.amount)
        })
        return total
    }

    getCategoryExpenses(expense) {
        let categoryTotal = 0

        expense.forEach((currentCategory) => {
            categoryTotal += parseFloat(currentCategory.amount)
        })

        return categoryTotal
    }

    getExpenses(generalTotal) {
        const JSONExpenses = localStorage.getItem('Expenses')
        const Expenses = JSON.parse(JSONExpenses)

        if (Expenses === null || Expenses.length === 0) {
            generalTotal.textContent = `Nothing in this expenses list`
            return []
        }else {
            generalTotal.textContent = `Total Expenses: ${this.getTotalsExpenses()} FCFA`
            const instancesTable = Expenses.map((rawObject) => {
                return new Expense(rawObject.amount, rawObject.category, rawObject.description, rawObject.id, rawObject.date)
            })

            return instancesTable
        }
    }

    categoryFilter(selectFilter, expensesListDiv, generalTotal) {
        selectFilter.textContent = ''

        const allOptions = document.createElement('option')
        allOptions.value = 'all'
        allOptions.textContent = 'All Categories'
        selectFilter.appendChild(allOptions)

        this.categoryList.forEach((category) => {
            const option = document.createElement('option')
            option.value = category
            option.textContent = category
            selectFilter.appendChild(option)
        })

        selectFilter.addEventListener('change', (e) => {
            const expenses = this.getExpenses(generalTotal)
            const currentFilterCategory = e.target.value

            expensesListDiv.textContent = ''

            const expenseCategoryList = expenses.filter((expense) => expense.category === currentFilterCategory)
            expensesListDiv.textContent = ''

            let correctCategoryList
            let message

            currentFilterCategory === 'all' ? (correctCategoryList = expenses, message = 'Nothing in this expenses list') : (correctCategoryList = expenseCategoryList, message = "You haven't some expenses in this category")
            const categoryDict = this.getCategoryExpenses(correctCategoryList, )

            correctCategoryList.length === 0 ? generalTotal.textContent = `${message}` : generalTotal.textContent = `Total ${currentFilterCategory} Expenses: ${categoryDict} FCFA`

            correctCategoryList.forEach((expense) => {
                expense.displayExpenses(expensesListDiv)
            })
        })
    }
}