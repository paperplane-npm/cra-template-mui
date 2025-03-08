const fs = require('fs-extra')

// 基于 package.json 创建 template.json
const packageJson = JSON.parse(String(fs.readFileSync('./package.json')))
const newPackageJson = { private: true }

for (const [key, value] of Object.entries(packageJson)) {
  if (
    [
      'homepage',
      'scripts',
      'dependencies',
      'devDependencies',
      'browserslist',
      'eslintConfig',
    ].includes(key)
  ) {
    newPackageJson[key] = value
  }
}
delete newPackageJson.devDependencies['fs-extra']
delete newPackageJson.scripts['prepublishOnly']
delete newPackageJson.scripts['release']

fs.writeFileSync('./template.json', JSON.stringify({ package: newPackageJson }, null, 2))

// 拷贝目录到 /template
fs.rmSync('./template', { recursive: true, force: true })
fs.mkdirSync('./template', { recursive: true })

const items = fs.readdirSync('./')
items.forEach(f => {
  if (
    [
      'public',
      'src',
      '.editorconfig',
      '.env',
      '.eslintrc',
      '.gitattributes',
      '.prettierrc',
      'config-overrides.js',
      'tailwind.config.js',
      'tsconfig.json',
      'tsconfig.paths.json',
    ].includes(f)
  ) {
    fs.copySync(`./${f}`, `./template/${f}`, { overwrite: true, preserveTimestamps: true })
  }
})

// 写入新的 README.md
let readme = String(fs.readFileSync('./cra-publish/README.md'))
readme = readme.replace(/%VERSION%/, packageJson.version)
fs.writeFileSync('./template/README.md', readme)

// 处理 .gitignore
const gitignore = String(fs.readFileSync('./.gitignore'))
const newGitignore = gitignore.replace(/\n# cra-template[\S\s]*/g, '')
fs.writeFileSync('./template/gitignore', newGitignore)
