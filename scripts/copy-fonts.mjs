import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const src = resolve(root, 'node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2')
const destDir = resolve(root, 'public/fonts')
const dest = resolve(destDir, 'PretendardVariable.woff2')

mkdirSync(destDir, { recursive: true })

if (existsSync(src)) {
  copyFileSync(src, dest)
  console.log('✓ Pretendard font copied to public/fonts/')
} else {
  console.warn('⚠ Pretendard font not found. Run npm install first.')
}
