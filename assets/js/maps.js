function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: {
      lat: 46.619261,
      lng: -33.134766,
    },
  });

  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const locations = [
    { lat: 40.785091, lng: -73.968285 },
    { lat: 41.084045, lng: -73.874245 },
    { lat: 40.754932, lng: -73.984016 },
  ];

  // Iterate through the locations array and create a new marker that has
  // the label from our 'labels' string:

  // As a reminder, the .map() function works by creating a new array from
  // the original array the .map() function was called on. The .map()
  // function itself takes an argument which is the function to be called
  // on each array element. This function provided has its own syntactical
  // rules, which can be found on MDN.

  // @location = current value of the array as we are looping through
  // @index = index number of where we currently are in the array

  const markers = locations.map((location, index) => {
    // Return a new Google Maps Marker object:
    return new google.maps.Marker({
      position: location,
      // Using this modulo technique will loop around the 'labels' string
      // in the event there are more than 26 labels (alphabet letters).
      label: labels[index % labels.length],
    });
  });

  // Adapted from guide: https://googlemaps.github.io/js-markerclusterer/
  // Makes use of the unpkg CDN
  // use default algorithm and renderer
  new markerClusterer.MarkerClusterer({ map, markers });
}
