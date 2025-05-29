#!/usr/bin/env node

const inquirer = require('inquirer');
const { writeEnv } = require('./lib/writeEnv');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(process.cwd(), '.env');

function getEnvObject() {
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  return dotenv.parse(content);
}

async function addNewVariable(envObject) {
  while (true) {
    const { key } = await inquirer.prompt({
      type: 'input',
      name: 'key',
      message: 'Enter key:',
      validate: input => input ? true : 'Key cannot be empty',
    });

    const { value } = await inquirer.prompt({
      type: 'input',
      name: 'value',
      message: `Enter value for ${key}:`,
    });

    envObject[key] = value;

    const { addMore } = await inquirer.prompt({
      type: 'confirm',
      name: 'addMore',
      message: 'Add another?',
      default: true,
    });

    if (!addMore) break;
  }

  writeEnv(envObject);
  console.log('✅ .env file updated!');
}

async function editVariable(envObject) {
  const keys = Object.keys(envObject);
  if (keys.length === 0) {
    console.log('⚠️ No variables found to edit.');
    return;
  }

  const { keyToEdit } = await inquirer.prompt({
    type: 'list',
    name: 'keyToEdit',
    message: 'Choose a key to edit:',
    choices: keys,
  });

  const { newValue } = await inquirer.prompt({
    type: 'input',
    name: 'newValue',
    message: `Enter new value for ${keyToEdit}:`,
    default: envObject[keyToEdit],
  });

  envObject[keyToEdit] = newValue;
  writeEnv(envObject);
  console.log(`✅ ${keyToEdit} updated!`);
}

async function deleteVariable(envObject) {
  const keys = Object.keys(envObject);
  if (keys.length === 0) {
    console.log('⚠️ No variables found to delete.');
    return;
  }

  const { keyToDelete } = await inquirer.prompt({
    type: 'list',
    name: 'keyToDelete',
    message: 'Choose a key to delete:',
    choices: keys,
  });

  delete envObject[keyToDelete];
  writeEnv(envObject);
  console.log(`✅ ${keyToDelete} removed from .env file.`);
}

async function main() {
  console.log('📝 Write to .env file\n');

  let exit = false;

  while (!exit) {
    const envObject = getEnvObject();

    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add new environment variable',
        'Edit existing variable',
        'Delete a variable',
        'Exit',
      ],
    });

    switch (action) {
      case 'Add new environment variable':
        await addNewVariable(envObject);
        break;

      case 'Edit existing variable':
        await editVariable(envObject);
        break;

      case 'Delete a variable':
        await deleteVariable(envObject);
        break;

      case 'Exit':
        exit = true;
        console.log('👋 Goodbye!');
        break;
    }
  }
}

main();
