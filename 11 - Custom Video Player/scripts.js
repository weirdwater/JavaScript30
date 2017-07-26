const player = document.querySelector('.player')
const video = document.querySelector('.viewer')
const playToggleButton = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('button[data-skip]')
const rangeInputs = player.querySelectorAll('input[type="range"')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const fullscreenButton = player.querySelector('.go-full')
let mouseDown = false


const togglePlay = () => video.paused ? video.play() : video.pause()

const jumpTime = (seconds) => video.currentTime = video.currentTime + seconds

const changeSpeed = (modifier) => video.playbackRate = video.playbackRate + modifier

const togglePlayPauseIcon = () => playToggleButton.innerText = video.paused ? '►' : '❚ ❚'

const enterFullScreen = () => video.webkitEnterFullScreen()

const seek = (e) => {
	// Determine how far in the video the user wants to be
	const cursorPosition = e.offsetX
	const seekBarWidth = progress.clientWidth
	const desiredProgress = cursorPosition / seekBarWidth

	// Determine what time that translates to
	const { duration } = video
	const desiredTime = duration * desiredProgress

	// Set the video time
	video.currentTime = desiredTime
}

const updateProgressBar = () => {
	const timePercentage = (video.currentTime * 100) / video.duration
	progressBar.style.flexBasis = timePercentage + '%'

}

function handleRangeUpdate() {
	video[this.name] = this.value
}

function skip () {
	const modifier = parseInt(this.dataset.skip, 10)
	jumpTime(modifier)
}

function handleKeyboard (e) {
	switch (e.keyCode) {
		case 32: // space
		case 75: // k
			togglePlay()
			break;
		case 70: // f
			enterFullScreen()
			break;
	}
}

progress.addEventListener('click', seek)
progress.addEventListener('mousemove', e => mouseDown && seek(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)

playToggleButton.addEventListener('click', togglePlay)
fullscreenButton.addEventListener('click', enterFullScreen)
skipButtons.forEach(button => button.addEventListener('click', skip))

window.addEventListener('keydown', handleKeyboard)

rangeInputs.forEach(input => {
	input.addEventListener('change', handleRangeUpdate)
	input.addEventListener('mousemove', handleRangeUpdate)
})

video.addEventListener('play', togglePlayPauseIcon)
video.addEventListener('pause', togglePlayPauseIcon)
video.addEventListener('timeupdate', updateProgressBar)
