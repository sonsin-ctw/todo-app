// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import TodoDetails from '../components/TodoDetails.vue'
import EditTodo from '../components/EditTodo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TodoList
  },
  {
    path: '/todo/:id',
    name: 'TodoDetails',
    component: TodoDetails,
    props: true
  },
  {
    path: '/todo/:id/edit',
    name: 'EditTodo',
    component: EditTodo,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router