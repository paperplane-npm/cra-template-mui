const fs = require('fs-extra')
const { execSync } = require('child_process')

const packageJson = JSON.parse(String(fs.readFileSync('./package.json')))
const { name, version } = packageJson

const npmVersion = String(execSync(`npm view ${name} version`)).trim()
const shouldPublish = version !== npmVersion

console.log()
console.log(`=== cra-template-publish ===`)
console.log(`current version: ${version}, and npm version: ${npmVersion}`)
console.log(shouldPublish ? `ready for publish` : `skip publish`)
console.log()

if (shouldPublish) {
  execSync(`npm publish`)
}
