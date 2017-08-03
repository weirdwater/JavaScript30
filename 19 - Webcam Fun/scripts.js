const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');



function getVideo () {
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
		.then(localMediaStream => {
			video.src = window.URL.createObjectURL(localMediaStream)
			video.play()
		})
		.catch(e => console.error(e))
}


function paintToCanvas () {
	const {videoWidth: width, videoHeight: height} = video

	canvas.width = width
	canvas.height = height

	ctx.drawImage(video, 0, 0, width, height)

	const pixels = ctx.getImageData(0, 0, width, height)
	colorShiftFilter(pixels)
	ctx.putImageData(pixels, 0, 0)

	window.requestAnimationFrame(paintToCanvas)
}

const getPixelColorIndex = (colorIndex, position) => {
	// get current position within pixel [r,g,b,a]
	const pixelIndex = position % 4
	// Get the difference between the current position and the desired color's index
	const mod = colorIndex - pixelIndex
	// Apply difference to position
	return position + mod
}
const red = getPixelColorIndex.bind(null, 0),
	green = getPixelColorIndex.bind(null, 1),
	blue = getPixelColorIndex.bind(null, 2),
	alpha = getPixelColorIndex.bind(null, 3)	

function redFilter (pixels) {
	const {data} = pixels
	for (let i = 0; i < data.length; i += 4) {
		data[red(i)] = data[red(i)] + 100
		data[green(i)] = data[green(i)] - 100
		data[blue(i)] = data[blue(i)] - 100
	}
	return pixels
}

function colorShiftFilter (pixels) {
	const {data} = pixels
	for (let i = 0; i < data.length; i += 4) {
		data[red(i)] = data[red(i + 400)]
		data[green(i - 200)] = data[green(i)]
		data[blue(i)] = data[blue(i + 50)]
	}
	return pixels
}

function Filter (pixels) {

}

function takePhoto () {
	snap.currentTime = 0
	snap.play()

	const data = canvas.toDataURL('image/jpeg')
	const link = document.createElement('a')
	link.href = data
	link.setAttribute('download', 'handsome')
	link.innerHTML = `<img src="${data}" alt="Handsome man" />`

	strip.insertBefore(link, strip.firstChild)
}


getVideo()

video.addEventListener('canplay', paintToCanvas)


