const Colors = require('colors')

class Logger {
	constructor(name) {
		this.name = name
	}

	log(...args) {
		const date = new Date()

		const h = date.getHours()
		const m = date.getMinutes()
		const s = date.getSeconds()

		console.log(`[${this.name}]`.green, `[${h < 10 ? '0'+h : h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}]`.blue, ...args)
	}
}

module.exports = Logger