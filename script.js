const map = L.map("map", { // Creates map using leaflet
  attributionControl: false  // removes default watermark in bottom right
}).setView([20, 0], 2);
 
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { // Loads in the the images from cardo
  subdomains: "abcd",
  maxZoom: 20
}).addTo(map);
 
// add in custom attribute to stay within tos of carto
L.control.attribution({
  prefix: '© <a href="https://carto.com/">CARTO</a>'
}).addTo(map);