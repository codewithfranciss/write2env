# write2env

> 📝 Easily create, edit, and delete `.env` environment variables  
> Both via a simple CLI and programmatically from your Node.js code.

---

## Why write2env?

Managing environment variables in `.env` files can be a pain, manually opening and editing files risks mistakes and slows you down.  
`write2env` makes it effortless to add, update, or remove `.env` variables without ever opening the file.

---

## Features

- Interactive CLI to add, edit, or delete environment variables
- Programmatic API to update `.env` files from your Node.js projects
- Automatically creates `.env` file if it doesn’t exist
- Preserves existing variables when updating or deleting
- Cross-platform support (Windows, macOS, Linux)

---

## Installation

Install globally to use the CLI anywhere:

```bash
npm install -g write2env
```

Or install locally in your project:
```bash
npm install write2env
```
## Usage CLI

 Simply run 
```bash
 write2env
```
You will see an interactive menu:
- Add new environment variable
- Edit existing variable
- Delete a variable
- Exit

Follow the prompts to update your `.env` file easily.

---

## Programmatic Usage
You can also use `write2env` inside your Node.js code:
```bash
 const { writeEnv } = require('write2env');

writeEnv({
  API_URL: 'https://api.example.com',
  SECRET_KEY: 'mySecret123',
});

```

---

## Contributing
Contributions are welcome! Please open issues or pull requests on GitHub.

## License
MIT © codewithfrancis

## Notes
-This tool is inspired by the need for a simpler .env management experience.
-Hope popular frameworks like Next.js, React, and Express adopt similar built-in features soon!

## Support
If you find this package useful, please ⭐ star the repo and share it with others!