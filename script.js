/* const todoItems = [
    {
        id: 1,
        isDone: true,
        description: 'Buy presents'
    }
] */

const addTodoButton = document.querySelector('#add-todo-button')
const todoInput = document.querySelector('.form-container input')
const todoList = document.querySelector('.todo-list')

const key = 'christmas-todo'
let nextTodoId = 4

let data = getFromLocalStorage()

if (data) {
    data.forEach(item => {
        let todoElement = createTodoElement(item)
        todoList.appendChild(todoElement)
    })
}
else {
    data = []
}

addTodoButton.addEventListener('click', () => {
    const valueFromUser = todoInput.value
    const newTodo = {
        id: nextTodoId,
        isDone: false,
        description: valueFromUser
    }
    nextTodoId++

    const element = createTodoElement(newTodo)
    todoList.appendChild(element)

    data.push(newTodo)
    saveToLocalStorage(data)
    console.log(data)
    console.log(localStorage.getItem(key))

    todoInput.value = ''
})

function createTodoElement(newTodo) {
    const element = document.createElement('li')
    const labelElement = document.createElement('label')
    const checkBox = document.createElement('input')
    const span = document.createElement('span')
    checkBox.type = 'checkbox'
    span.innerText = newTodo.description

    labelElement.appendChild(checkBox)
    labelElement.appendChild(span)
    element.appendChild(labelElement)
    return element
}

todoInput.addEventListener('keyup', event => {
    let userText = todoInput.value
    if (userText.length > 0) {
        addTodoButton.disabled = false
    } else {
        addTodoButton.disabled = true
    }
})

function getFromLocalStorage() {
    let maybeJson = localStorage.getItem(key)

    if (!maybeJson) {
        return
    }

    try {
        let actualData = JSON.parse(maybeJson)
        return actualData
    }
    catch {
        return
    }
}

function saveToLocalStorage(items) {
    let json = JSON.stringify(items)
    localStorage.setItem(key, json)
}

/* saveToLocalStorage([{ id: 10, isDone: true, description: 'bake cookies' }]) */