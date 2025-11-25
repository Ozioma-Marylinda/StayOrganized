const todoFormSect = document.querySelector('.todoForm');
const todoAddInput = document.querySelector('.todoFormInput');
const todoList = document.querySelector('.ourTodos');
const errorMessage = document.querySelector('.error-message');


const todoslsContainer = [];

function validateTask() {
  if (todoAddInput.value.trim() === "") {
    todoAddInput.value = ""; 
    todoAddInput.placeholder = "Enter a task";
    todoAddInput.classList.add("error");
    return false;
  } else {
    todoAddInput.classList.remove("error");
    todoAddInput.placeholder = "Add a task...";
    return true;
  }
}

function displayTodo(text) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todoDivItems');

  const todoParagraph = document.createElement('p');
  todoParagraph.innerText = text;
  todoDiv.appendChild(todoParagraph);

  /* === ACTIONS WRAPPER === */
  const actions = document.createElement('div');
  actions.classList.add('actions');

  // EDIT BUTTON
  // EDIT BUTTON
const editButton = document.createElement('button');
editButton.innerText = "Edit";

editButton.addEventListener('click', () => {

  // If switching to SAVE mode:
  if (editButton.innerText === "Edit") {

    const inputField = document.createElement('input');
    inputField.type = "text";
    inputField.value = todoParagraph.innerText;

    // Store the old text before editing
    const oldText = todoParagraph.innerText;

    todoDiv.replaceChild(inputField, todoParagraph);
    editButton.innerText = "Save";

    editButton.dataset.editing = "true";

    editButton.inputField = inputField;
    editButton.oldText = oldText;

  } else {
    // SAVE MODE
    const newText = editButton.inputField.value.trim();
    if (!newText) return;

    todoParagraph.innerText = newText;
    todoDiv.replaceChild(todoParagraph, editButton.inputField);

    editButton.innerText = "Edit";
    editButton.dataset.editing = "false";

    // Update in localStorage correctly
    const index = todoslsContainer.indexOf(editButton.oldText);
    if (index > -1) {
      todoslsContainer[index] = newText;
      localStorage.setItem("savedTodos", JSON.stringify(todoslsContainer));
    }
  }

});

  // DELETE BUTTON
  const deleteButton = document.createElement('button');
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener('click', () => {
    todoList.removeChild(todoDiv);

    const index = todoslsContainer.indexOf(text);
    if (index > -1) {
      todoslsContainer.splice(index, 1);
      localStorage.setItem('savedTodos', JSON.stringify(todoslsContainer));
    }
  });

  // ADD BUTTONS INSIDE ACTIONS
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  // ADD ACTIONS TO THE TODO DIV
  todoDiv.appendChild(actions);

  todoList.appendChild(todoDiv);
}

  
todoFormSect.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateTask()) return;

//To save my inputs in array
  todoslsContainer.push(todoAddInput.value);

  localStorage.setItem('savedTodos', JSON.stringify(todoslsContainer));

  displayTodo(todoAddInput.value);

  
  todoAddInput.value = '';

  });

   //to save the array in ls, i need to convert the array to json

// is to save task to localstorage and to do that i need to first save the task in an array which is the only object localstorage accepts.
//first set up an array and set the input to save in it.

//after page loads, fetch all the todos
document.addEventListener('DOMContentLoaded', () => {
  const fetchedtodos = JSON.parse(localStorage.getItem('savedTodos')) || [];
  
  fetchedtodos.forEach(todo => {
    displayTodo(todo);
    todoslsContainer.push(todo)
  });
});

