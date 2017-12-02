
(function () {

	function initCamera() {
		var video			= document.getElementById('video'),
			mediaConfig		=  {video: true, audio: false},
			errorCallback	= function(e) {
				console.error('An error has occurred!', e)
			};

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia(mediaConfig)
			.then(function(stream) {
				video.src = window.URL.createObjectURL(stream);
				video.play();
			});
		} else if (navigator.getUserMedia) {
			navigator.getUserMedia(mediaConfig, function(stream) {
				video.src = stream;
				video.play();
			}, errorCallback);
		} else if (navigator.webkitGetUserMedia) {
			navigator.webkitGetUserMedia(mediaConfig, function(stream) {
				video.src = window.webkitURL.createObjectURL(stream);
				video.play();
			}, errorCallback);
		} else if (navigator.mozGetUserMedia) {
			navigator.mozGetUserMedia(mediaConfig, function(stream) {
				video.src = window.URL.createObjectURL(stream);
				video.play();
			}, errorCallback);
		}
	}

	function takePicture(callback) {
		var video = document.getElementById("video"),
			canvas = document.getElementById("canvas");

		var w = video.offsetWidth,
			h = video.offsetHeight;

		canvas.width = w;
		canvas.height = h;
		var context = canvas.getContext("2d");

		context.drawImage(video, 0, 0, w, h);
		video.pause();

		callback(canvas.toDataURL("image/jpeg"));

		startLoader();
	}

	function pictureCallback(picture) {
		//console.log(picture
			console.log("calling initMap");
		
		initMap();
		console.log("finish initMap");
	}



	function init() {
		initCamera();

		document.querySelector('img.button').addEventListener('click', function() {
			takePicture(pictureCallback);
		});
	}

	init();

})();
