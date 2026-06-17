import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.JPG': 'image/jpeg', '.JPEG': 'image/jpeg',
  '.png': 'image/png',  '.PNG': 'image/png',
  '.gif': 'image/gif',  '.webp': 'image/webp',  '.svg': 'image/svg+xml',
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-website-assets',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = decodeURIComponent(req.url.split('?')[0])
          const websiteRoot = path.resolve(__dirname, '..')
          const filePath = path.join(websiteRoot, url)
          try {
            const stat = fs.statSync(filePath)
            if (stat.isFile()) {
              const ext = path.extname(filePath)
              res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
              res.statusCode = 200
              fs.createReadStream(filePath).pipe(res)
              return
            }
          } catch {}
          next()
        })
      },
    },
  ],
})
