
<template>
  <h1>Todos</h1>
  <div>
    <input class="check" type="checkbox" :checked="store.isAllCompleted" @click="store.toggleAllCompleted">
    <input class="text" type="text" @keyup.enter="addTodo" placeholder="输入点啥">
  </div>
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
