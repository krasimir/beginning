#!/usr/bin/env node

/* eslint-disable import/no-dynamic-require */

const path = require('path');
const fs = require('fs');

function copy(from, to, overwrite = true) {
  if (!fs.existsSync(to) || overwrite) {
    fs.copyFileSync(from, to);
    return true;
  }
  return false;
}
function createFolder(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
}

const setupRoot = __dirname;
const projectRoot = process.cwd();

const DEFAULT_PKG_JSON = `{
  "name": "${path.basename(projectRoot)}"
}`;

if (!fs.existsSync(`${projectRoot}/package.json`)) {
  fs.writeFileSync(`${projectRoot}/package.json`, DEFAULT_PKG_JSON);
}
if (!fs.existsSync(`${projectRoot}/.gitignore`)) {
  fs.writeFileSync(`${projectRoot}/.gitignore`, 'node_modules');
}

const setupPkg = require(path.resolve(__dirname, 'package.json'));
const projectPkg = require(`${projectRoot}/package.json`);

projectPkg.devDependencies = {
  ...projectPkg.devDependencies,
  ...setupPkg.devDependencies,
};
projectPkg.dependencies = {
  ...projectPkg.dependencies,
  ...setupPkg.dependencies,
};
projectPkg.scripts = {
  ...projectPkg.scripts,
  ...setupPkg.scripts,
};

// saving changes in package.json
fs.writeFileSync(
  `${projectRoot}/package.json`,
  JSON.stringify(projectPkg, null, 2)
);

// copying files
createFolder(`${projectRoot}/src`);
createFolder(`${projectRoot}/src/components`);
createFolder(`${projectRoot}/public`);
[
  '.babelrc',
  '.eslintrc',
  'tsconfig.json',
  'webpack.config.js',
  'webpack.prod.js',
  'src/index.tsx',
  'src/components/App.tsx',
  'public/index.html',
].forEach(f => {
  copy(`${setupRoot}/${f}`, `${projectRoot}/${f}`);
});

console.log(`
  ᐅ Files copied successfully. Next steps:

  1. Run "npm install" (or "yarn install")
  2. Run "npm run dev" and open "http://localhost:9000"
`);
