# GeoPress
### News on the Map

GeoPress is an interactive news map built with vanilla HTML, CSS, and JavaScript, all ran completely locally and is free to host if you so wish. It runs on the GNews API to be able to fetch it's news stories, Search up a topic and click on the marker on those countries to see the news stories about that topic

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML / CSS / JavaScript | Core of project, no frameworks |
| [Leaflet.js](https://leafletjs.com) | Interactive world map and markers |
| [CARTO](https://carto.com) | Dark map tile layer |
| [GNews API](https://gnews.io) | Live news data |

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dominik-Razik/geopress.git
   cd geopress
   ```

2. **Get a free GNews API key**
   - Go to [https://gnews.io](https://gnews.io) and create a free account

3. **Create a `config.js` file** in the root with the following line
   ```js
   const API_KEY = "your_api_key_here";
   ```
   > `config.js` is listed in `.gitignore` and will never be committed. You must create it locally

4. **Open `index.html`** using a local server
   > Recommended to use [Ritwick Dey Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) if using VSC

---

## Usage

1. Open `index.html` using the local host (Will open automatically if using recommended extension)
2. Use the dropdown to select a topic (eg. "Bitcoin", "Climate Change")
3. Click Search and wait for markers to appear on the map
4. Marker size reflects the number of articles from that country, larger means more articles
5. Click any marker to open the article panel for that country
6. Browse article cards showing the headline, image, source name, and a link to the full article

https://github.com/user-attachments/assets/c3f4abdb-0d81-4908-ba1c-445d2efe9215

---

## Known Limitations

- GNews free tier returns a maximum of 10 articles per search
- Only covers recent news and can't go back in time
- Markers show the country where the article was published, not where the article is based on
- Occasionally returns non related articles due to certain keywords
- Other APIs required other requirements which would make it not as easily usable

---

## AI Acknowledgment

- **Claude Sonnet 4.6:** Used to research certain APIs and frameworks, Basing it on advantages and disadvantages. Helped provide documentation on these Apis and frameworks. Occassionally reviewing the project to make sure it matches the brief, Helped format the README.md to be eaiser to read
- **Gemini Pro 3.1 Preview:** Used to create general code snippets and code suggestion for the whole project and created the repetitive code like topics.js and the list of countries
- **Nano Banana Pro:** Used to Create the logo and the Image fallbacks if a image failed to load

> All AI answers were reviewed before creation commiting to the github to make sure that they fully work and isn't dead code or false information

---

## Other

Ran on the MIT license, Feel free to modify it and change it as you wish to fit your needs or change it to suite your own API. Would recommend to use a different API to have more capabilities however many APIs have their own restrictions on how you are allowed to use them, Make sure to follow their TOS
