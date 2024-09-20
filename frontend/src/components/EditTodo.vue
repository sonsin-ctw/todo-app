<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-100 to-white py-6 flex flex-col justify-center sm:py-12">
    <div class="relative px-4 py-10 mx-auto w-full max-w-3xl">
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-12">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center text-indigo-600">Edit Todo</h2>
        <form @submit.prevent="saveTodo" class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input 
              id="title"
              v-model="editedTodo.title" 
              placeholder="Todo title" 
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
          </div>
          <div>
            <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
            <select 
              id="priority"
              v-model="editedTodo.priority"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select 
              id="status"
              v-model="editedTodo.status"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div class="flex justify-end space-x-4 mt-8">
            <button 
              type="button" 
              @click="cancel"
              class="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="w-full sm:w-auto bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import { ref } from 'vue' 
  import { useRoute, useRouter } from 'vue-router'
  import { useTodoStore } from '../stores/todo'
  
  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const todoStore = useTodoStore()
      
  
      const todoId = parseInt(route.params.id)
      const todo = todoStore.todos.find(t => t.id === todoId)
      const editedTodo = ref(todo ? { ...todo } : { title: '', priority: 'low', status: 'pending' })
  
      const saveTodo = async () => {
        await todoStore.updateTodo(editedTodo.value)
        router.push({ name: 'TodoDetails', params: { id: todoId } })
      }
  
      const cancel = () => {
        router.push({ name: 'TodoDetails', params: { id: todoId } })
      }
  
      return { editedTodo, saveTodo, cancel }
    }
  }
  </script>