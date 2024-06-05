import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(todo) {
      this.todos.push({ text: todo, completed: false });
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  },
  getters: {
    incompleteTodosCount: state => {
      console.log('Calculating incompleteTodosCount...');
      const incompleteTodos = state.todos.filter(todo => !todo.completed);
      console.log('Incomplete todos:', incompleteTodos);
      console.log('Count:', incompleteTodos.length);
      return incompleteTodos.length;
    }
  }
});
