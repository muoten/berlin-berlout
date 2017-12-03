var refreshalId;

function startLoader(){
	let imageLoader = document.querySelector('#image-loader');

	var index = 1;
	refreshalId = setInterval(function(){
		imageLoader.src = './img/loader/' + index + '.jpg';
		index += 1;
		if(index == 12) index = 1;
	}, 250);
}

function stopLoader(){
	clearInterval(refreshalId);
	var imageLoader = document.querySelector('#image-loader');
	imageLoader.src = '';
	imageLoader.remove();
}
