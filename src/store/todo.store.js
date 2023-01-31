import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todos: [new Todo("prueba 1"), new Todo("prueba 2"), new Todo("prueba 3")],
  filter: Filters.All,
};

const initStore = () => {
  console.log("InitStore 📠");
  console.log(state);
};

export default {
  initStore,
};
