const http = require('http');

const PORT = 8082

const serverHandle = require('../app')

const server= http.createServer(serverHandle)

server.listen(PORT)

console.log(`已经启动: http://localhost:${PORT}`)