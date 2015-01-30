function myGoodLoadWeatherXML(data) {
	var items = $(data).find('item');
/* 	$(data).find("item").each(function(){
		item = $(this).children('city').children('coord');
		console.log($(item).attr('lat'));
	}); */
		
	for (var i = 0; i < items.length; i++) {
		$('#weather').append('<div class="col-sm-4 col-md-4 col-lg-4 myOutline">' + $(items[i]).children('city').children('coord').attr('lat') + ',' + $(items[i]).children('city').children('coord').attr('lon') + '</div><div class="col-sm-4 col-md-4 col-lg-4 myOutline myBack1">Current Temperature in ' + $(items[i]).children('city').attr('name') + '</div><div class="col-sm-4 col-md-4 col-lg-4 myOutline myBack2">Value: ' + $(items[i]).children('temperature').attr('value') + ' ' + $(items[i]).children('temperature').attr('unit') + ' Min: ' + $(items[i]).children('temperature').attr('min') + ' ' + $(items[i]).children('temperature').attr('unit') + ' Max: ' + $(items[i]).children('temperature').attr('max') + ' ' + $(items[i]).children('temperature').attr('unit') + '</div>');
	}
}

function myGoodLoadTrafficJSON(data) {
	var total = data.resourceSets[0].estimatedTotal;
	for (var i = 0; i < total; i++) {
		$('#traffic').append('<div class="col-sm-4 col-md-4 col-lg-4 myOutline">' + data.resourceSets[0].resources[i].point.coordinates + '</div><div class="col-sm-6 col-md-6 col-lg-6 myOutline myBack1">' + data.resourceSets[0].resources[i].description + '</div><div class="col-sm-2 col-md-2 col-lg-2 myOutline myBack2">' + "Road Closed: " + data.resourceSets[0].resources[i].roadClosed + '</div>')
	}
}

function myGoodLoadEarthquakeJSON(data) {
	for (var i = 0; i < data.features.length; i++) {
		$('#earthquake').append('<div class="col-sm-4 col-md-4 col-lg-4 myOutline">' + data.features[i].geometry.coordinates[1]+ "," + data.features[i].geometry.coordinates[0] + " Depth: " + data.features[i].geometry.coordinates[2] + " km" + '</div><div class="col-sm-4 col-md-4 col-lg-4 myOutline myBack1"><a href="' + data.features[i].properties.url + '">' + data.features[i].properties.title + '</a></div><div class="col-sm-4 col-md-4 col-lg-4 myOutline myBack2">' + "Magnitude:" + data.features[i].properties.mag + " " + data.features[i].properties.magType + '</div>')
	}
}

function jsonFlickrFeed(data) {
		myGoodLoadFlickrJSONP(data)
}

function myGoodLoadFlickrJSONP(data) {
	for (var i = 0; i < data.items.length; i++) {
		$('#flickr').append('<div class="col-sm-4 col-md-4 col-lg-4 myOutline">' + data.items[i].latitude + "," + data.items[i].longitude + '</div><div class="col-sm-8 col-md-8 col-lg-8 myOutline myBack1">' + data.items[i].description + '</div>')
	}
}

function myGoodLoadInstagramJSON(data) {
	for (var i = 0; i < data.data.length; i++) {
		$('#instagram').append('<div class="col-sm-4 col-md-4 col-lg-4 myOutline">' + data.data[i].location.latitude + "," + data.data[i].location.longitude + '</div><div class="col-sm-8 col-md-8 col-lg-8 myOutline myBack1"><p><a href="http://instagram.com/' + data.data[i].user.username + '/">' + data.data[i].user.username +  '</a> posted a photo:</p><a href="' + data.data[i].link + '" title="' + data.data[i].user.username + '"><img src="' + data.data[i].images.low_resolution.url + '" alt="' + data.data[i].user.username + '" style="width:' + data.data[i].images.low_resolution.width + 'px;height:' + data.data[i].images.low_resolution.height + 'px"/></a></div>')
	}
}

function myBadLoadFunction(XMLHttpRequest,errorMessage,errorThrown) {
	alert("Load failed:"+errorMessage+":"+errorThrown);
}

function myReadyFunction() {
	$.ajax({
		url: "https://students.ics.uci.edu/~harrynp/assignments/RealtimeWeb/myProxy.php?http://api.openweathermap.org/data/2.5/find?lat=33.6694&lon=-117.8231&cnt=10&units=metric&mode=xml",
		dataType: "xml",
		success: myGoodLoadWeatherXML,
		error: myBadLoadFunction
	});
	$.ajax({
		url: "https://students.ics.uci.edu/~harrynp/assignments/RealtimeWeb/myProxy.php?http://dev.virtualearth.net/REST/v1/Traffic/Incidents/33.6842,-117.7925,34.0500,-118.2500?key=Ag4hShfXA5VynNHyPcZCd7TVZ0Kt2Ftw-YjA8MwU4KDZ7-bVdX6lvVjPPSQf0gr4",
		dataType: "json",
		success: myGoodLoadTrafficJSON,
		error: myBadLoadFunction
	});
	$.ajax({
		url: "https://students.ics.uci.edu/~harrynp/assignments/RealtimeWeb/myProxy.php?http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
		dataType: "json",
		success:myGoodLoadEarthquakeJSON,
		error: myBadLoadFunction
	});
	$.ajax({
		url: "https://api.flickr.com/services/feeds/geo/United+States/California/Irvine&format=json",
		dataType: "jsonp",
		jsonp: jsonFlickrFeed,
	});
	$.ajax({
		url: "https://students.ics.uci.edu/~harrynp/assignments/RealtimeWeb/myProxy.php?https://api.instagram.com/v1/media/search?lat=33.6694&lng=-117.8231&client_id=98a8de46c63a4df1a4d2d623428e4ef9",
		dataType: "json",
		success: myGoodLoadInstagramJSON,
		error: myBadLoadFunction,
	});
}

$(document).ready(
	myReadyFunction
);