// variable

var source, destination;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();

// default load
google.maps.event.addDomListener(window, 'load', function () {
	var sourceAuto = new google.maps.places.Autocomplete(document.getElementById('txtSource'));
	var destAuto = new google.maps.places.Autocomplete(document.getElementById('txtDestination'));

	source = document.getElementById("txtSource").value;
	destination = document.getElementById("txtDestination").value;

	new google.maps.places.SearchBox(source);
	new google.maps.places.SearchBox(document.getElementById('txtDestination'));
	directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
});

// on button click call function
function GetRoute() {
	var mumbai = new google.maps.LatLng(18.9750, 72.8258);
	var mapOptions = {
		zoom: 5,
		center: mumbai
	};
	map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('dvPanel'));

	//*********DIRECTIONS AND ROUTE**********************//
	source = document.getElementById("txtSource").value;
	destination = document.getElementById("txtDestination").value;

	var request = {
		origin: source,
		destination: destination,
		travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function (response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});

	//*********DISTANCE AND DURATION**********************//
	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix({
		origins: [source],
		destinations: [destination],
		travelMode: google.maps.TravelMode.DRIVING,
		unitSystem: google.maps.UnitSystem.METRIC,
		avoidHighways: false,
		avoidTolls: false
	}, function (response, status) {
		if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
			var distance = response.rows[0].elements[0].distance.text;
			var duration = response.rows[0].elements[0].duration.text;
			var dvDistance = document.getElementById("dvDistance");
			dvDistance.innerHTML = "";
			dvDistance.innerHTML += "Distance: " + distance + "<br />";
			dvDistance.innerHTML += "Duration:" + duration;

		} else {
			alert("Unable to find the distance via road.");
		}
	});
}