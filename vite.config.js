import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { execSync } from 'child_process'

let gitHash = 'unknown'
try {
  const hash = execSync('git rev-parse --short HEAD').toString().trim()
  const dirty = execSync('git status --porcelain').toString().trim() ? '-dirty' : ''
  gitHash = `${hash}${dirty}`
} catch {}

export default defineConfig({
  plugins: [svelte()],
  server: {
    allowedHosts: ['testing-us1.kxtz.dev']
  },
  define: {
    __BUILD_TIME__: Date.now(),
    __GIT_HASH_SHORT__: JSON.stringify(gitHash)
  }
})