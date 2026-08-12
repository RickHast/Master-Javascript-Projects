let todosList = []

// 1. add a new todo in the list
const addNewTodo = function (newtodo) {
    todosList.push({text: newtodo, checkValue: false})
}

// 2. save the todosList in the localStorage
const saveTodosList = function (todosList) {
    const todosListJSON = JSON.stringify(todosList)
    localStorage.setItem('todos', todosListJSON)
}

// 3. take the todosList in the localStorage and return it
const takeTodosList = function () {
    const todosListJSON = localStorage.getItem('todos')
    const todos = JSON.parse(todosListJSON)

    const filterJSON = localStorage.getItem('currentFilter')
    const currentFilter = JSON.parse(filterJSON)
    if (todos !== null){
        if (currentFilter === 'active'){
            displayActiveTodos(todos)
        } else if(currentFilter === 'fini'){
            displayFinishedTodos(todos)
        }else if (currentFilter === 'all'){
            displayAllTodos(todos)
        }
        return todos
    }else {
        document.querySelector('#todos-container').textContent = ''
        h2Message('No Todos in the app')
        return []
    }
}

// 4. generate todos numbers message or default message
const h2Message = function(text, id) {
    const message = document.createElement('h2')
    message.textContent = text
    if (id){
        message.id = id
    }
    document.querySelector('#todos-container').appendChild(message)
}

const underlineTodo = function(todoLabel) {
    
    return todoLabel.style.textDecoration = 'line-through'

}

// Principal Display function
const principalDisplay = function(todosList, todo) {
    const todoCheckbox = document.createElement('input')
    todoCheckbox.type = 'checkbox'
    todoCheckbox.checked = todo.checkValue
    todoCheckbox.onclick = function() {
        verifyCheckbox(todosList, todo, todoCheckbox.checked)
    }

    const todoLabel = document.createElement('label')
    todoLabel.textContent = todo.text

    if(todo.checkValue){
        underlineTodo(todoLabel)
    }

    const todoDelButton = document.createElement('button')
    todoDelButton.textContent = 'Delete'
    todoDelButton.onclick = function() {
        deleteTodo(todosList, todo)
    }

    const todoDiv = document.createElement('div')
    const todoDivId = `todo-${todosList.indexOf(todo)}`
    todoDiv.id = todoDivId

    document.querySelector("#todos-container").appendChild(todoDiv)
    document.querySelector(`#${todoDivId}`).appendChild(todoCheckbox)
    document.querySelector(`#${todoDivId}`).appendChild(todoLabel)
    document.querySelector(`#${todoDivId}`).appendChild(todoDelButton)
}


// 5. display list todos in the #todos container
const displayAllTodos = function (todosList) {
    document.querySelector('#todos-container').textContent = ''
    if(todosList.length === 0){
        h2Message('No Todos in the app')
    }else{
        h2Message(`You have ${todosList.length} Todos in the app`, 'todos-num-h2')
        incompletedTodosMessge(todosList)
        todosList.forEach(function (todo) {
            principalDisplay(todosList, todo)
        })
    }
}

// 6. Delete button function
const deleteTodo = function(todosList, todo) {
    const todoIndex = todosList.indexOf(todo)
    todosList.splice(todoIndex, 1)
    saveTodosList(todosList)
    todosList = takeTodosList()
}


// 7. vérify the todos checkbox
const verifyCheckbox = function (todosList, todo, checkedValue) {
    const todoIndex = todosList.indexOf(todo)
    todosList[todoIndex].checkValue = checkedValue
    saveTodosList(todosList)
}

// save the current filter
const saveCurrentFilter = function(filter) {
    const filterJSON = JSON.stringify(filter)
    localStorage.setItem('currentFilter', filterJSON)
}

// display incomplete todos message
const incompletedTodosMessge = function(todosList) {
    let incompletedNum = 0
    todosList.forEach(function(todo) {
        if(!todo.checkValue) {
            incompletedNum ++
        }
    })

    const incompletedMessage = document.createElement('h3')
    incompletedMessage.textContent = `You have ${incompletedNum} incomplete todos`
    document.querySelector('#todos-container').appendChild(incompletedMessage)

}


// filter the completed or incompleted todo
document.querySelector('#filter').addEventListener('change', function (e) {
    const filter = e.target.value
    saveCurrentFilter(filter)
    if (filter === 'active'){
        displayActiveTodos(todosList)
    } else if(filter === 'fini'){
        displayFinishedTodos(todosList)
    }else if (filter === 'all'){
        displayAllTodos(todosList)
    }
    
})

// 9. display filtered list todos in the #todos container
const displayActiveTodos = function (todosList) {
    document.querySelector('#todos-container').textContent = ''
    h2Message('Active Todos')
    incompletedTodosMessge(todosList)
    todosList.forEach(function (todo) {
        if (todo.checkValue === false){
            principalDisplay(todosList, todo)
        }
    })
}

// 9. display filtered list todos in the #todos container
const displayFinishedTodos = function (todosList) {
    document.querySelector('#todos-container').textContent = ''
    h2Message('Finished Todos')
    incompletedTodosMessge(todosList)
    todosList.forEach(function (todo) {
        if (todo.checkValue === true){
            principalDisplay(todosList, todo)
        }
    })
}

// #todos-container initialisation
saveCurrentFilter('all')
todosList = takeTodosList()

document.querySelector('#todo-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const newTodo = e.target.addTodoInput.value.trim()
    e.target.addTodoInput.value = ''

    if (newTodo === ''){
        alert('Please enter a valid task')
    }else{
        let counter = 0
        todosList.forEach(function(todo) {
            if (todo.text !== newTodo)
                counter++
        })

        if (counter === todosList.length){
            addNewTodo(newTodo)
        }else{
            alert('This task already exist in the todos app')
        }
    }

    saveTodosList(todosList)
    todosList = takeTodosList()
})
