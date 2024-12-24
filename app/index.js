import { inputSearchHtml, limitHtml, regionOrCountryHtml, startAndEndDates, top5Html } from "./componnent.js";
import { countryCondition, descriptionCountry, descriptionSearch, elastic, regionOrCountryCondition, top5Condition, urls } from "./data.js";
import { fetchData } from "./service_api.js";


const inputFromScript = document.getElementById("inputFromScript")
const selectedQuestion = document.getElementById('question');

selectedQuestion.addEventListener("change", (e) => {
    console.log("Change event triggered", e.target.value);
});


selectedQuestion.addEventListener("change", (e) => {
    inputFromScript.innerHTML = ""; // Corrected the syntax for clearing content
    const value = e.target.value; // Ensuring we get the correct value from the event

    if (elastic.includes(value) && value != "search_by_keywords_combined") {
        inputFromScript.innerHTML = `${inputSearchHtml("Search any words", descriptionSearch)}${limitHtml()}`;
    } else if (value === "search_by_keywords_combined") {
        inputFromScript.innerHTML = `${inputSearchHtml("Search any words", descriptionSearch)}${limitHtml()}${startAndEndDates()}`;
    } else if (top5Condition.includes(value)) {
        inputFromScript.innerHTML = `${top5Html()}`;
    } else if (regionOrCountryCondition.includes(value)) {
        inputFromScript.innerHTML = `${regionOrCountryHtml()}`;
    } else if (countryCondition.includes(value)) {
        inputFromScript.innerHTML = `${inputSearchHtml("Search any country", descriptionCountry)}`;
    }
});

async function submitForm() {
    const startDateValue = document.getElementById("startDateValue").value;
    const endDateValue = document.getElementById("endDateValue").value;
    const selectedQuestionValue = selectedQuestion.value
    const top5 = document.querySelector('input[name="top5"]:checked');
    const regionOrCountry = document.querySelector('input[name="region_or_country"]:checked');
    const countryName = document.getElementById('country-name').value.trim();
    const limit = document.getElementById('limit').value;


    const top5Value = top5 ? top5.value === "true" : false;
    const regionOrCountryValue = regionOrCountry ? regionOrCountry.value : null;

    console.log('Selected Question:', selectedQuestionValue);
    console.log('Top 5:', top5Value);
    console.log('Region or Country:', selectedQuestionValue);
    console.log('Country Name:', countryName);

    const mapArea = document.getElementById("map");

    let url = urls[selectedQuestionValue];

    console.log(url);


    if (!elastic.includes(selectedQuestionValue)) {
        if (top5Value) {
            url += "top-5/"
        } else if (regionOrCountryValue === "country") {
            url += "1/"
        } else if (regionOrCountryValue === "region") {
            url += "2/"
        } else if (countryName) {
            url += `${countryName}/`
        }
    }
    else {
        const dates = startDateValue && endDateValue ? `${startDateValue},${endDateValue}` : '';
        url += `${countryName}/${limit || 10}/`;
        url = startDateValue ? `${url}_${dates}` : url
    }

    mapArea.innerHTML = `<h1>loading data....</h1>`;

    console.log(countryName);

    console.log({ "00000000000": url });

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

// Check if the element exists before adding the event listener
if (limitInput) {
    limitInput.addEventListener("input", () => {
        if (isNaN(limitInput.value) || limitInput.value.trim() === "") {
            limitInput.style.borderColor = "red";
        } else {
            limitInput.style.borderColor = "green";
        }
    });
} else {
    console.warn('Element with ID "limit" does not exist.');
}

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






