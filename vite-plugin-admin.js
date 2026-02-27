import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default function adminPlugin() {
  return {
    name: 'vite-plugin-admin',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__admin/save', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', () => {
          try {
            const { file, data } = JSON.parse(body)

            const allowedFiles = {
              products: resolve(__dirname, 'src/data/products.json'),
              technologies: resolve(__dirname, 'src/data/technologies.json'),
            }

            if (!allowedFiles[file]) {
              res.statusCode = 403
              res.end(JSON.stringify({ error: 'File not allowed' }))
              return
            }

            writeFileSync(allowedFiles[file], JSON.stringify(data, null, 2) + '\n', 'utf-8')

            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    }
  }
}
