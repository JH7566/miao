
<template>
  <ul>
    <TodoItem :todo="todo" v-for="todo of store.visibleTodos" :key="todo.id"/>
  </ul>
</template>

<script setup>
import TodoItem from './TodoItem.vue'
import { useTodos } from '../stores/todos'

var store = useTodos()

// console.log('visibleTodos from TodoList', visibleTodos)

</script>
