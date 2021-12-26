import { presets } from './presets.js'

let config

let currentTimer

const msPerDay = 1000 * 60 * 60 * 24
const msPerShortUnit = ()=>
	msPerDay / config.units.reduce ((val, acc) => acc * val, 1)

const toTimeArray = ms => 
	config.units.reduce (({remaining, timeArray}, unit) => ({
		remaining: remaining / unit,
		timeArray: [remaining % unit, ...timeArray]
	}), {remaining: ms / msPerShortUnit (), timeArray: []})
	.timeArray

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
		msPerShortUnit () - (msOfToday % msPerShortUnit ())
	)

	document.body.innerHTML =
	clockString (toTimeArray (msOfToday), config.separators)
}

onload = onhashchange = () => {
	location.hash ||= '#hex'
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