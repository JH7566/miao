
<template>
  <div>
    <span>{{ store.leftCount }} items left</span>
    <span>
      <label><input type="radio" v-model="store.visibleCategory" value="all"> All</label>
      <label><input type="radio" v-model="store.visibleCategory" value="active"> Active</label>
      <label><input type="radio" v-model="store.visibleCategory" value="completed"> Completed</label>
    </span>
    <button v-show="showClearButton" @click="store.clearCompleted">Clear completed</button>
  </div>
</template>

<script setup>
import { useTodos } from "../stores/todos";
import { computed, toRef, toRefs } from "vue";


// var leftCount = toRef(useTodos(), 'leftCount')
var { leftCount } = toRefs(useTodos())
var store = useTodos()

var showClearButton = computed(() => store.todos.some(it => it.completed))

// console.log(leftCount)

</script>
