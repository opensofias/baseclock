'use strict'

const presets = {
	hex: {
		units : [16,16,16,16],
		separators : '##<wbr/>##'
	}, hexMic: {
		units : [16,16,16,16,16,16],
		separators : '##<wbr/>## ##'
	}, babDec: {
		units : [2.4,10,6,10,6,10], //not sure if right
		separators : '##:##<wbr/>:##'
	}, babHex: {
		units : [24/16,16,60/16,16,60/16,16], //doesn't work..
		separators : '##:##<wbr/>:##'
	}, bab: {
		units: [24,60,60],
		separators: '#:#:#'
	}, dec: {
		units: [10,100,100],
		separators: '#.#.#'
	}, decDigit: {
		units: [10,10,10,10,10],
		separators: '#.##<wbr/>.##'
	}, bin: {
		units: [2,2,2,2, 2,2,2,2, 2,2,2,2, 2,2,2,2],
		separators: '#### #### #### ####'
	}, binMic: {
		units: [
			2,2,2,2, 2,2,2,2, 2,2,2,2, 2,2,2,2,
			2,2,2,2, 2,2,2,2
		], separators: '#### #### #### #### #### ####'
	}, quat: {
		units: [4,4,4,4,4,4,4,4],
		separators: '####<br/>####'
	}, quatMic: {
		units: [4,4,4,4,4,4,4,4,4,4,4,4],
		separators: '#### #### ####'
	}, 27: {
		units: [27,27,27,27],
		separators: '####'
	}, 36: {
		units: [36,36,36],
		separators: '###'
	}
}

for (let name in presets) {
	presets[name].units =
	presets[name].units.reverse()
	presets[name].separators =
	presets[name].separators.split ('#')
}