function initMap(isBerlin) {
require([
"esri/Map",
"esri/views/MapView",
"esri/layers/FeatureLayer",
"dojo/domReady!",
//"libs/jquery",
], function(Map, MapView, FeatureLayer) {

var myMap = new Map({
  basemap: "topo-vector"
});

var query = "rating=4 and code=2305";
if (isBerlin == true)
  query = "rating>0"
// Challenge - Park and Open Space (Polygons)
var featureLayer = new FeatureLayer({
  url: "https://services.arcgis.com/Qo2anKIAMzIEkIJB/ArcGIS/rest/services/berlin_bars_pubs/FeatureServer",
  definitionExpression: query,
});

myMap.add(featureLayer);

var view = new MapView({
  container: "viewDiv",
  map: myMap,
  center: [13.40, 52.52],
  zoom: 10,
}).then(function(evt) {

  setTimeout(function(){
      stopLoader();
  }, 2000);

  });
});

};
