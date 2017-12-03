function makeblob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

function callCV (key, picture, callback) {
	var headers = new Headers();
	headers.append("Content-Type", "application/octet-stream");
	//headers.append("Content-Type", "application/json");
	headers.append("Ocp-Apim-Subscription-Key", key);

	var file = makeblob(picture);

	//console.log(file, window.URL.createObjectURL(file));
	var options = {
		method: 'POST',
		headers: headers,
		mode: 'cors',
		cache: 'default',
		//body: JSON.stringify({url: window.URL.createObjectURL(file)})
		body: file
	}

	var params = {
		"visualFeatures": "Categories,Description,Color",
		"details": "",
		"language": "en",
	}

	var parsedParams = Object.keys(params).map(function(key) {
		return key + '=' + params[key];
	}).join('&');

	var uri = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?" + parsedParams;

	fetch(uri, options)
		.then(function (res) {
			var contentType = res.headers.get("content-type");
			if (contentType && contentType.includes("application/json")) {
				return res.json();
			}
			throw new TypeError("Oops, we haven't got JSON!");
		}).then(function (json) {
        callback(json);
		}).catch(function (err) {
			console.error(err);
		});
  }
