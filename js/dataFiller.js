var fillData = function(url, dataUser) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        dataUser(JSON.parse(this.responseText));
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}