import './app.css'
import App from './App.svelte'
import { mount } from 'svelte'
import { API_Init } from './components/api/backend.js'

API_Init().catch((error) => {
  console.error(error)
})

export default mount(App, { target: document.getElementById('app') })
