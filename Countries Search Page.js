let countriesContainer = document.getElementById("resultCountries");
countriesContainer.classList.add("d-flex", "flex-row", "justify-content-center");
let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");

let searchInputVal = "";
let countriesList = [];

function displayCountry(country) {
    let {
        flag,
        name,
        population
    } = country;

    let cardElement = document.createElement("div");
    cardElement.classList.add("d-flex", "flex-row", "country-card", "m-2");
    countriesContainer.appendChild(cardElement);

    let flagImage = document.createElement("img");
    flagImage.classList.add("country-flag", "mr-2");
    flagImage.src = flag;
    cardElement.appendChild(flagImage);

    let deatilsContainer = document.createElement("div");
    deatilsContainer.classList.add("d-flex", "flex-column");
    cardElement.appendChild(deatilsContainer);

    let nameEl = document.createElement("h1");
    nameEl.textContent = name;
    nameEl.classList.add("country-name");
    deatilsContainer.appendChild(nameEl);

    let populationEl = document.createElement("p");
    populationEl.textContent = population;
    populationEl.classList.add("country-population");
    deatilsContainer.appendChild(populationEl);
}

function displaySearchResult() {
    countriesContainer.textContent = "";
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInputVal)) {
            displayCountry(country);
        }
    }
}

function getCountriesList() {
    spinnerEl.classList.remove("d-none");

    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            countriesList = jsonData;
            displaySearchResult();
        });
}

function onSearchInput(event) {
    searchInputVal = event.target.value;
    displaySearchResult();
}

getCountriesList();
searchInputEl.addEventListener("keyup", onSearchInput);