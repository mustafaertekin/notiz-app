const serve = require('serve')

const server = serve('clientSide/', {
  port: 3000
})

console.log('Running at http://localhost:3000');
console.log('Rest-API is running at http://localhost:8000');