function get_url_parmeters(name) {
	var url = window.location;
	name = name.replace(/[[]/, "\[").replace(/[]]/, "\]");
	var regexS = "[?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url);
	if (results == null)
		return "";
	else
		return results[1];
}