import mainPackage from '../package.json'
import fs from 'fs'
import path from 'path'
import childProcess from 'child_process'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const libdir = path.resolve(__dirname, '../lib')

const syncPackages = () => {
  fs.writeFileSync(
    path.resolve(libdir, 'package.json'),
    JSON.stringify({
      "name": mainPackage.name,
      "version": mainPackage.version,
      "main": "codeDesign.cjs",
      "module": "codeDesign.js",
      "types": "dist/codeDesign.d.ts",
      "dependencies": mainPackage.dependencies,
    }, null, 2)
  )
}

const versionMap = {
  major: () => childProcess.execSync(`npm version major -m "Version %s - v1.0.0"`),
  minor: () => childProcess.execSync(`npm version minor -m "Version %s - v0.1.0"`),
  patch: () => childProcess.execSync(`npm version minor -m "Version %s - v0.0.1"`)
}

const publishNpm = () => childProcess.execSync(`cd ${libdir} && npm publish`)

let [ upgradePatch ] = process.argv.splice(2)
upgradePatch = upgradePatch && (upgradePatch in versionMap) ? upgradePatch : 'patch'

const release = () => {
  versionMap[upgradePatch]()
  syncPackages()
  publishNpm()
}

release()