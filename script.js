// Maps 2-letter country codes to [latitude, longitude, countryName] for markers
const COUNTRY_COORDS = {
  us: [37.09, -95.71, "United States"],
  gb: [55.38, -3.44, "United Kingdom"],
  ie: [53.41, -8.24, "Ireland"],
  de: [51.17, 10.45, "Germany"],
  fr: [46.23, 2.21, "France"],
  au: [-25.27, 133.78, "Australia"],
  ca: [56.13, -106.35, "Canada"],
  in: [20.59, 78.96, "India"],
  jp: [36.20, 138.25, "Japan"],
  cn: [35.86, 104.19, "China"],
  br: [-14.24, -51.93, "Brazil"],
  za: [-30.56, 22.94, "South Africa"],
  ru: [61.52, 105.32, "Russia"],
  mx: [23.63, -102.55, "Mexico"],
  ng: [9.08, 8.68, "Nigeria"],
  sg: [1.35, 103.82, "Singapore"],
  ar: [-38.42, -63.62, "Argentina"],
  it: [41.87, 12.57, "Italy"],
  es: [40.46, -3.75, "Spain"],
  nl: [52.13, 5.29, "Netherlands"],
  se: [60.13, 18.64, "Sweden"],
  no: [60.47, 8.47, "Norway"],
  pl: [51.92, 19.15, "Poland"],
  pt: [39.40, -8.22, "Portugal"],
  kr: [35.91, 127.77, "South Korea"],
  ae: [23.42, 53.85, "United Arab Emirates"],
  sa: [23.89, 45.08, "Saudi Arabia"],
  tr: [38.96, 35.24, "Turkey"],
  ua: [48.38, 31.17, "Ukraine"],
  nz: [-40.90, 174.89, "New Zealand"],
  be: [50.50, 4.47, "Belgium"],
  ch: [46.82, 8.23, "Switzerland"],
  at: [47.52, 14.55, "Austria"],
  gr: [39.07, 21.82, "Greece"],
  th: [15.87, 100.99, "Thailand"],
  id: [-0.79, 113.92, "Indonesia"],
  my: [4.21, 108.96, "Malaysia"],
  ph: [12.88, 121.77, "Philippines"],
  eg: [26.82, 30.80, "Egypt"],
  il: [31.05, 34.85, "Israel"],
};

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

// goes through topics and adds them to the dropdown menu
function addToDropdown() {
  const select = document.getElementById("topic-select");
  TOPICS.forEach(function(topic) {
    const option = document.createElement("option");
    option.value = topic.value;
    option.textContent = topic.label;
    select.appendChild(option);
  });
}

addToDropdown();

// fetches news articles from GNews based on a search (https://gnews.io)
async function fetchNews(query) {
  const response = await fetch(
    `https://gnews.io/api/v4/search?q=${query}&max=50&sortby=publishedAt&lang=en&token=${API_KEY}`
  );
  const data = await response.json();
  return data.articles;
}

// places down a marker based on the coordinates of the supported countries
function placeMarkers(articles) {
  articles.forEach(function(article) {
    const country = article.source && article.source.country;
    const coords = country && COUNTRY_COORDS[country.toLowerCase()];
    if (!coords) return;
    const marker = L.marker([coords[0], coords[1]], {
      icon: L.divIcon({
        className: "",
        html: '<div class="custom-marker"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      })
    }).addTo(map);
    marker.bindPopup(
      `<strong>${article.title}</strong><br><a href="${article.url}" target="_blank">Read more</a>`
    );
  });
}

// gets the selected topic and fetches related news articles
function handleSearch() {
  const query = document.getElementById("topic-select").value;
  if (!query) return;
  fetchNews(query).then(articles => placeMarkers(articles));
}

// waits for a search button click
document.getElementById("search-btn").addEventListener("click", handleSearch);