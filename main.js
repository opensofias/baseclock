import { presets } from './presets.js'

let config

let currentTimer

const msPerDay = 1000 * 60 * 60 * 24
const msPerSUnit = ()=>
	msPerDay / config.units.reduce ((val, acc) => acc * val, 1)

const toTimeArray = ms => {
	let sUnits = ms / msPerSUnit ()
	return config.units.reduce ((acc, unit) => {
		acc.unshift (sUnits % unit)
		sUnits /= unit
		return acc
	}, [])
}

const clockString = (timeArray, separators) =>
	separators.map ((sep, index) => 
		sep + (
			typeof timeArray[index] == 'undefined' ?
			'' : (timeArray[index] | 0).toString(36)
		)
	).join ('').toUpperCase ()

const renderClock = ()=> {
	const msOfToday = Date.now() % msPerDay

	currentTimer = setTimeout (renderClock,
		msPerSUnit () - (msOfToday % msPerSUnit ())
	)

	document.body.innerHTML =
	clockString (toTimeArray (msOfToday), config.separators)
}

onload = onhashchange = () => {
	location.hash = location.hash || '#hex'
	const preset = presets [location.hash.slice(1)]
	typeof preset != 'undefined' && (config = preset)
	const charsRoot = Math.sqrt (
		preset.separators
		.filter (x =>
			x != '' &&
			! (x.startsWith('<') && x.endsWith('<'))
		).length +
		preset.units.length
	)

	document.body.style =
		'font-size: calc(' +
		60 / charsRoot + 'vh + ' +
		30 / charsRoot + 'vw);' +
		'line-height: 1em;'

	clearTimeout (currentTimer)
	renderClock()
}