<template>
    <div>
      <form @submit.prevent="addNewTodo">
        <input type="text" v-model="newTodo" id="newTodoInput" placeholder="Add a new task">
        <button type="submit">Add</button>
      </form>
  
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          <button @click="editTodo(todo)">Edit</button>
          <span :class="{ completed: todo.completed }" @click="toggleTodo(index)">
            {{ todo.text }}
          </span>
          <button @click="removeTodo(index)">Delete</button>
        </li>
      </ul>
  
      <p>Incomplete tasks: {{ incompleteTodosCount }}</p>
  
      <div v-if="editingTodo">
        <input type="text" v-model="editedTodo" placeholder="Edit task">
        <button @click="saveEditedTodo">Save</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useTodoStore } from '../stores/todoStore';
  
  export default {
    setup() {
      const todoStore = useTodoStore();
      const newTodo = ref('');
      const editedTodo = ref('');
      const editingTodo = ref(null);
  
      const addNewTodo = () => {
        if (newTodo.value.trim()) {
          todoStore.addTodo(newTodo.value.trim());
          newTodo.value = '';
        }
      };
  
      const toggleTodo = (index) => {
        todoStore.toggleTodo(index);
      };
  
      const removeTodo = (index) => {
        todoStore.removeTodo(index);
      };
  
      const editTodo = (todo) => {
        editedTodo.value = todo.text;
        editingTodo.value = todo;
      };
  
      const saveEditedTodo = () => {
        if (editedTodo.value.trim()) {
          editingTodo.value.text = editedTodo.value.trim();
          todoStore.toggleTodo(todoStore.todos.indexOf(editingTodo.value));
          editingTodo.value = null;
          editedTodo.value = '';
        }
      };
  
      const incompleteTodosCount = computed(() => {
        return todoStore.todos.filter(todo => !todo.completed).length;
      });
  
      return {
        newTodo,
        addNewTodo,
        editedTodo,
        editingTodo,
        editTodo,
        saveEditedTodo,
        todos: todoStore.todos,
        toggleTodo,
        removeTodo,
        incompleteTodosCount
      };
    }
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  