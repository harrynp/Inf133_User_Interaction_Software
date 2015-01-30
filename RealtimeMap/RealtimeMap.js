var latlngArray = [];
var heatmap;

function rowColor(n) {
	if (n % 2 === 0) {
		return "myBack1";
	}
	return "myBack2";
}

function markerChooser(roadClosed) {
	if (roadClosed === true) {
		return 'images/roadClosed.png';
	}
}

//Data Retrieval Functions
function myGoodLoadTrafficJSON(data) {
	var total = data.resourceSets[0].estimatedTotal;
	for (var i = 0; i < total; i++) {
		var coordinates = data.resourceSets[0].resources[i].point.coordinates;
		var str = coordinates.toString();
		var res = str.split(",");
		var latlng = new google.maps.LatLng(coordinates[0], coordinates[1]);
		latlngArray.push(latlng);
		$('#data').append('<div class="row ' + rowColor(i) + '"><div class="col-xs-12 col-sm-12 col-md-6 col-lg-6"><a href="javascript:void(0)" onclick="map.setCenter(latlngArray[' + i + ']);return false;" class="btn btn-info">' + coordinates + '</a></div><div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">' + data.resourceSets[0].resources[i].description + '</div></div>');
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: data.resourceSets[0].resources[i].description,
			icon: markerChooser(data.resourceSets[0].resources[i].roadClosed)
		});
	}
	var pointArray = new google.maps.MVCArray(latlngArray);
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: pointArray
	});
    heatmap.setMap(map);
    heatmap.set('radius', 20);

}


function myBadLoadFunction(XMLHttpRequest,errorMessage,errorThrown) {
	alert("Load failed:"+errorMessage + ":" + errorThrown + " Click to dismiss me.");
	var options =  {
		content: "Load failed:"+errorMessage + ":" + errorThrown + " Click to dismiss me.", // text of the snackbar
		style: "toast", // add a custom class to your snackbar
		timeout: 0 // time in milliseconds after the snackbar autohides, 0 is disabled
	}
	$.snackbar(options);
}

//Map Functions
var map;
function initializeMap() {
  var myOptions = {
		zoom: 10,
		center: new google.maps.LatLng(33.8683, -118.0675),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map($('#map_canvas').get(0), myOptions);

}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
	var contentString = heatmap.getMap() ? "Heatmap is now enabled." : "Heatmap is now disabled.";
  	var options =  {
		content: contentString, // text of the snackbar
		style: "toast", // add a custom class to your snackbar
		timeout: 3000 // time in milliseconds after the snackbar autohides, 0 is disabled
	}
	$.snackbar(options);
}

//Ready Function
function myReadyFunction() {
	initializeMap();
	$.ajax({
		url: "https://students.ics.uci.edu/~harrynp/assignments/RealtimeWeb/myProxy.php?http://dev.virtualearth.net/REST/v1/Traffic/Incidents/33.6842,-117.7925,34.0500,-118.2500?key=Ag4hShfXA5VynNHyPcZCd7TVZ0Kt2Ftw-YjA8MwU4KDZ7-bVdX6lvVjPPSQf0gr4",
		dataType: "json",
		success: myGoodLoadTrafficJSON,
		error: myBadLoadFunction
	});
}

$(document).ready(
	myReadyFunction
);