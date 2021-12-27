import { presets } from './presets.js'

let currentTimer

const msPerDay = 1000 * 60 * 60 * 24
const msPerShortUnit = units =>
	msPerDay / units.reduce ((val, acc) => acc * val, 1)

const toTimeArray = ({units}) => ms => 
	units.reduce (({remaining, timeArray}, unit) => ({
		remaining: remaining / unit,
		timeArray: [remaining % unit, ...timeArray]
	}), {remaining: ms / msPerShortUnit (units), timeArray: []})
	.timeArray

const weave = ([item, ...rest], ...strands) => (woven = []) =>
	(strands [0].length ?
		weave (...strands, rest) :
		x => x
	) ([...woven, item])

const clockString = ({separators}) => timeArray =>
	weave (separators,
		timeArray
		.map(Math.floor)
		.map (x => x.toString (36))
	) ().join ('').toUpperCase ()

const renderClock = config => {

	const msOfToday = Date.now() % msPerDay
	const shorts = msPerShortUnit (config.units)

	currentTimer = setTimeout (
		renderClock, shorts - (msOfToday % shorts), config
	)

	document.body.innerHTML =
		clockString (config) (toTimeArray (config) (msOfToday))
}

onload = onhashchange = () => {
	location.hash ||= '#hex'
	const preset = presets [location.hash.slice(1)] ??
	(console.error ('undefined parameter:' + location.hash) || presets.hex)
	const charsRoot = Math.sqrt (
		preset.separators
		.filter (x =>
			x != '' &&
			! (x.startsWith('<') && x.endsWith('>'))
		).length +
		preset.units.length
	)

	document.body.style =
		'font-size: calc(' +
		60 / charsRoot + 'vh + ' +
		30 / charsRoot + 'vw);' +
		'line-height: 1em;'

	clearTimeout (currentTimer)
	renderClock(preset)
}