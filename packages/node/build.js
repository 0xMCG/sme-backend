const path = require('path');
const { execSync } = require('child_process');

const entryFile = path.join(__dirname, 'src', 'cli.ts');
const outputFile = path.join(__dirname, 'dist', 'node');

execSync(`npx nest build`);
execSync(`npx pkg ${entryFile} --output ${outputFile}`);