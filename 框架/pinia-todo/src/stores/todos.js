import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTodos = defineStore('todos', () => {
  const todos = reactive([{
    id: 1,
    content: 'eat',
    completed: false,
  }, {
    id: 2,
    content: 'drink',
    completed: true,
  }])

  var visibleCategory = ref('all')

  var visibleTodos = computed(() => {
    // debugger
    if (visibleCategory.value == 'completed') {
      return todos.filter(it => it.completed)
    } else if (visibleCategory.value == 'active') {
      return todos.filter(it => !it.completed)
    } else {
      return todos
    }
  })
  console.log('visibleTodos from store', visibleTodos)

  var nextTodoId = ref(3)

  // 未完成的todos剩余数量
  var leftCount = computed(() => todos.filter(it => !it.completed).length)
  var isAllCompleted = computed(() => todos.length && todos.every(it => it.completed))


  function addTodo(content) {
    todos.push({
      id: nextTodoId.value++,
      content,
      completed: false,
    })
  }
  function deleteTodo(id) {
    var idx = todos.findIndex(todo => todo.id == id)
    if (idx >= 0) {
      todos.splice(idx, 1)
    }
  }

  function clearCompleted() {
    var uncompleted = todos.filter(it => !it.completed)
    todos.length = 0 // 清空现有对象
    todos.push(...uncompleted)
  }

  function toggleAllCompleted() {
    if (isAllCompleted.value) {
      todos.forEach(it => {
        it.completed = false
      })
    } else {
      todos.forEach(it => {
        it.completed = true
      })
    }
  }

  return {
    todos,
    visibleCategory,
    leftCount,
    isAllCompleted,
    visibleTodos, // 只要是computed,在外面解构后就没有响应性了,可能是bug
    addTodo,
    deleteTodo,
    clearCompleted,
    toggleAllCompleted,
  }
})
