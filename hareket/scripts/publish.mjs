import { cp, mkdir, rm } from 'node:fs/promises'
// Only generated assets are replaced. Source files live in app/ and src/.
await rm(new URL('../assets', import.meta.url), { recursive: true, force: true })
await mkdir(new URL('../assets', import.meta.url), { recursive: true })
await cp(new URL('../dist/assets', import.meta.url), new URL('../assets', import.meta.url), { recursive: true })
for (const file of ['index.html', 'favicon.svg']) {
  await cp(new URL(`../dist/${file}`, import.meta.url), new URL(`../${file}`, import.meta.url))
}
console.log('GitHub Pages çıktısı /hareket/ için hazırlandı.')
