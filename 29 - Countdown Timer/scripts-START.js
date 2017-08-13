const endTime = document.querySelector('.display__end-time')
const timeLeft = document.querySelector('.display__time-left')
let currentCountdown;

const doubleDigits = number => `0${number}`.slice(-2)

function startPreset () {
	const seconds = parseInt(this.dataset.time)
	setCountdown(seconds)
}

function startCustom (e) {
	e.preventDefault()
	// get time
	const minutes = parseInt(this.minutes.value)
	// convert to seconds
	const seconds = minutes * 60
	// start countdown
	setCountdown(seconds)
}

function setCountdown (seconds) {
	// Stop any running countdowns
	if (currentCountdown) clearTimeout(currentCountdown)

	// determine at what time the countdown will end
	const now = Date.now()
	const then = now + seconds * 1000 // ms
	const timerEnd = new Date(then)

	// display time at which the timer will end
	const h = timerEnd.getHours()
	const mm = doubleDigits(timerEnd.getMinutes())
	const message = `Be back at ${h}:${mm}`
	endTime.textContent = message

	// Start countdown
	countdown(seconds)
}

function countdown (seconds) {
	// format remaining seconds to be M:SS
	const m = Math.floor(seconds / 60)
	const ss = doubleDigits(seconds % 60)
	// display time remaining
	timeLeft.textContent = `${m}:${ss}`

	// If there are seconds left, call this function a second from now with remaining seconds
	if (seconds) {
		const secondsRemaining = seconds - 1
		const timeout = 1000
		currentCountdown = setTimeout(countdown, timeout, secondsRemaining)
	}
}

document.querySelectorAll('.timer__button').forEach(button => {
	button.addEventListener('click', startPreset)
})

document.customForm.addEventListener('submit', startCustom)