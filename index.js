const express = require("express")
const actionRouter = require("./routes/actionRouter")
const projectRouter = require("./routes/projectRouter")
const server = express()
const port = 4000

server.use(express.json())
server.use(actionRouter)
server.use(projectRouter)


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})