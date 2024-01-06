// Render.js

const axios = require("axios")
const Logger = require("@ryanforever/logger").v2


class Render {
	constructor(config = {}) {

		const key = config.key
		const serviceId = config.serviceId

		if (!key) return logger.error(`missing render API key`)
		const logger = new Logger(__filename, {debug: config.debug ?? false})

		axios.defaults.baseURL = "https://api.render.com/v1"
		axios.defaults.headers.common.Authorization = `Bearer ${key}`

		let actions = ["suspend", "resume", "restart", "deploy"]
		// init action methods
		actions.forEach(action => {
			Object.defineProperty(this, action, {
				value: async (service) => this.action(action, service),
				enumerable: true
			})
		})

		this.getServices = async (params) => this.get("services", params)

		this.findService = async function(service) {
			logger.debug(`finding service ${service}`)
			let services = await this.get("services")
			let match = services.find(x => x.service.name == service || x.service.id == service)
			if (!match) throw new Error(`could not find a service matching input "${service}"`)
			else return match.service
		}

		// perform an action
		this.action = async function(type, service) {
			if (!actions.includes(type)) throw new Error(`"${type}" is not a valid render action, must be either [${actions.join("|")}]`)
				
			if (serviceId) service = serviceId
			if (!service) throw new Error(`please input a name or id of a service you want to ${type}`)
			let match = await this.findService(service)
			let {id, name} = match
			logger.debug(`${type} service ${name}...`)

			let res = await axios.post(`/services/${id}/${type}`).catch(err => {
				throw new RenderError(err)
			})
			let data = res.data
			logger.debug(`${type} success on ${name}`)
			return data
		}

		// generic get
		this.get = async function(item, params = {}) {
			logger.debug(`getting ${item}...`)
			let res = await axios.get(item).catch(err => {
				logger.error(err)
				throw new RenderError(err)
			})
			let data = res.data
			return data
		}

		// perform custom request
		this.request = async function(url, options = {}) {
			logger.debug(`requesting ${url}`)
			let res = await axios({
				url,
				...options
			}).catch(err => {
				throw new RenderError(err)
			})
			let data = res.data
			return data
		}
	}
}


class RenderError extends Error {
	constructor(err) {
		let data = err?.response?.data
		let message = data?.message || data
		super(message)
		this.status = err.response.status
		this.statusText = err.response.statusText
	}
}


module.exports = Render





