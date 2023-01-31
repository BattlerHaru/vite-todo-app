// '?raw' = Vite lo importara en crudo
import html from "./app.html?raw";

import todoStore from "../store/todo.store";
import {renderTodos} from "./helpers";

const elementIds = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  dataId: "[data-id]",
  btnDestroy: "destroy",
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(elementIds.TodoList, todos);
  };

  // Cuando la función App() se llama
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector(elementIds.NewTodoInput);
  const todoListUL = document.querySelector(elementIds.TodoList);

  // Listeners
  // new ToDo
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });

  // toggle ToDo
  todoListUL.addEventListener("click", (event) => {
    const elem = event.target.closest(elementIds.dataId);
    todoStore.toggleTodo(elem.getAttribute("data-id"));
    displayTodos();
  });

  // delete ToDo
  todoListUL.addEventListener("click", (event) => {
    const isDestroyElem = event.target.className === elementIds.btnDestroy;

    const elemDel = event.target.closest(elementIds.dataId);

    if (!elemDel || !isDestroyElem) return;
    todoStore.deleteTodo(elemDel.getAttribute("data-id"));
    displayTodos();
  });
};
