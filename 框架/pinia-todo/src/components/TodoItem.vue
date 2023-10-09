
<template>
  <li>
    <input type="checkbox" v-model="todo.completed">
    <span>{{ todo.content }}</span>
    <button @click="store.deleteTodo(todo.id)">&times;</button>
  </li>
</template>

<script setup>
import { useTodos } from '../stores/todos.js'

// 组件接收到的属性,叫todo
var props = defineProps({
  todo: Object,
})

var { todo } = props

var store = useTodos()

</script>
