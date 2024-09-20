import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTodos() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:8000/api/todos/')
        this.todos = response.data
        console.log('Fetched todos:', this.todos)
      } catch (error) {
        this.error = 'Error fetching todos: ' + error.message
        console.error(this.error)
      } finally {
        this.loading = false
      }
    },
    async addTodo(todo) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('http://localhost:8000/api/todos/', todo)
        this.todos.push(response.data)
        console.log('Added new todo:', response.data)
      } catch (error) {
        this.error = 'Error adding todo: ' + error.message
        console.error(this.error)
      } finally {
        this.loading = false
      }
    },
    async updateTodo(todo) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.put(`http://localhost:8000/api/todos/${todo.id}/`, todo)
        const index = this.todos.findIndex(t => t.id === todo.id)
        if (index !== -1) {
          this.todos[index] = response.data
        } else {
          this.todos.push(response.data) 
        }
        console.log('Updated todo:', response.data)
        return response.data  
      } catch (error) {
        this.error = 'Error updating todo: ' + error.message
        console.error(this.error)
        throw error  
      } finally {
        this.loading = false
      }
    },
    async deleteTodo(id) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`http://localhost:8000/api/todos/${id}/`)
        this.todos = this.todos.filter(todo => todo.id !== id)
        console.log('Deleted todo with id:', id)
      } catch (error) {
        this.error = 'Error deleting todo: ' + error.message
        console.error(this.error)
      } finally {
        this.loading = false
      }
    }
  }
})