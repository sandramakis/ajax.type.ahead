"use strict";

const endPoint =
  "https://raw.githubusercontent.com/lmfmaier/cities-json/master/cities500.json";

let cities = [];

fetch(endPoint)
  .then((request) => request.json())
  .then((data) => cities.push(data));

// Find Matches function
function findMatches(wordToMatch, cities) {
  //our cities is in an array[0]

  return cities[0].filter((place) => {
    // Check for if a city matches the name or word searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.name.match(regex) || place.country.match(regex);
  });
}

// Formatting numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Displaying results on the page
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.name.replace(
        regex,
        `<span class="highlight"> ${this.value}</span>`
      );
      const stateName = place.country.replace(
        regex,
        `<span class="highlight"> ${this.value}</span>`
      );

      return `
    <li>
      <span class="name"> ${cityName},  ${stateName} </span>
      <span class="population"> ${numberWithCommas(place.pop)}</span>
    </li>`;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
