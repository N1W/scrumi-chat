module.exports = {
	sendSMSRequest: function (id, data, rId, pStatus) {
		var fd = new FormData();
		fd.append("sendm", JSON.stringify({
								'text': data,
								'receiver': rId,
								'private': pStatus}));
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/ajax/chat', true);
		xhr.onload = function() {
			if (this.status == 200) {
				console.log("Server got: ", xhr.responseText);
			}
		};
		xhr.send(fd);
	},
	getSMSRequest: function (id, rid, pStatus, fc) {
		var fd = new FormData();
		fd.append("getm", JSON.stringify({'receiver': rid,'private': pStatus}));

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				fc(JSON.parse(xhr.responseText));
			}
		}
		xhr.open('POST', '/ajax/chat', true);
		xhr.send(fd);
	},
	sendFile: function(file, type){
		var fd = new FormData();
		fd.append("afile", file);
		fd.append("sendf", JSON.stringify({'type': type}));

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/ajax/chat', true);

		xhr.onload = function() {
			if (this.status == 200) {
				console.log(JSON.parse(xhr.responseText));
			};
		};
		xhr.send(fd);
	},
	getFile: function (fc) {
		var fd = new FormData();
		fd.append("getf", JSON.stringify('true'));

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				fc(JSON.parse(xhr.responseText));
			}
		}
		xhr.open('POST', '/ajax/chat', true);
		xhr.send(fd);
	},
	getPrivate(id, fc) {
		var request = {
			'receiver': localStorage.getItem('id')
		}
		
		var fd = new FormData();
		fd.append("private", JSON.stringify(request));

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				fc(JSON.parse(xhr.responseText));
			}
		}
		xhr.open('POST', '/ajax/chat', true);
		xhr.send(fd);
	},
	logOff() {
		var fd = new FormData();
		fd.append("logoff", JSON.stringify({'user': localStorage.getItem("id")}));

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
				console.log(xhr.responseText);
			}
		}
		xhr.open('POST', '/ajax/chat', true);
		xhr.send(fd);
	},
	logInn(fc){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				fc(JSON.parse(xhr.responseText));
				localStorage.setItem('id', JSON.parse(xhr.responseText).id);
			}
		}
		xhr.open('GET', '/ajax/iam', true);
		xhr.send();
  }
}