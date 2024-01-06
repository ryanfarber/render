// test.js

require("dotenv").config({path: "../.env"})
const Render = require("../src")
const render = new Render({
	key: process.env.RENDER_KEY
})


render.getServices().then(console.log)