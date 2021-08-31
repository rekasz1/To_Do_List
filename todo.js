
async function getTodos() {

    try {
        const response = await fetch('http://localhost:3000/todos');
        return await response.json();
    } catch (err) {
        console.log("ERROR!")
    }

}



const displayTodos = (todos) => {
    const containerTodos = document.getElementById('todos')
    containerTodos.innerHTML = "";

    const todosHTML = todos.map((todos) => {
        const todoHTML = createtodosHTML(todos.text, todos.id, todos.checked);
        return todoHTML;
    })

    console.log(todosHTML);
    containerTodos.append(...todosHTML)
}


async function showTodos() {
    const todosResp = await getTodos();
    displayTodos(todosResp);
}
showTodos()





function createtodosHTML(text, id, checked) {
    const p = document.createElement('p')
    const todocheckbox = document.createElement("INPUT")
    const tododiv = document.createElement('div')
    const deleteBtn = document.createElement('button')

    todocheckbox.setAttribute("type", "checkbox");


    deleteBtn.setAttribute("id", id)


    tododiv.appendChild(todocheckbox)
    tododiv.appendChild(p)
    tododiv.appendChild(deleteBtn)

    console.log(id)

    p.innerText = text;
    deleteBtn.innerText = "X";
    todocheckbox.checked = checked;

    deleteBtn.addEventListener('click', async function () {

        const response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }

        })
        showTodos()
        console.log(this)
        return response.json();


    })

    todocheckbox.addEventListener('click', async function () {


        const response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                checked: this.checked
            })
        })
        // showTodos()
        // return response.json()
        console.log(this)
        console.log(response.json())
        console.log("true")

    })

    return tododiv;
}



function createNewTodo() {
    const textInput = document.getElementById('text').value

    const todo = { text: textInput, id: "", checked: false }

    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    // return todo;

    console.log(todo)
}

const addBtn = document.getElementById('add-todo');
addBtn.addEventListener('click', function () {
    createNewTodo();
    showTodos()


})


