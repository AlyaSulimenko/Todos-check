let todos = [];

const filters = { searchSymbols: "", hideCompleted: false };

const todosJSON = localStorage.getItem("todos");
if (todosJSON !== null) {
  todos = JSON.parse(todosJSON);
}

const renderTodos = function (array, filters) {
  const filteredTodos = array.filter(function (todo) {
    const filteredByCompl = !filters.hideCompleted || !todo.completed;
    const filteredByInputLetters = todo.text
      .toLowerCase()
      .includes(filters.searchSymbols.toLowerCase());
    return filteredByCompl && filteredByInputLetters;
  });
  const undoneTodos = filteredTodos.filter(function (todoItem) {
    return !todoItem.completed;
  });
  document.querySelector("#todos").innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `You still have ${undoneTodos.length} things to do!`;
  document.querySelector("#summ").appendChild(summary);

  filteredTodos.forEach(function (todo) {
    const todosEl = document.createElement("p");
    todosEl.textContent = todo.text;
    document.querySelector("#todos").appendChild(todosEl);
  });
};
renderTodos(todos, filters);

document
  .querySelector("#search-todos-input")
  .addEventListener("input", function (event) {
    filters.searchSymbols = event.target.value;
    renderTodos(todos, filters);
  });

document
  .querySelector("#add-todo")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    todos.push({
      text: event.target.elements.addTodoInput.value,
      completed: false,
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos, filters);
    event.target.elements.addTodoInput.value = "";
  });

document
  .querySelector("#hide-completed")
  .addEventListener("change", function (event) {
    filters.hideCompleted = event.target.checked;
    renderTodos(todos, filters);
  });
