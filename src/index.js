import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js'
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(event) {

    const countryName = event.target.value.trim();

    if (countryName.length === 0) return;

    countryInfo.innerHTML = '';
    countryList.innerHTML = '';

    fetchCountries(countryName)
        .then(value => {
            if (value.length === 1) {
            createMarkupOfOneCountry(value);
            } else if (value.length > 1 && value.length <= 10) {
            createCountryListMarkup(value);
            } else {
                Notify.info('Too many matches found. Please enter a more specific name.');
            } 
        })
        .catch((error) => {
            Notify.failure('Oops, there is no country with that name')
        })
}

function createMarkupOfOneCountry(arr) {
    const markup = arr
        .map(({ name, flags, capital, population, languages }) => {
            return `<li class="list-js">
            <h2 class="title-js">Name: ${name.official}</h2>
            <img src="${flags.svg}" alt="${flags.alt}" width="70" heigth="50">
            <p><span class="style-js">Capital:</span> ${capital}</p>
            <p><span class="style-js">Population:</span> ${population}</p>
            <p><span class="style-js">Languages:</span> ${Object.values(languages).join(" ")}</p>
            </li>`;
        }).join('');
    
    countryInfo.innerHTML = markup;
};

function createCountryListMarkup(arr) {
    const markup = arr.map(({ name, flags }) => {
        return `<li>
        <h2>Name: ${name.official}</h2>
        <img src="${flags.svg}" alt="${flags.alt}" width="70" heigth="50">
        </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
};


