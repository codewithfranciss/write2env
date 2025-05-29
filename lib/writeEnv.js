const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(process.cwd(), '.env');

function getEnvObject() {
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  return dotenv.parse(content);
}

function writeFullEnvObject(envObj) {
  const content = Object.entries(envObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n') + '\n';
  fs.writeFileSync(envPath, content, 'utf8');
}

function writeEnv(newVars) {
  const envObject = getEnvObject();
  Object.assign(envObject, newVars);
  writeFullEnvObject(envObject);
}

module.exports = { writeEnv };
