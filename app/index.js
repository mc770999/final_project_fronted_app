
const urls = {
    "find_avg_events_by_country": "http://localhost:5000/api/avg_casualties_country/",
    "find_avg_events_by_country_top5": "http://localhost:5000/api/avg_casualties_country/",
    "find_events_by_country_and_year": "http://localhost:5000/api/avg_casualties_country/year/",
    "find_events_by_activty_group_and_country": "http://localhost:5000/api/group_casualties/activity_group/",
    "find_events_by_activty_group_and_spesific_country": "http://localhost:5000/api/group_casualties/activity_group/",
    "find_group_with_same_targets":"http://localhost:5000/api/group_target/group_with_same_targets/",
    "find_countries_with_same_kind" : "http://localhost:5000/api/group_target/countries_with_same_kind/",
    "find_region_with_high_activity_group" : "http://localhost:5000/api/group_target/region_with_high_activity_group/",
    "find_events_by_attack_type":"http://localhost:5000/api/event_attack_type/",
    "search_by_keywords": "http://localhost:5000/api/search/keywords/",
    "search_by_keywords_in_news": "http://localhost:5000/api/search/news/",
    "search_by_keywords_in_historic":"http://localhost:5000/api/search/historic/",  
    "search_by_keywords_combined":"http://localhost:5000/api/search/combined/"
};

const elastic = ["search_by_keywords", "search_by_keywords_in_news", "search_by_keywords_in_historic", "search_by_keywords_combined"]

const fetchData = async (url,method="GET",body) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

async function submitForm() {
    const selectedQuestion = document.getElementById('question').value;
    const top5 = document.querySelector('input[name="top5"]:checked');
    const regionOrCountry = document.querySelector('input[name="region_or_country"]:checked');
    const countryName = document.getElementById('country-name').value.trim();
    const limit = document.getElementById('limit').value;

    const top5Value = top5 ? top5.value === "true" : false;
    const regionOrCountryValue = regionOrCountry ? regionOrCountry.value : null;

    console.log('Selected Question:', selectedQuestion);
    console.log('Top 5:', top5Value);
    console.log('Region or Country:', regionOrCountryValue);
    console.log('Country Name:', countryName);

    const mapArea = document.getElementById("map");

    let url = urls[selectedQuestion];

    console.log(url);
    

    if (!elastic.includes(selectedQuestion)) {
        if (top5Value) {
            url += "top-5/"
        } else if (regionOrCountryValue === "country") {
            url += "1/"
        } else if  (regionOrCountryValue === "region"){
            url += "2/"
        } else if (countryName) {
            url += `${countryName}/`
        }}
    else {
        url += `${countryName}/${limit || 10}/`;
    }    

    mapArea.innerHTML = `<h1>loading data....</h1>`;

    console.log(countryName);
    
    console.log({"00000000000":url});

    // Fetch data and update map area
    const responseData = await fetchData(url);

    if (responseData) {
        mapArea.innerHTML = responseData.html || `<p>Data received: ${JSON.stringify(responseData)}</p>`;
    } else {
        mapArea.innerHTML = `<p>Error fetching data. Please try again.</p>`;
    }
}


// Add dynamic styles to button
const button = document.querySelector("button");
button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#28a745";
});
button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#007bff";
});

// Real-time input validation for 'limit' field
const limitInput = document.getElementById("limit");
limitInput.addEventListener("input", () => {
    if (isNaN(limitInput.value) || limitInput.value.trim() === "") {
        limitInput.style.borderColor = "red";
    } else {
        limitInput.style.borderColor = "green";
    }
});

// Shimmer effect for map
const map = document.getElementById("map");
map.classList.add("shimmer");
setTimeout(() => {
    map.classList.remove("shimmer");
    map.style.backgroundColor = "#d4edda"; // Simulate map loaded
    map.innerHTML = "<h2 style='text-align:center;'>Map Loaded</h2>";
}, 2000); // Simulate a 2-second load time

// Theme switcher
const header = document.querySelector(".header");
const themeToggle = document.createElement("button");
themeToggle.textContent = "Toggle Theme";
themeToggle.style.marginTop = "20px";
themeToggle.style.padding = "10px 15px";
themeToggle.style.backgroundColor = "#333";
themeToggle.style.color = "#fff";
themeToggle.style.border = "none";
themeToggle.style.borderRadius = "4px";
themeToggle.style.cursor = "pointer";

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        themeToggle.textContent = "Switch to Light Theme";
    } else {
        themeToggle.textContent = "Switch to Dark Theme";
    }
});
header.appendChild(themeToggle);