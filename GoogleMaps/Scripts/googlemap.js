
//google map -----
var latitudes = $(".lat").val();
var lomgitudes = $(".long").val();

var geocoder;
geocoder = new google.maps.Geocoder();
google.maps.event.addDomListener(window, 'load', function () {

	var places = new google.maps.places.Autocomplete(document.getElementById('Location'));
	google.maps.event.addListener(places, 'place_changed', function () {
		var place = places.getPlace();
		var location = place.geometry.location;
		getAddress(location);
	});

});

function getAddress(latLng) {
	geocoder.geocode({
		'latLng': latLng
	},
		function (results, status) {

			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					//  $scope.fullAddress = results[0].formatted_address;
					$("#Location").val(results[0].formatted_address);
					//console.log(results[0].formatted_address);
				} else {
					document.getElementById("autocomplete1").value = "No results";
				}
			} else {
				document.getElementById("autocomplete1").value = status;
			}
		});
}

//Location
google.maps.event.addDomListener(window, 'load', function () {

	var options = {

		// componentRestrictions: { country: 'in' }
	};

	//var myCenter = new google.maps.LatLng(-36.848461, 174.763336);
	var myCenter = new google.maps.LatLng(20.5992349, 72.9342451);
	var mapProp = {
		center: myCenter,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

	var marker = new google.maps.Marker({
		position: myCenter,
		//animation: google.maps.Animation.BOUNCE,
		draggable: true
	});


	marker.setMap(map);



	var loca = new google.maps.places.Autocomplete(document.getElementById('Location'), options);
	google.maps.event.addListener(loca, 'place_changed', function () {
		var aplace = loca.getPlace();
		var aLocation = aplace.geometry.location;
		var lat = aLocation.lat();
		var long = aLocation.lng();
		$(".lat").val(lat);
		$(".long").val(long);
		var myCenter = new google.maps.LatLng(lat, long);
		var mapProp = {
			center: myCenter,
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

		var marker = new google.maps.Marker({
			position: myCenter,
			//animation: google.maps.Animation.BOUNCE,
			draggable: true
		});


		marker.setMap(map);


		google.maps.event.addListener(marker, 'dragend', function (e) {
			var latLng = e.latLng;
			$(".lat").val(latLng.lat());
			$(".long").val(latLng.lng());
			getAddress(latLng);
		});

		google.maps.event.addListener(map, "click", function (e) {
			var latLng = e.latLng;
			//lat and lng is available in e object
			$(".lat").val(latLng.lat());
			$(".long").val(latLng.lng());


		});

	});
});