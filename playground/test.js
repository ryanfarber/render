// test.js

require("dotenv").config({path: "../.env"})
const Render = require("../src")
const render = new Render({
	key: process.env.RENDER_KEY,
	serviceId: process.env.RENDER_SERVICE_ID,
	debug: true
})

render.getServices().then(console.log)
// render.findService("dollarsong").then(console.log)

// render.resume()