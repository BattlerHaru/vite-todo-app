// '?raw' = Vite lo importara en crudo
import html from "./app.html?raw";

import todoStore, {Filters} from "../store/todo.store";
import {renderPendingTodos, renderTodos} from "./helpers";

const elementIds = {
  ClearCompletedButton: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  dataId: "[data-id]",
  ButtonDestroy: "destroy",
  TodoFilters: ".filtro",
  PendingCountLabel: "#pending-count",
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(elementIds.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPendingTodos(elementIds.PendingCountLabel);
  };

  // when App() function is call
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // References HTML
  const newDescriptionInput = document.querySelector(elementIds.NewTodoInput);
  const todoListUL = document.querySelector(elementIds.TodoList);
  const clearCompletedButton = document.querySelector(
    elementIds.ClearCompletedButton
  );
  const filtersLIs = document.querySelectorAll(elementIds.TodoFilters);

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
    const element = event.target.closest(elementIds.dataId);
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  // delete ToDo
  todoListUL.addEventListener("click", (event) => {
    const isDestroyElement =
      event.target.className === elementIds.ButtonDestroy;

    const elementDelete = event.target.closest(elementIds.dataId);

    if (!elementDelete || !isDestroyElement) return;
    todoStore.deleteTodo(elementDelete.getAttribute("data-id"));
    displayTodos();
  });

  // delete all ToDos
  clearCompletedButton.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  // Filters
  filtersLIs.forEach((element) => {
    element.addEventListener("click", (element) => {
      filtersLIs.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");

      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
      }

      displayTodos();
    });
  });
};
