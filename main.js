import { presets } from './presets.js'

let currentTimer

const msPerDay = 1000 * 60 * 60 * 24
const msPerTick = ({units}) =>
	msPerDay / units.reduce ((val, acc) => acc * val, 1)

const toTimeArray = ({units}) => ms =>
	units.reduce (({remaining, timeArray}, unit) => ({
		remaining: remaining / unit,
		timeArray: [remaining % unit, ...timeArray]
	}), {remaining: ms / msPerTick ({units}), timeArray: []})
	.timeArray

const weave = ([item, ...rest], ...strands) => (woven = []) =>
	(strands [0].length ?
		weave (...strands, rest) :
		x => x
	) ([...woven, item])

const clockString = ({separators}) => timeArray =>
	weave (separators,
		timeArray.map (x => Math.floor(x).toString (36))
	) ().join ('').toUpperCase ()

const renderClock = config => msToday => 
	document.body.innerHTML =
		clockString (config) (toTimeArray (config) (msToday))

const clockLoop = config => ((msToday, msTick) =>
	renderClock (config) (msToday) && (
		currentTimer = setTimeout (
		clockLoop, msTick - (msToday % msTick), config
	))
) (Date.now() % msPerDay, msPerTick (config))

const adaptStyle = ({separators, units}) => {
	const charsRoot = Math.sqrt (
		separators
		.filter (x => x != '')
		.filter (x => !(x.startsWith('<') && x.endsWith('>')))
		.length +
		units.length
	)

	document.body.style =
		'font-size: calc(' +
		60 / charsRoot + 'vh + ' +
		30 / charsRoot + 'vw);'
}

onload = onhashchange = () => {
	location.hash ||= '#hex'
	const preset = presets [location.hash.slice(1)] ??
	(console.error ('undefined parameter:' + location.hash) || presets.hex)

	adaptStyle (preset)
	clearTimeout (currentTimer)
	clockLoop(preset)
}