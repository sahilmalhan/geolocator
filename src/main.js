/*
 * Fetch location data. Works on browsers with HTML5 geolocation support only.
 */ 
function getLocation() {

	if (navigator.geolocation) {
		var optn = {
					enableHighAccuracy : true,
					timeout : Infinity,
					maximumAge : 0
				};
		navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
	} else {
		// Alert/Swallow. Browser does not support Geolocation. 
	}
}

/*
 * Fetch Latitude and Longitude positions.
 */ 
function showPosition(position) {
    var longi = position.coords.latitude;
    var lati = position.coords.longitude;

    displayLocation(longi, lati);
}

/*
 * Error handling for geolocation. 
 */
function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			alert("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			alert("An unknown error occurred.");
			break;
	}
}

/*
 * Convert latitude/longitude to formatted address. 
 */
function displayLocation(latitude, longitude) {
	var request = new XMLHttpRequest();

	var method = 'GET';
	var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=false';
	var async = true;

	request.open(method, url, async);
	request.onreadystatechange = function() {

		if (request.readyState == 4 && request.status == 200) {
			var data = JSON.parse(request.responseText);
			var address = data.results[0];

			for (var i = 0; i < address.address_components.length; i++) {
				if (address.address_components[i].types[0] == "locality") {
					city = address.address_components[i];
				}

				if (address.address_components[i].types[0] == "administrative_area_level_1") {
					region = address.address_components[i];
				}

				if (address.address_components[i].types[0] == "country") {
					country = address.address_components[i];
				}
			}

            // Location data 
            alert(city.long_name + ", " + region.long_name + ", " + country.short_name)
		}
	};

	request.send();
};