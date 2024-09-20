<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-100 to-white py-6 flex flex-col justify-center sm:py-12">
    <div class="relative px-4 py-10 mx-auto w-full max-w-3xl">
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-12">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center text-indigo-600">Todo Details</h2>
        <div v-if="todo" class="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h3 class="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 text-indigo-600">{{ todo.title }}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <p class="mb-2">
                <strong class="text-gray-700">Priority:</strong>
                <span class="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">{{ todo.priority }}</span>
              </p>
              <p class="mb-2">
                <strong class="text-gray-700">Status:</strong>
                <span class="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">{{ todo.status }}</span>
              </p>
            </div>
            <div class="flex flex-col">
              <p class="mb-2">
                
                <strong class="text-gray-700">Created: </strong>
                <span class="text-gray-600">{{ new Date(todo.created_at).toLocaleString() }}</span>
              </p>
              <p class="mb-2">
                <strong class="text-gray-700">Updated: </strong>
                <span class="text-gray-600">{{ new Date(todo.updated_at).toLocaleString() }}</span>
              </p>
            </div>
          </div>
          <div class="mt-8 flex justify-center space-x-4">
            <button @click="$router.push('/')" class="w-full sm:w-auto bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1">
              Back to List
            </button>
            <button @click="$router.push(`/todo/${todo.id}/edit`)" class="w-full sm:w-auto bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1">
              Edit Todo
            </button>
          </div>
        </div>
        <div v-else class="text-center text-gray-600 py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          Loading...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTodoStore } from '../stores/todo'

export default {
  setup() {
    const route = useRoute()
    const todoStore = useTodoStore()
    const todo = ref(null)

    const loadTodo = async (id) => {
      todo.value = todoStore.todos.find(t => t.id === parseInt(id))
      if (!todo.value) {
        try {
          const response = await fetch(`http://localhost:8000/api/todos/${id}/`)
          todo.value = await response.json()
        } catch (error) {
          console.error('Error fetching todo:', error)
        }
      }
    }

    onMounted(() => loadTodo(route.params.id))

    watch(() => route.params.id, (newId) => {
      loadTodo(newId)
    })

    return { todo }
  }
}
</script>