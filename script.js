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

// gets the selected topic and fetches related news articles
function handleSearch() {
  const query = document.getElementById("topic-select").value;
  if (!query) return;
  fetchNews(query).then(articles => console.log(articles));
}

// waits for a search button click
document.getElementById("search-btn").addEventListener("click", handleSearch);