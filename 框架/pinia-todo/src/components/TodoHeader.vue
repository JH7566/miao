
<template>
  <input type="checkbox" :checked="store.isAllCompleted" @click="store.toggleAllCompleted">
  <input type="text" @keyup.enter="addTodo">
</template>

<script setup>
import { useTodos } from "../stores/todos"

var store = useTodos()

function addTodo(e) {
  var text = e.target.value.trim()
  if (text) {
    store.addTodo(text)
    e.target.value = ''
  }
}
</script>
