<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative px-4 py-3 mx-auto w-full max-w-3xl">
      <div class="relative px-4 py-8 bg-white shadow-lg sm:rounded-3xl sm:p-10">
        <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-600">Todo List</h1>
        
        <!-- Loading and error states -->
        <div v-if="todoStore.loading" class="mb-4 text-center text-gray-600">Loading...</div>
        <div v-if="todoStore.error" class="mb-4 text-center text-red-500">{{ todoStore.error }}</div>

        <!-- New Todo Input -->
        <div class="mb-6 space-y-4">
          <input 
            v-model="newTodo.title" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            placeholder="New task"
          >
          <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <select 
              v-model="newTodo.priority" 
              class="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button 
              @click="addTodo" 
              class="w-full sm:flex-grow bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" 
              :disabled="todoStore.loading">
              Add Todo
            </button>
          </div>
        </div>

        <!-- Todo List -->
        <ul class="space-y-4">
          <li v-for="todo in todoStore.todos" :key="todo.id" class="bg-gray-50 p-4 rounded-lg shadow">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div class="flex items-center space-x-2">
                <span 
                  class="w-3 h-3 rounded-full" 
                  :class="{
                    'bg-red-500': todo.priority === 'high',
                    'bg-yellow-500': todo.priority === 'medium',
                    'bg-green-500': todo.priority === 'low'
                  }"
                ></span>
                <router-link 
                  :to="{ name: 'TodoDetails', params: { id: todo.id } }" 
                  class="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {{ todo.title }}
                </router-link>
              </div>
              <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <select 
                  v-model="todo.status" 
                  @change="updateTodo(todo)" 
                  class="w-full sm:w-auto px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  :class="{
                    'bg-gray-200': todo.status === 'pending',
                    'bg-blue-100': todo.status === 'in_progress',
                    'bg-green-100': todo.status === 'completed'
                  }"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button 
                  @click="deleteTodo(todo.id)" 
                  class="w-full sm:w-auto bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
            <div class="mt-2 text-sm text-gray-500 flex items-center space-x-2">
              <span>Priority:</span>
              <span 
                class="px-2 py-1 rounded-full text-xs font-semibold"
                :class="{
                  'bg-red-100 text-red-800': todo.priority === 'high',
                  'bg-yellow-100 text-yellow-800': todo.priority === 'medium',
                  'bg-green-100 text-green-800': todo.priority === 'low'
                }"
              >
                {{ todo.priority }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '../stores/todo'

export default {
  setup() {
    const todoStore = useTodoStore()
    const newTodo = ref({ title: '', priority: 'medium', status: 'pending' })

    onMounted(() => {
      todoStore.fetchTodos()
    })

    const addTodo = async () => {
      if (newTodo.value.title.trim() === '') {
        alert('Please enter a title for the todo')
        return
      }
      await todoStore.addTodo(newTodo.value)
      newTodo.value = { title: '', priority: 'medium', status: 'pending' }
    }

    const updateTodo = async (todo) => {
      await todoStore.updateTodo(todo)
    }

    const deleteTodo = async (id) => {
      await todoStore.deleteTodo(id)
    }

    return {
      todoStore,
      newTodo,
      addTodo,
      updateTodo,
      deleteTodo
    }
  }
}
</script>
