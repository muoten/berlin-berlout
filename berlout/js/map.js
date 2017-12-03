function initMap() {
require([
"esri/Map",
"esri/views/MapView",
"esri/layers/FeatureLayer",
"dojo/domReady!",
//"libs/jquery",
], function(Map, MapView, FeatureLayer) {

var map = new Map({
  basemap: "topo-vector"
});

var query = "rating>0";

var urlParams = new URLSearchParams(window.location.search);
var query2 = urlParams.get('query');
if (query2)
  query = query2
// Challenge - Park and Open Space (Polygons)
var featureLayer = new FeatureLayer({
  url: "https://services.arcgis.com/Qo2anKIAMzIEkIJB/arcgis/rest/services/berlin_bars_pubs/FeatureServer/0/query?Where=rating%3D9&f=pjson",
  definitionExpression: query,
});

map.add(featureLayer);

var view = new MapView({
  container: "viewDiv",
  map: map,
  center: [13.40, 52.52],
  zoom: 10
}).then(function(evt) {

  setTimeout(function(){
      stopLoader();
  }, 2000);

});
});
};
