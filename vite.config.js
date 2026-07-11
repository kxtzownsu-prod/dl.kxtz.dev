import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { execFileSync } from 'child_process'

function gitOutput(args) {
  return execFileSync('git', args, {encoding: 'utf8'}).trim()
}

let gitHash = 'unknown'
try {
  const hash = gitOutput(['rev-parse', '--short', 'HEAD'])
  const dirty = gitOutput(['status', '--porcelain']) ? '-dirty' : ''
  gitHash = `${hash}${dirty}`
} catch {}

export default defineConfig(({command}) => {
  const buildTime = command === 'build' ? Date.now() : 'dev'

  return {
    plugins: [tailwindcss(), svelte()],
    server: {
      allowedHosts: ['testing-us1.kxtz.dev']
    },
    define: {
      __BUILD_TIME__: JSON.stringify(buildTime),
      __GIT_HASH_SHORT__: JSON.stringify(gitHash)
    }
  }
})
