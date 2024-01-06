# render
[![Version](https://img.shields.io/npm/v/@ryanforever/render.svg)](https://www.npmjs.org/package/@ryanforever/render)
API wrapper for [Render](https://render.com), the cloud services platform.

This only implements a few native methods corresponding to the API, but there is a `.request()` method you can use to make any other request you'd like.

Please consult the [Render Docs](https://api-docs.render.com/reference/introduction) for more info.


```javascript
const Render = require("@ryanforever/render")
const render = new Render({
	key: process.env.RENDER_KEY
	serviceId: process.env.RENDER_SERVICE_ID // optionally specifiy a service id to perform all actions on
})

render.restart("my-web-service")
render.restart() // if serviceId provided in setup
```


## usage
```javascript
// get list of services
render.getServices()

// find a service
render.findService("service-name-or-id")

// perform actions on a service
render.restart("service-name-or-id")
render.suspend("service-name-or-id")
render.resume("service-name-or-id")
render.deploy("service-name-or-id")

// make a custom request directly to the render API
render.request("/services", {
	method: "GET"
}) 
```

