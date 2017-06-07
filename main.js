const units = [16,16,16,16]
const dayMils = 1000 * 60 * 60 * 24
const sUnitMils = dayMils /
	units.reduce ((val, acc) => val * acc,1)

const renderClock = ()=> {
	const milsToday = Date.now() % dayMils

	setTimeout (renderClock,
		sUnitMils - (milsToday % sUnitMils)
	)

	let unitsToday = milsToday / sUnitMils
	const timeArray = []
	units.forEach (unit => {
		timeArray.unshift ((unitsToday % unit) | 0)
		unitsToday /= unit
	})

	const digitArray = timeArray.map (digt => digt.toString(36))
	digitArray.splice (2, 0, '<wbr/>') // insert zero-width space
	document.body.innerHTML =	digitArray.join ('').toUpperCase ()
}

window.onload = renderClock