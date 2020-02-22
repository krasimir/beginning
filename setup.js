#!/usr/bin/env node

/* eslint-disable import/no-dynamic-require */

const path = require('path');
const fs = require('fs');

function fail(message) {
  console.error(`\nᐅ ${message}\n`);
  process.exit(1);
}

const projectRoot = process.cwd();
const setupRoot = __dirname;

if (!fs.existsSync(`${projectRoot}/package.json`)) {
  fail(`There is no package.json file in ${projectRoot}.\n  Please create one.`);
}

const setupPkg = require(path.resolve(__dirname, 'package.json'));
console.log(setupPkg);
const projectPkg = require(`${projectRoot}/package.json`);

