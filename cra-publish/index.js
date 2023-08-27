const fs = require('fs-extra')

// 基于 package.json 创建 template.json
const packageJson = JSON.parse(String(fs.readFileSync('./package.json')))
const newPackageJson = { private: true }

for (const [key, value] of Object.entries(packageJson)) {
  if (['homepage', 'scripts', 'dependencies', 'devDependencies', 'browserslist'].includes(key)) {
    newPackageJson[key] = value
  }
}
delete newPackageJson.devDependencies['lerna']
delete newPackageJson.devDependencies['fs-extra']
delete newPackageJson.scripts['prepublishOnly']
delete newPackageJson.scripts['publish']

fs.writeFileSync('./template.json', JSON.stringify({ package: newPackageJson }, null, 2))

// 拷贝目录到 /template
fs.rmSync('./template', { recursive: true, force: true })
fs.mkdirSync('./template', { recursive: true })
const exclude = [
  'template',
  'template.json',
  'node_modules',
  'cra-publish',
  'lerna.json',
  '.drone.yml',
  '.gitignore',
  'package.json',
  'yarn.lock',
  'package-lock.json',
  '.git',
  '.DS_Store',
  '.idea',
  '.vscode',
  'Thumbs.db',
]
const items = fs.readdirSync('./')
items.forEach(f => {
  if (!exclude.includes(f)) {
    fs.copySync(`./${f}`, `./template/${f}`, { overwrite: true, preserveTimestamps: true })
  }
})

// 处理 .gitignore
const gitignore = String(fs.readFileSync('./.gitignore'))
const newGitignore = gitignore.replace(/\n# cra-template[\S\s]*/g, '')
fs.writeFileSync('./template/gitignore', newGitignore)
