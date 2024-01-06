# render
API wrapper for [Render](https://render.com), the cloud services platform.
This only implements a few methods corresponding to the API, but there is a `.request()` method you can use to make any other request you'd like.

Please consult the [Render Docs](https://api-docs.render.com/reference/introduction) for more info.


```javascript
const Render = require("@ryanforever/render")
const render = new Render({
	key: process.env.RENDER_KEY
})

render.restart("my-web-service")
```


## usage
```javascript

// get list of services
render.getServices()

// find a service
render.findService("service-name-or-id")

// perform actions on a service
render.restart("my-web-service")
render.suspend("my-web-service")
render.resume("my-web-service")
render.deploy("my-web-service")

// make a custom request directly to the render API
render.request("/services", {
	method: "GET"
}) 
```

